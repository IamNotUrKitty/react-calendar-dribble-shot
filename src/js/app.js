import React from 'react'
import ReactDom from 'react-dom'
import RangePicker from './components/main'
require('../styles/style.styl');
require('./utils/array.fill.js');

ReactDom.render(<RangePicker nameFrom="dateFrom" nameTo="dateTo"/>, document.querySelector('#app'));
