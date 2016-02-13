import React from 'react';
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import Dispatcher from 'redux-devtools-dispatch'
import MultipleMonitors from 'redux-devtools-dispatch/lib/MultipleMonitors'

export default createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' defaultIsVisible={false}>
    <MultipleMonitors>
      <LogMonitor />
      <Dispatcher/>
    </MultipleMonitors>
  </DockMonitor>
)
