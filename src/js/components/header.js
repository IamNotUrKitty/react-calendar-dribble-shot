import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    this.dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.date !== this.props.date;
  }

  render() {
    const date = new Date(this.props.date);
    return (<div className="calendar__header">
      <div className="calendar__month-chooser">
        <span className="calendar__prev-month" onClick={this.props.prevMonth}>❮</span>
        <span>{this.monthNames[date.getMonth()]}</span>
        <span className="calendar__next-month" onClick={this.props.nextMonth}>❯</span>
      </div>
      <table className="calendar__days-names" cellSpacing="0">
        <tbody>
        <tr>
          {this.dayNames.map((i, key) => <td className="calendar__day-name" key={key}>{i}</td>)}
        </tr>
        </tbody>
      </table>
    </div>);
  }
}
Header.propTypes = {
  date: PropTypes.number.isRequired
};
