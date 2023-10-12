import React, {useMemo} from 'react';
import {Box} from '@mui/material';
import {DataGridPro as DataGrid} from '@mui/x-data-grid-pro';

export const LinkTable = <RowType extends {[key: string]: any}>({
  rows,
  handleRowClick,
}: {
  rows: RowType[];
  handleRowClick: (row: RowType) => void;
}) => {
  const columns = useMemo(() => {
    const row0 = rows[0];
    if (row0 == null) {
      return [];
    }
    const cols = Object.keys(row0).filter(
      k => k !== 'id' && !k.startsWith('_')
    );
    return row0 == null
      ? []
      : cols.map((key, i) => ({
          field: key,
          headerName: key,
          flex: i === 0 ? 1 : undefined,
        }));
  }, [rows]);
  return (
    <Box
      sx={{
        height: 460,
        width: '100%',
        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-row': {
          cursor: 'pointer',
        },
      }}>
      <DataGrid
        density="compact"
        rows={rows}
        columns={columns}
        autoPageSize
        disableRowSelectionOnClick
        onRowClick={params => handleRowClick(params.row as RowType)}
      />
    </Box>
  );
};
