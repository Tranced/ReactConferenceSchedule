import React from 'react';
import './index.css';
import ScheduleContainer from './ScheduleContainer';

// ReactDOM.render(<ScheduleContainer />, document.getElementById('root'));


import { hydrate, render } from 'react-dom';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(<ScheduleContainer />, rootElement);
} else {
  render(<ScheduleContainer />, rootElement);
}