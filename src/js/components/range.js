import React, {Component, PropTypes} from 'react'

export default class Range extends Component {
    constructor(props) {
        super(props);
        this.monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        this.daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }
    dateInfo(date){
        let dateRow;
        let rangeMonthText = 'Choose a date';
        if(date){
            dateRow = <td rowSpan="2"><span className="calendar__range-date">{date.getDate()}</span></td>;
            rangeMonthText = this.monthNames[date.getMonth()]+' '+ date.getFullYear();
        }
        return (<tr>
            {dateRow}
            <td>
                <span className="calendar__range-month">
                    {rangeMonthText}
                </span>
            </td>
        </tr>);
    }
    dumbDate(date, title){
       let day = (date)?(<tr>
               <td>
                   <span className="calendar__range-day">{this.daysNames[date.getDay()]}</span>
               </td>
           </tr>)
           :null;
       return (<div className="calendar__from-date">
            <table>
                <tbody>
                    <tr>
                        <td colSpan="2"><span className="calendar__range-h">{title}</span></td>
                    </tr>
                    {this.dateInfo(date)}
                    {day}
                </tbody>
            </table>
        </div>)
    }
    render() {
        let {dateFrom, dateTo} = this.props;
        dateTo = dateTo ? new Date(dateTo) : dateTo;
        dateFrom = dateFrom ? new Date(dateFrom) : dateFrom;
        return (<div className="calendar__range">
            {this.dumbDate(dateFrom,'check-in')}
            <div className="calendar__image-arrow">
                <span>&#8594;</span>
            </div>
            {this.dumbDate(dateTo,'check-out')}
        </div>)
    }
}
Range.propTypes = {
  dateFrom:PropTypes.number,
  dateTo:PropTypes.number
};