import React, {PureComponent} from 'react';
import './App.css';
import {SearchBar, ToDoList} from "./todo";
import {Tab, Tabs} from "react-bootstrap";
import ToDoStatistic from "./todo/stats/Statistic";

class App extends PureComponent {
    render() {
        return (

            <div className="center scale-60">
                <Tabs defaultActiveKey="todos" id="todo-tab">
                    <SearchBar/>
                    <Tab eventKey="todos" title="ToDos">
                        <ToDoList/>
                    </Tab>
                    <Tab eventKey="stats" title="Statistic">
                        <ToDoStatistic/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default App;
