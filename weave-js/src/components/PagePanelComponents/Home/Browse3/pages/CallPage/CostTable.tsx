import {Box} from '@mui/material';
import {GridColDef, GridRenderCellParams} from '@mui/x-data-grid-pro';
import React from 'react';

import {StyledDataGrid} from '../../StyledDataGrid';
import {
  CostData,
  FORMAT_NUMBER_NO_DECIMALS,
  formatTokenCost,
} from './TraceUsageStats';

const renderNumberCell = (params: GridRenderCellParams) => (
  <Box sx={{textAlign: 'right', width: '100%'}}>
    {FORMAT_NUMBER_NO_DECIMALS.format(params.value)}
  </Box>
);

const columns: GridColDef[] = [
  {field: 'id', headerName: 'Model', flex: 5},
  {
    field: 'requests',
    headerName: 'Requests',
    flex: 2,
    renderCell: renderNumberCell,
  },
  {
    field: 'prompt_tokens',
    headerName: 'Input tokens',
    flex: 3,
    renderCell: renderNumberCell,
  },
  {
    field: 'completion_tokens',
    headerName: 'Output tokens',
    flex: 3,
    renderCell: renderNumberCell,
  },
  {
    field: 'total_tokens',
    headerName: 'Total tokens',
    flex: 3,
    renderCell: renderNumberCell,
  },
  {
    field: 'cost',
    headerName: 'Total Cost',
    flex: 3,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{textAlign: 'right', width: '100%'}}>
        {formatTokenCost(params.value)}
      </Box>
    ),
  },
];

export const CostTable = ({costs}: {costs: {[key: string]: CostData}}) => {
  const costData: any[] = Object.entries(costs ?? {}).map(([k, v]) => {
    const promptTokens = v.input_tokens ?? v.prompt_tokens;
    const completionTokens = v.output_tokens ?? v.completion_tokens;
    return {
      id: k,
      ...v,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: promptTokens + completionTokens,
      cost: v.completion_tokens_cost + v.prompt_tokens_cost,
    };
  });

  // if more than one model is used, add a row for the total usage
  if (costData.length > 1) {
    const totalUsage = costData.reduce(
      (acc, curr) => {
        const promptTokens = curr.input_tokens ?? curr.prompt_tokens;
        const completionTokens = curr.output_tokens ?? curr.completion_tokens;
        acc.requests += parseInt(curr.requests, 10);
        acc.prompt_tokens += promptTokens;
        acc.completion_tokens += completionTokens;
        acc.total_tokens += promptTokens + completionTokens;
        acc.cost += curr.cost;
        return acc;
      },
      {
        requests: 0,
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
        cost: 0,
        prompt_tokens_cost: 0,
        completion_tokens_cost: 0,
        prompt_token_cost: 0,
        completion_token_cost: 0,
        effective_date: '',
        provider_id: '',
        pricing_level: '',
        pricing_level_id: '',
      }
    );

    costData.push({
      id: 'Total',
      ...totalUsage,
    });
  }

  return (
    <StyledDataGrid
      // For this super small table, we don't need a lot of features.
      disableColumnMenu={true}
      // In this context, we don't need to filter columns.
      disableColumnFilter={true}
      disableMultipleColumnsFiltering={true}
      // There is no need to reorder the 2 columns in this context.
      disableColumnReorder={true}
      // There are only 6 columns, let's not confuse the user.
      disableColumnSelector={true}
      // We don't need to sort multiple columns.
      disableMultipleColumnsSorting={true}
      slots={{
        // removes the sorting icon, since we don't need it.
        columnUnsortedIcon: null,
      }}
      hideFooter
      // Enabled stuff
      // Resizing columns might be helpful to show more data
      disableColumnResize={false}
      // ColumnPinning seems to be required in DataGridPro, else it crashes.
      disableColumnPinning={false}
      columnHeaderHeight={38}
      columns={columns}
      rows={costData}
      rowHeight={38}
      rowSelection={false}
      keepBorders={true}
    />
  );
};
