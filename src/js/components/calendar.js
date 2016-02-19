import React, {Component, PropTypes} from 'react'

export default class Calendar extends Component{
    constructor(props){
        super(props);
        this.selectionEnaled = false;
        this.animationDirection = "forward";
        this.shortMonthNames = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
        this.currentDate = new Date();
    }
    handleClick(index){
        if(new Date(index) < this.currentDate){
            return false;
        }
        let {setRange, indexStart, indexEnd} = this.props;
        if(this.selectionEnabled ){
            if((index == indexStart)){
                this.selectionEnabled = false;
                setRange();
            }else{
                this.selectionEnabled = false;
                setRange(this.props.indexStart, index);
            }
        }else{
            if(index == indexEnd){
                this.selectionEnabled = true;
            }else{
                this.selectionEnabled = true;
                setRange(index);
            }
        }
    }
    mouseOver(index){
        if(this.selectionEnabled && (index >= this.props.indexStart)){
            this.props.setRange(this.props.indexStart, index);
        }
    }
    componentWillUpdate(nextProps){
        if(nextProps.date != this.props.date){
            this.animationDirection = (nextProps.date - this.props.date > 0) ? "forward" : "backward"
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.date != this.props.date){
            this.refs.calendar.classList.add(`animate--${this.animationDirection}`);
        }
    }
    getDay(date, key, month){
        let time = date.getTime();
        let currentDate = this.currentDate;
        let {indexEnd, indexStart} = this.props;
        let dayClass = (time > indexStart && time < indexEnd) ? 'sel' : '';
        dayClass += ( date < currentDate.setHours(0)) ?' out--range':'';
        dayClass += (time == indexStart && indexEnd > indexStart) ? ' sel--start' : '';
        dayClass += (time == indexEnd && time > indexStart) ? ' sel--end' : '';
        dayClass += (date.getMonth() == month)?' calendar__day':' calendar__day dis';
        return(<td className={dayClass}
                   onClick={this.handleClick.bind(this, time)}
                   onMouseOver={this.mouseOver.bind(this,time)}
                   key={key}>
                       <div className="calendar__inner-day">
                           {date.getDate()}
                       </div>
              </td>)
    }
    render(){
        let date  = new Date(this.props.date);
        let month = date.getMonth();
        date.setDate(1);
        if(this.animationDirection == "forward"){
            date.setMonth(date.getMonth() - 1);
        }
        let firstDay = date.getDay();
        if(firstDay !== 1){
            (firstDay == 0)?
                date.setDate(-6)
                :date.setDate(1 - firstDay);
        }else{
            date.setDate(0);
        }
        return(<div className="calendar__wrap">
            <table className="calendar__table" ref="calendar" key={this.props.date} cellSpacing="0">
                <tbody>
                {Array(12).fill(0).map((i, key)=> {
                    return <tr key={key}>
                        {Array(7).fill(0).map((_i, _key)=> {
                            date.setDate(date.getDate() + 1);
                            return this.getDay(date, _key, month);
                        })}
                    </tr>
                })}
                </tbody>
            </table>
        </div>)
    }
}

Calendar.propTypes = {
    setRange:PropTypes.func.isRequired,
    indexStart:PropTypes.number,
    indexEnd: PropTypes.number,
    date:PropTypes.number.isRequired
};