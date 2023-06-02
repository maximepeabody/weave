import * as globals from '@wandb/weave/common/css/globals.styles';
import styled from 'styled-components';

export const Table = styled.table``;
export const Row = styled.tr``;
export const Key = styled.td`
  vertical-align: top;
  padding: 0 !important;
  color: ${globals.gray500};
  width: 100px;
`;
export const Val = styled.td`
  padding: 0 !important;
`;

export const InputUpdateLink = styled.div`
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: dotted;
`;
