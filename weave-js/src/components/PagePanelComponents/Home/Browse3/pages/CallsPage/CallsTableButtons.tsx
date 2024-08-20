import {Box, Popover} from '@mui/material';
import {GridFilterModel, GridSortModel} from '@mui/x-data-grid-pro';
import {Radio} from '@wandb/weave/components';
import {Button} from '@wandb/weave/components/Button';
import {CodeEditor} from '@wandb/weave/components/CodeEditor';
import {
  DraggableGrow,
  DraggableHandle,
} from '@wandb/weave/components/DraggablePopups';
import {Icon, IconName} from '@wandb/weave/components/Icon';
import {Loading} from '@wandb/weave/components/Loading';
import {Tailwind} from '@wandb/weave/components/Tailwind';
import classNames from 'classnames';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from 'react';

import {useWFHooks} from '../wfReactInterface/context';
import {
  ContentType,
  fileExtensions,
} from '../wfReactInterface/traceServerClientTypes';
import {CallFilter} from '../wfReactInterface/wfDataModelHooksInterface';
import {WFHighLevelCallFilter} from './callsTableFilter';
import {useFilterSortby} from './callsTableQuery';

const MAX_EXPORT = 10_000;

type SelectionState = 'all' | 'selected' | 'limit';

export const ExportSelector = ({
  selectedCalls,
  numTotalCalls,
  visibleColumns,
  disabled,
  callQueryParams,
  rightmostButton = false,
}: {
  selectedCalls: string[];
  numTotalCalls: number;
  visibleColumns: string[];
  callQueryParams: {
    entity: string;
    project: string;
    filter: WFHighLevelCallFilter;
    gridFilter: GridFilterModel;
    gridSort?: GridSortModel;
  };
  disabled: boolean;
  rightmostButton?: boolean;
}) => {
  const [selectionState, setSelectionState] = useState<SelectionState>('all');
  const [downloadLoading, setDownloadLoading] = useState<ContentType | null>(
    null
  );

  // Popover management
  const ref = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : ref.current);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  // Call download query
  const {useCallsExport} = useWFHooks();
  const download = useCallsExport();
  const {sortBy, lowLevelFilter, filterBy} = useFilterSortby(
    callQueryParams.filter,
    callQueryParams.gridFilter,
    callQueryParams.gridSort
  );

  // TODO(gst): tabulate correct list of ref columns
  const refColumnsToExpand = useMemo(
    () =>
      visibleColumns.filter(col => {
        for (const maybeRefCol of [
          'inputs',
          'output',
          'attributes',
          'summary',
        ]) {
          if (col.startsWith(maybeRefCol)) {
            return true;
          }
        }
        return false;
      }),
    [visibleColumns]
  );

  const onClickDownload = (contentType: ContentType) => {
    if (downloadLoading) {
      return;
    }
    setDownloadLoading(contentType);
    lowLevelFilter.callIds =
      selectionState === 'selected' ? selectedCalls : undefined;
    // TODO(gst): allow specifying offset
    const offset = 0;
    const limit = MAX_EXPORT;
    // TODO(gst): add support for JSONL and JSON column selection
    const columns = [ContentType.csv, ContentType.tsv].includes(contentType)
      ? visibleColumns
      : undefined;
    // Filter columns down to only the most nested, for example
    // ['output', 'output.x', 'output.x.y'] -> ['output.x.y']
    const minimalColumns: string[] = [];
    for (const col of visibleColumns.sort((a, b) => b.length - a.length)) {
      if (minimalColumns.some(minimalCol => minimalCol.startsWith(col))) {
        continue;
      }
      minimalColumns.push(col);
    }

    download(
      callQueryParams.entity,
      callQueryParams.project,
      contentType,
      lowLevelFilter,
      limit,
      offset,
      sortBy,
      filterBy,
      columns
    ).then(blob => {
      const fileExtension = fileExtensions[contentType];
      const date = new Date().toISOString().split('T')[0];
      const fileName = `weave_export_${callQueryParams.project}_${date}.${fileExtension}`;
      initiateDownloadFromBlob(blob, fileName);
      setAnchorEl(null);
      setDownloadLoading(null);
    });
    setSelectionState('all');
  };

  const pythonText = useMakeCodeText(
    callQueryParams.entity,
    callQueryParams.project,
    selectionState === 'selected' ? selectedCalls : undefined,
    lowLevelFilter,
    refColumnsToExpand,
    sortBy
  );
  const curlText = useMakeCurlText(
    callQueryParams.entity,
    callQueryParams.project,
    selectionState === 'selected' ? selectedCalls : undefined,
    lowLevelFilter,
    refColumnsToExpand,
    sortBy
  );

  return (
    <>
      <span ref={ref}>
        <Button
          className={rightmostButton ? 'mr-16' : 'mr-4'}
          icon="export-share-upload"
          variant="ghost"
          onClick={onClick}
          disabled={disabled}
        />
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            sx: {
              overflow: 'visible',
            },
          },
        }}
        onClose={() => {
          setAnchorEl(null);
          setSelectionState('all');
        }}
        TransitionComponent={DraggableGrow}>
        <Tailwind>
          <div className="min-w-[560px] max-w-[660px] p-12">
            <DraggableHandle>
              <div className="flex items-center pb-8">
                {selectedCalls.length === 0 ? (
                  <div className="flex-auto text-xl font-semibold">
                    Export (
                    {Math.min(numTotalCalls, MAX_EXPORT).toLocaleString()})
                  </div>
                ) : (
                  <div className="flex-auto text-xl font-semibold">Export</div>
                )}
              </div>
              {selectedCalls.length > 0 && (
                <SelectionCheckboxes
                  numSelectedCalls={selectedCalls.length}
                  numTotalCalls={numTotalCalls}
                  selectionState={selectionState}
                  setSelectionState={setSelectionState}
                />
              )}
            </DraggableHandle>
            <DownloadGrid
              pythonText={pythonText}
              curlText={curlText}
              downloadLoading={downloadLoading}
              onClickDownload={onClickDownload}
            />
          </div>
        </Tailwind>
      </Popover>
    </>
  );
};

