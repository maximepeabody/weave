import React, {useEffect, useRef, useState} from 'react';
import makeComp from '@wandb/common/util/profiler';
import WandbLoader from '@wandb/common/components/WandbLoader';
import * as Panel2 from './panel';
import {
  RenderFullscreen,
  RenderScreenshot,
} from '@wandb/common/util/render_babylon';
import {Icon, Placeholder, PlaceholderImage} from 'semantic-ui-react';
import {useAssetURLFromArtifact} from './useAssetFromArtifact';

import * as S from './PanelObject3D.styles';
import {MediaPanelCardControl} from '@wandb/common/components/MediaCard';

const inputType = {type: 'object3D-file' as const};
type PanelObject3DProps = Panel2.PanelProps<typeof inputType>;

const PanelObject3D: React.FC<PanelObject3DProps> = makeComp(
  props => {
    const inputNode = props.input;
    const assetResult = useAssetURLFromArtifact(inputNode);
    const isPointCloud =
      !assetResult.loading && assetResult.asset.path.endsWith('.pts.json');

    return (
      <div>
        {assetResult.loading ? (
          <WandbLoader />
        ) : isPointCloud ? (
          <PointCloud
            width={350}
            height={350}
            directUrl={assetResult.directUrl as string}
          />
        ) : (
          <p>
            Tried to render{' '}
            {assetResult.asset.path ? (
              <code>{assetResult.asset.path}</code>
            ) : (
              'this object'
            )}
            , but only point clouds are currently supported in Artifacts
          </p>
        )}
      </div>
    );
  },
  {
    id: 'PanelObject3D',
  }
);

interface Media3DProps {
  width: number;
  height: number;
  directUrl: string;
  controls?: MediaPanelCardControl;
}

const PointCloud: React.FC<Media3DProps> = makeComp(
  props => {
    const {width, height, directUrl} = props;

    const babylonContainerRef = useRef<HTMLDivElement>(null);
    const [renderError, setRenderError] = useState<Error | null>(null);
    const [screenshot, setScreenshot] = useState<string>();

    // Load babylon lib asynchronously to perform bundle splitting
    type BabylonLib = typeof import('@wandb/common/util/render_babylon');
    const [babylonLib, setBabylon] = useState<BabylonLib>();
    useEffect(() => {
      import('@wandb/common/util/render_babylon').then(setBabylon);
    }, []);

    const [jsonPointData, setJsonPointData] = useState<string>();
    useEffect(() => {
      const fetchedUrl = directUrl;
      fetch(fetchedUrl)
        .then(resp => resp.text())
        .then(body => {
          // guard against out-of-order requests
          if (fetchedUrl === directUrl) {
            setJsonPointData(body);
          }
        });
    }, [directUrl]);

    useEffect(() => {
      if (!babylonContainerRef.current || !babylonLib || !jsonPointData) {
        return;
      }

      try {
        const result = babylonLib.renderJsonPoints<RenderScreenshot>(
          jsonPointData,
          {
            fullscreen: false,
            width,
            height,
          },
          props.controls?.cameraControl
        );
        babylonLib.renderScreenshot(result).then(setScreenshot);
        return result.cleanup;
      } catch (e) {
        setRenderError(e);
        console.error(e);
        return;
      }
    }, [babylonLib, width, height, jsonPointData, props.controls]);

    // Callback launch fullscreen viewer
    // NOTE: This has to stay a callback because fullscreen
    // requests can only happen as a response to user actions
    const requestFullscreen = React.useCallback(() => {
      let cleanup: CallableFunction | undefined;
      const renderFullscreen = async () => {
        if (babylonLib && babylonContainerRef.current && jsonPointData) {
          const domElement = babylonContainerRef.current;
          const result = babylonLib.renderJsonPoints<RenderFullscreen>(
            jsonPointData,
            {
              domElement,
              fullscreen: true,
            }
          );
          babylonLib.renderFullscreen(result);
          cleanup = result.cleanup;
        }
      };
      renderFullscreen();

      return cleanup;
    }, [jsonPointData, babylonLib]);

    if (renderError != null) {
      return <div className="card3d">Error: {renderError.message}</div>;
    }

    return (
      <S.FlexContainer>
        <div className="media-card">
          <div className="object3D-card-babylon" ref={babylonContainerRef} />
          {screenshot ? (
            <>
              <div
                className="media-card__fullscreen"
                onClick={requestFullscreen}>
                <Icon
                  size="large"
                  link
                  className="media-card__fullscreen-button"
                  name="expand arrows alternate"
                />
              </div>
              <img
                alt="point-cloud-card"
                src={screenshot}
                width="100%"
                height="100%"
              />
            </>
          ) : (
            <Placeholder
              style={{
                width: '100%',
                height: '100%',
              }}>
              <PlaceholderImage square />
            </Placeholder>
          )}
        </div>
      </S.FlexContainer>
    );
  },
  {id: 'Panel2PointCloud'}
);

// TODO: integrate this into the panel for non-point cloud 3D objects
// const Viewer3D: React.FC<Media3DProps> = makeComp(
//   props => {
//     const {directUrl} = props;

//     const babylonContainerRef = React.useRef<HTMLDivElement>(null);

//     // Load babylon lib asynchronously to perform bundle splitting
//     type BabylonLib = typeof import('@wandb/common/util/render_babylon');
//     const [babylonLib, setBabylon] = React.useState<BabylonLib>();
//     React.useEffect(() => {
//       import('@wandb/common/util/render_babylon').then(b => {
//         setBabylon(b);
//       });
//     }, []);

//     const viewer = React.useRef<DefaultViewer>();

//     // First render of Viewer
//     React.useEffect(() => {
//       const container = babylonContainerRef.current;
//       if (container && babylonLib) {
//         // Create viewer on first render
//         if (viewer.current == null) {
//           viewer.current = babylonLib.renderViewer(container, directUrl);
//         } else {
//           viewer.current.loadModel(directUrl);
//         }
//       }
//     }, [directUrl, babylonLib]);

//     // Cleanup at unmount
//     React.useEffect(() => {
//       return () => {
//         if (viewer.current) {
//           viewer.current.dispose();
//         }
//       };
//     }, []);

//     return <div className="object3D-card-babylon" ref={babylonContainerRef} />;
//   },
//   {id: 'Panel2Viewer3D'}
// );

export const Spec: Panel2.PanelSpec = {
  id: 'object3D-file',
  Component: PanelObject3D,
  inputType,
  displayName: '3D Object',
};
