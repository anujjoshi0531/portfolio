import type { CodeImplementation } from '../../types'

import { conceptsJava } from './concepts'
import { dataStructuresJava } from './data-structures'
import { sortingJava } from './sorting'
import { searchingJava } from './searching'
import { graphsJava } from './graphs'
import { dynamicProgrammingJava } from './dynamic-programming'
import { backtrackingJava } from './backtracking'
import { divideAndConquerJava } from './divide-and-conquer'
import { mathJava } from './math'
import { compressionJava } from './compression'

/** Java translations keyed by algorithm id. */
export const javaImplementations: Record<string, CodeImplementation> = {
  ...conceptsJava,
  ...dataStructuresJava,
  ...sortingJava,
  ...searchingJava,
  ...graphsJava,
  ...dynamicProgrammingJava,
  ...backtrackingJava,
  ...divideAndConquerJava,
  ...mathJava,
  ...compressionJava,
}
