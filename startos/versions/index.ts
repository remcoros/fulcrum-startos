import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_2_1_0_8 } from './v2.1.0.8'
import { v_2_1_0_9 } from './v2.1.0.9'
import { v_2_1_1_0 } from './v2.1.1.0'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_2_1_1_0, v_2_1_0_9, v_2_1_0_8],
})
