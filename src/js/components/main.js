import React, {Component} from 'react'
import Header from './header'
import Calendar from './calendar'
import Range from './range'

export default class APP extends Component {
    constructor(props){
        super(props);
        this.state = {
            date:Date.now(),
            selectionStart: 0,
            selectionEnd: 0
        }
    }
    prevMonth(){
        let date = new Date(this.state.date);
        date.setMonth(date.getMonth() - 1);
        this.setState({date:date.getTime()});
    }
    nextMonth(){
        let date = new Date(this.state.date);
        date.setMonth(date.getMonth() + 1);
        this.setState({date:date.getTime()});
    }
    setRange({selectionStart, selectionEnd}){
        this.setState({
            selectionStart:selectionStart ? selectionStart : 0,
            selectionEnd:selectionEnd ? selectionEnd : 0
        });
    }
    render(){
       let {date, selectionStart, selectionEnd} = this.state;
       return (<div className="calendar">
           <Range dateFrom={selectionStart} dateTo={selectionEnd}/>
           <Header date={date} prevMonth={::this.prevMonth} nextMonth={::this.nextMonth}/>
           <Calendar date={date}
                     indexStart = {selectionStart}
                     indexEnd = {selectionEnd}
                     nextMonth = {::this.nextMonth}
                     setRange = {::this.setRange}
                     />
       </div>)
    }
}