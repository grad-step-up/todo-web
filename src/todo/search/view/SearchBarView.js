import {Button} from "react-bootstrap";
import React, {PureComponent} from "react";
import "./SearchBarView.css"
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker/es";


export default class extends PureComponent {

    render() {
        // const fetch = (callback) =>
        //     setTimeout(() => callback(Math.floor((Math.random() * 100) + 1)), 1000
        //     );
        // const fetch = (value) => new Promise((resolve, reject) =>
        //     setTimeout(() => resolve(value + Math.floor((Math.random() * 100) + 1)), 1000
        //     ));
        // fetch(0)
        //     .then(value => (console.log(value), fetch(value)))
        //     .then(value => (console.log(value), fetch(value)))
        //     .then(value => (console.log(value), fetch(value)))
        //     .then(value => (console.log(value), fetch(value)))
        //     .then(value => (console.log(value), fetch(value)))
        //     .then(value => (console.log(value), fetch(value)));

        // console.log(this.props);
        const {criteria, onSearch} = this.props;
        return (
            <div>
                <input defaultValue={criteria.text}
                       placeholder="Search..."
                       onChange={(e) => onSearch({text: e.target.value})}/>
                <Button bsStyle="link" onClick={() => onSearch({withDate: !criteria.withDate})}>Advanced</Button>
                <div className="date-criteria-container" hidden={!criteria.withDate}>
                    <div className="date-criteria">
                        <div className="date-date-criteria-label">From:</div>
                        <DatePicker
                            selected={criteria.from}
                            onChange={(date) => onSearch({from: date})}
                            dateFormat="YYYY/MM/DD"/>

                        <div className="date-date-criteria-label">To:</div>
                        <DatePicker
                            selected={criteria.to}
                            onChange={(date) => onSearch({to: date})}
                            dateFormat="YYYY/MM/DD"/>
                    </div>
                </div>
            </div>
        );
    }
}