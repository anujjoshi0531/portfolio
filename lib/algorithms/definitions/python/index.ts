import type { CodeImplementation } from '../../types'

import { conceptsPython } from './concepts'
import { dataStructuresPython } from './data-structures'
import { sortingPython } from './sorting'
import { searchingPython } from './searching'
import { graphsPython } from './graphs'
import { dynamicProgrammingPython } from './dynamic-programming'
import { backtrackingPython } from './backtracking'
import { divideAndConquerPython } from './divide-and-conquer'
import { mathPython } from './math'
import { compressionPython } from './compression'

/** Python translations keyed by algorithm id. */
export const pythonImplementations: Record<string, CodeImplementation> = {
  ...conceptsPython,
  ...dataStructuresPython,
  ...sortingPython,
  ...searchingPython,
  ...graphsPython,
  ...dynamicProgrammingPython,
  ...backtrackingPython,
  ...divideAndConquerPython,
  ...mathPython,
  ...compressionPython,
}
