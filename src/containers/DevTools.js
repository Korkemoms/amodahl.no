// @flow
import React from 'react'

// Exported from redux-devtools
import { createDevTools } from 'redux-devtools'

// Monitors are separate packages, and you can make a custom one
import DockMonitor from 'redux-devtools-dock-monitor'
import LogMonitor from 'redux-devtools-log-monitor'

const DevTools = createDevTools(
  <DockMonitor defaultPosition='bottom' defaultSize={0.032}
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    changeMonitorKey='ctrl-m'>
    <LogMonitor theme='solarized' />
  </DockMonitor>
)

export default DevTools
