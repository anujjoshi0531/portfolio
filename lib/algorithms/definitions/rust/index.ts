import type { CodeImplementation } from '../../types'

import { conceptsRust } from './concepts'
import { dataStructuresRust } from './data-structures'
import { sortingRust } from './sorting'
import { searchingRust } from './searching'
import { graphsRust } from './graphs'
import { dynamicProgrammingRust } from './dynamic-programming'
import { backtrackingRust } from './backtracking'
import { divideAndConquerRust } from './divide-and-conquer'
import { mathRust } from './math'
import { compressionRust } from './compression'

/** Rust translations keyed by algorithm id. */
export const rustImplementations: Record<string, CodeImplementation> = {
  ...conceptsRust,
  ...dataStructuresRust,
  ...sortingRust,
  ...searchingRust,
  ...graphsRust,
  ...dynamicProgrammingRust,
  ...backtrackingRust,
  ...divideAndConquerRust,
  ...mathRust,
  ...compressionRust,
}
