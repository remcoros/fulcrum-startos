import { VersionGraph } from '@start9labs/start-sdk'
import { v_2_1_0_8 } from './v2.1.0.8'
import { v_2_1_0_9 } from './v2.1.0.9'

export const versionGraph = VersionGraph.of({
  current: v_2_1_0_9,
  other: [v_2_1_0_8],
})
