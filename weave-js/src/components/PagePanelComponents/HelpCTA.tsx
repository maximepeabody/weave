import React from 'react';
import * as LE from './Home/LayoutElements';
import {IconHelpAlt} from '../Icon';
import styled from 'styled-components';

const HelpCTAOuter = styled(LE.HStack)`
  position: absolute;
  bottom: 16px;
  left: 0px;
  z-index: 1000;
  width: 300px;
  height: 48px;
  justify-content: center;
`;
HelpCTAOuter.displayName = 'S.HelpCTAOuter';

const HelpCTAInner = styled(LE.HStack)`
  padding: 0px 16px;
  gap: 10px;
  border-radius: 20px;
  background-color: #ffe49e80;
  color: #b8740f;
  align-items: center;
  line-height: 16px;
  font-weight: 400;
  width: fit-content;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #ffe49e;
  }
`;
HelpCTAInner.displayName = 'S.HelpCTAInner';

const HELP_LINK = 'https://wandb.me/prompts-discord';

export const HelpCTA: React.FC<{}> = () => {
  return (
    <HelpCTAOuter>
      <HelpPill
        icon={<IconHelpAlt />}
        height={40}
        onClick={() => {
          // eslint-disable-next-line wandb/no-unprefixed-urls
          window.open(HELP_LINK, '_blank');
        }}
        helpText="Get help or share feedback"
      />
    </HelpCTAOuter>
  );
};

export const HelpPill: React.FC<{
  icon: React.ReactNode;
  height: number;
  helpText: string;
  onClick: () => void;
}> = props => {
  return (
    <HelpCTAInner
      style={{
        height: props.height,
      }}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
          return;
        }
      }}>
      {props.icon}
      <LE.Block>{props.helpText}</LE.Block>
    </HelpCTAInner>
  );
};
