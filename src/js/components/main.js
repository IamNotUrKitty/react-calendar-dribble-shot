import React, {Component, PropTypes} from 'react'
import Header from './header'
import Calendar from './calendar'
import Range from './range'

export default class RangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date.now(),
      selectionStart: 0,
      selectionEnd: 0
    }
  }

  prevMonth() {
    let date = new Date(this.state.date);
    date.setMonth(date.getMonth() - 1);
    this.setState({date: date.getTime()});
  }

  nextMonth() {
    let date = new Date(this.state.date);
    date.setMonth(date.getMonth() + 1);
    this.setState({date: date.getTime()});
  }

  setRange(selectionStart = 0, selectionEnd = 0) {
    this.setState({selectionStart, selectionEnd});
  }

  render() {
    let {date, selectionStart, selectionEnd} = this.state;
    return (<div className="calendar">
      <input type="hidden" name={this.props.nameFrom} value={this.state.selectionStart}/>
      <input type="hidden" name={this.props.nameTo} value={this.state.selectionEnd}/>
      <Range dateFrom={selectionStart} dateTo={selectionEnd}/>
      <Header date={date} prevMonth={::this.prevMonth} nextMonth={::this.nextMonth}/>
      <Calendar date={date}
                indexStart={selectionStart}
                indexEnd={selectionEnd}
                setRange={::this.setRange}
      />
    </div>)
  }
}

RangePicker.propTypes = {
  nameFrom: PropTypes.string.isRequired,
  nameTo: PropTypes.string.isRequired
};
