import React from "react";
import {connect} from "react-redux";
import PieChart from "react-svg-piechart"
import './Statistic.css';
import _ from "lodash";
import moment from "moment"

const mapStateToProps = state => {
    return {
        criteria: state.criteria,
        todos: state.todos
    };
};

const color = {
    InProgress: "#1c8f64",
    "Out of Date": "#1c8f64",
    Blocked: "#ce4908",
    "In 1 days": "#ce4908",
    ToDo: "#615aa4",
    "In 3 days": "#615aa4",
    Unavailable: "#808080"
};

const ToDoStatistic = ({todos, criteria}) => {
    const unavailableData = ({
        title: "Unavailable",
        value: 1,
        color: color["Unavailable"]
    });

    function matchedTodos() {
        return !criteria ? todos : todos.filter(todo => todo.tags.some(tag => tag.includes(criteria)));
    }


    function withDefault(value) {
        return value.length ? value : [unavailableData];
    }

    function statByStatus(todos) {
        return withDefault(_.chain(todos).groupBy((todo) => todo.status).map((value, key) => ({
            title: key,
            value: value.length,
            color: color[key]
        })).value());
    }

    function daysToDueDate(dueDate) {
        const days = moment(dueDate).diff(moment(), "days");
        if (days <= 1) {
            return "In 1 days";
        } else if (days <= 3) {
            return "In 3 days";
        } else {
            return "Out of Date";
        }
    }

    function statByDueDate(todos) {
        return withDefault(_.chain(todos).groupBy((todo) => daysToDueDate(todo.dueDate)).map((value, key) => ({
            title: key,
            value: value.length,
            color: color[key]
        })).value());
    }

    return (
        <div>
            <div className="indicator">
                <div className="indicator-icon in-progress"/>
                <div>In Progress</div>
                <div className="indicator-icon blocked"/>
                <div>Blocked</div>
                <div className="indicator-icon todo"/>
                <div>To Do</div>
            </div>
            <div className="stat-chart">
                <PieChart
                    data={statByStatus(matchedTodos())}
                    // If you need expand on hover (or touch) effect
                    expandOnHover
                />
            </div>
            <br/>
            <div className="indicator">
                <div className="indicator-icon in-progress"/>
                <div>Out of Date</div>
                <div className="indicator-icon blocked"/>
                <div>In 1 days</div>
                <div className="indicator-icon todo"/>
                <div>In 3 days</div>
            </div>
            <div className="stat-chart">
                <PieChart
                    data={statByDueDate(matchedTodos())}
                    // If you need expand on hover (or touch) effect
                    expandOnHover
                />
            </div>
        </div>
    );
};


export default connect(mapStateToProps)(ToDoStatistic);