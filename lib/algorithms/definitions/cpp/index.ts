import type { CodeImplementation } from '../../types'

import { conceptsCpp } from './concepts'
import { dataStructuresCpp } from './data-structures'
import { sortingCpp } from './sorting'
import { searchingCpp } from './searching'
import { graphsCpp } from './graphs'
import { dynamicProgrammingCpp } from './dynamic-programming'
import { backtrackingCpp } from './backtracking'
import { divideAndConquerCpp } from './divide-and-conquer'
import { mathCpp } from './math'
import { compressionCpp } from './compression'

/** C++ translations keyed by algorithm id. */
export const cppImplementations: Record<string, CodeImplementation> = {
  ...conceptsCpp,
  ...dataStructuresCpp,
  ...sortingCpp,
  ...searchingCpp,
  ...graphsCpp,
  ...dynamicProgrammingCpp,
  ...backtrackingCpp,
  ...divideAndConquerCpp,
  ...mathCpp,
  ...compressionCpp,
}
