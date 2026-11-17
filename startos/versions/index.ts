import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_2_1_0_8 } from './v2.1.0_8'
import { v_2_1_3_0 } from './v2.1.3_0'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_2_1_0_8, v_2_1_3_0],
})
