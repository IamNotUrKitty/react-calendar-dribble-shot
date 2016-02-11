import React from 'react'
import ReactDom from 'react-dom'
import APP from './components/main'

require('../styles/style.styl');

ReactDom.render(<APP />, document.querySelector('#app'));