const SelectionCheckboxes: FC<{
  numSelectedCalls: number;
  numTotalCalls: number;
  selectionState: SelectionState;
  setSelectionState: Dispatch<SetStateAction<SelectionState>>;
}> = ({numSelectedCalls, numTotalCalls, selectionState, setSelectionState}) => {
  return (
    <>
      <div className="ml-2" />
      <Radio.Root
        className="flex items-center"
        aria-label="All checked"
        name="all checked"
        onValueChange={(value: SelectionState) => setSelectionState(value)}
        value={selectionState}>
        <Radio.Item id="all-rows" value="all">
          <Radio.Indicator />
        </Radio.Item>
        <label className="flex items-center">
          <span onClick={() => setSelectionState('all')} className="ml-6 mr-12">
            All rows ({numTotalCalls})
          </span>
        </label>
        <label className="flex items-center">
          <Radio.Item id="selected-rows" value="selected">
            <Radio.Indicator />
          </Radio.Item>
          <span
            className="ml-6 mr-12"
            onClick={() => setSelectionState('selected')}>
            Selected rows ({numSelectedCalls})
          </span>
        </label>
      </Radio.Root>
    </>
  );
};

const ClickableOutlinedCardWithIcon: FC<{
  iconName: IconName;
  downloadLoading?: boolean;
  disabled: boolean;
  onClick: () => void;
}> = ({iconName, children, downloadLoading, disabled, onClick}) => (
  <div
    className={classNames(
      'flex w-full cursor-pointer items-center rounded-md border border-moon-200 p-16 hover:bg-moon-100',
      disabled ? 'bg-moon-100 hover:cursor-default' : ''
    )}
    onClick={!disabled ? onClick : undefined}>
    {downloadLoading ? (
      <Loading size={28} className="mr-4" />
    ) : (
      <div className="mr-4 rounded-2xl bg-moon-200 p-4">
        <Icon size="xlarge" color="moon" name={iconName} />
      </div>
    )}
    <div className="ml-4">{children}</div>
  </div>
);

const DownloadGrid: FC<{
  pythonText: string;
  curlText: string;
  downloadLoading: ContentType | null;
  onClickDownload: (contentType: ContentType) => void;
}> = ({pythonText, curlText, downloadLoading, onClickDownload}) => {
  const [codeMode, setCodeMode] = useState<'python' | 'curl' | null>(null);
  return (
    <>
      <div className="mt-12 flex items-center">
        <ClickableOutlinedCardWithIcon
          iconName="export-share-upload"
          downloadLoading={downloadLoading === ContentType.csv}
          disabled={downloadLoading !== null}
          onClick={() => onClickDownload(ContentType.csv)}>
          Export to CSV
        </ClickableOutlinedCardWithIcon>
        <div className="ml-8" />
        <ClickableOutlinedCardWithIcon
          iconName="export-share-upload"
          downloadLoading={downloadLoading === ContentType.tsv}
          disabled={downloadLoading !== null}
          onClick={() => onClickDownload(ContentType.tsv)}>
          Export to TSV
        </ClickableOutlinedCardWithIcon>
      </div>
      <div className="mt-8 flex items-center">
        <ClickableOutlinedCardWithIcon
          iconName="export-share-upload"
          downloadLoading={downloadLoading === ContentType.jsonl}
          disabled={downloadLoading !== null}
          onClick={() => onClickDownload(ContentType.jsonl)}>
          Export to JSONL
        </ClickableOutlinedCardWithIcon>
        <div className="ml-8" />
        <ClickableOutlinedCardWithIcon
          iconName="export-share-upload"
          downloadLoading={downloadLoading === ContentType.json}
          disabled={downloadLoading !== null}
          onClick={() => onClickDownload(ContentType.json)}>
          Export to JSON
        </ClickableOutlinedCardWithIcon>
      </div>
      <div className="mt-8 flex items-center">
        <ClickableOutlinedCardWithIcon
          iconName="python-logo"
          disabled={false}
          onClick={() => setCodeMode('python')}>
          Use Python
        </ClickableOutlinedCardWithIcon>
        <div className="ml-8" />
        <ClickableOutlinedCardWithIcon
          iconName="code-alt"
          disabled={false}
          onClick={() => setCodeMode('curl')}>
          Use CURL
        </ClickableOutlinedCardWithIcon>
      </div>
      {codeMode && (
        <div className="mt-8 flex max-w-full items-center">
          <CodeEditor
            value={codeMode === 'python' ? pythonText : curlText}
            language={codeMode === 'python' ? 'python' : 'shell'}
            handleMouseWheel={true}
            alwaysConsumeMouseWheel={false}
          />
        </div>
      )}
    </>
  );
};

