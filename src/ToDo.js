import React, {Component} from "react";
import './ToDo.css';
import {Button, Tab} from "react-bootstrap";
import {Calendar} from "react-calendar";

export default class ToDo extends Component {

    constructor(props) {
        super(props)
        this.store = props.store;
        this.state = {
            todos: props.store.getState(),
            inputValue: ""
        };
        this.inputValue = "";
        this.store.subscribe(() => {
            console.log("update");
            this.setState({todos: this.store.getState()});
        })
    }

    removeToDo(todo) {
        this.store.dispatch({type: "DEL_TODO", todo: todo});
    }

    addToDo() {
        this.store.dispatch({type: "ADD_TODO", todo: {text: this.state.inputValue}});
        this.setState({inputValue: ""})
    }

    render() {
        return (
            <div>
                <div>
                    <Calendar/>
                </div>
                <div id="todos">
                    {
                        this.state.todos.map(value =>
                            <div key={value.id} className="todo-item">
                                <div className="todo-text">{value.id}</div>
                                <div className="todo-text">{value.text}</div>
                                <button onClick={this.removeToDo.bind(this, value)}>-</button>
                            </div>)
                    }
                </div>
                <div id="new-todo">
                    <div>
                        <input type="text"
                               value={this.state.inputValue}
                               onChange={(e) => {
                                   this.setState({inputValue: e.target.value});
                               }}/>
                        <Button bsStyle="success" onClick={this.addToDo.bind(this)}>+</Button>
                    </div>
                </div>
            </div>
        );
    }
}