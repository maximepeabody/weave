import {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid-pro';
import {useMemo} from 'react';

import {useWFHooks} from '../wfReactInterface/context';
import {CallFilter} from '../wfReactInterface/wfDataModelHooksInterface';
import {WFHighLevelCallFilter} from './callsTableFilter';

/**
 * Given a calls query, resolve the calls and return them. This hook will
 * serve as an in-memory stepping stone to a more sophisticated backend
 * implementation.
 */
export const useCallsForQuery = (
  entity: string,
  project: string,
  filter: WFHighLevelCallFilter,
  gridFilter: GridFilterModel,
  gridSort: GridSortModel,
  gridPage: GridPaginationModel
) => {
  const {useCalls} = useWFHooks();
  const lowLevelFilter: CallFilter = useMemo(() => {
    return convertHighLevelFilterToLowLevelFilter(filter);
  }, [filter]);

  const calls = useCalls(entity, project, lowLevelFilter);
  const callResults = useMemo(() => {
    return calls.result ?? [];
  }, [calls]);

  // 100% in-memory handling of sorting, filtering, and paging. MUST be moved to backend.

  // Filter
  console.log('Applying filter', gridFilter);
  // TODO: Implement validation of filter fields
  // TODO: Implement filtering

  // Sort
  console.log('Applying sort', gridSort);
  // TODO: Implement validation of sort fields
  // TODO: Implement sorting

  // Page
  console.log('Applying page', gridPage);
  const offset = gridPage.page * gridPage.pageSize;
  const limit = gridPage.pageSize;
  const pagedCalls = useMemo(
    () => callResults.slice(offset, offset + limit),
    [callResults, offset, limit]
  );
  console.log(callResults, pagedCalls, offset, offset + limit);

  return {
    loading: calls.loading,
    result: pagedCalls,
    total: callResults.length,
  };
};

const convertHighLevelFilterToLowLevelFilter = (
  effectiveFilter: WFHighLevelCallFilter
): CallFilter => {
  return {
    traceRootsOnly: effectiveFilter.traceRootsOnly,
    opVersionRefs: effectiveFilter.opVersionRefs,
    inputObjectVersionRefs: effectiveFilter.inputObjectVersionRefs,
    outputObjectVersionRefs: effectiveFilter.outputObjectVersionRefs,
    parentIds: effectiveFilter.parentId
      ? [effectiveFilter.parentId]
      : undefined,
  };
};