export const CompareEvaluationsTableButton: FC<{
  onClick: () => void;
  disabled?: boolean;
  tooltipText?: string;
}> = ({onClick, disabled, tooltipText}) => (
  <Box
    sx={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    }}>
    <Button
      className="mx-4"
      size="medium"
      variant="primary"
      disabled={disabled}
      onClick={onClick}
      icon="chart-scatterplot"
      tooltip={tooltipText}>
      Compare
    </Button>
  </Box>
);

export const BulkDeleteButton: FC<{
  disabled?: boolean;
  onClick: () => void;
}> = ({disabled, onClick}) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}>
      <Button
        className="ml-4 mr-16"
        variant="ghost"
        size="medium"
        disabled={disabled}
        onClick={onClick}
        tooltip="Select rows with the checkbox to delete"
        icon="delete"
      />
    </Box>
  );
};

function initiateDownloadFromBlob(blob: Blob, fileName: string) {
  const downloadUrl = URL.createObjectURL(blob);
  // Create a download link and click it
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(downloadUrl);
}

function useMakeCodeText(
  entity: string,
  project: string,
  callIds: string[] | undefined,
  filter: CallFilter,
  expandColumns: string[],
  sortBy: Array<{field: string; direction: 'asc' | 'desc'}>
) {
  let codeStr = `import weave\nassert weave.__version__ >= "0.50.14", "Please upgrade weave!" \n\nclient = weave.init("${entity}/${project}")`;
  codeStr += `\ncalls = client.server.calls_query_stream({\n`;
  codeStr += `   "project_id": "${entity}/${project}",\n`;

  const filteredCallIds = callIds ?? filter.callIds;
  if (filteredCallIds && filteredCallIds.length > 0) {
    // specifying call_ids ignores other filters
    codeStr += `   "call_ids": ["${filteredCallIds.join('", "')}"],\n`;
    if (expandColumns.length > 0) {
      codeStr += `   "expand_columns": ${JSON.stringify(
        expandColumns,
        null,
        0
      )},\n`;
    }
    codeStr += `})`;
    return codeStr;
  }

  if (filter.opVersionRefs) {
    codeStr += `   "op_names": ["${filter.opVersionRefs.join('", "')}"],\n`;
  }
  if (filter.runIds) {
    codeStr += `   "run_ids": ["${filter.runIds.join('", "')}"],\n`;
  }
  if (filter.userIds) {
    codeStr += `   "user_ids": ["${filter.userIds.join('", "')}"],\n`;
  }
  if (filter.traceId) {
    codeStr += `   "trace_id": "${filter.traceId}",\n`;
  }
  if (filter.traceRootsOnly) {
    codeStr += `   "trace_roots_only": True,\n`;
  }
  if (filter.parentIds) {
    codeStr += `   "parent_ids": ["${filter.parentIds.join('", "')}"],\n`;
  }
  if (expandColumns.length > 0) {
    codeStr += `   "expand_columns": ${JSON.stringify(
      expandColumns,
      null,
      0
    )},\n`;
  }

  if (sortBy.length > 0) {
    codeStr += `   "sort_by": ${JSON.stringify(sortBy, null, 0)},\n`;
  }

  codeStr += `})`;

  return codeStr;
}

function useMakeCurlText(
  entity: string,
  project: string,
  callIds: string[] | undefined,
  filter: CallFilter,
  expandColumns: string[],
  sortBy: Array<{field: string; direction: 'asc' | 'desc'}>
) {
  const baseUrl = 'https://trace.wandb.ai';
  const filterStr = JSON.stringify(
    {
      op_names: filter.opVersionRefs,
      input_refs: filter.inputObjectVersionRefs,
      output_refs: filter.outputObjectVersionRefs,
      parent_ids: filter.parentIds,
      trace_ids: filter.traceId ? [filter.traceId] : undefined,
      call_ids: callIds,
      trace_roots_only: filter.traceRootsOnly,
      wb_run_ids: filter.runIds,
      wb_user_ids: filter.userIds,
    },
    null,
    0
  );
  const sortByStr = JSON.stringify(sortBy, null, 0);

  return `# Ensure you have a WANDB_API_KEY set in your environment
curl '${baseUrl}/calls/stream_query' \\
  -u api:$WANDB_API_KEY \\
  -H 'content-type: application/json' \\
  --data-raw '{
    "project_id":"${entity}/${project}",
    "filter":${filterStr},
    "expand_columns":${JSON.stringify(expandColumns, null, 0)},
    "limit":${MAX_EXPORT},
    "offset":0,
    "sort_by":${sortByStr}
  }'`;
}
