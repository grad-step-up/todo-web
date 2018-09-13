import React from "react";
import './ToDo.css';
import {createStore} from "redux";

export default function createToDoStore() {

    const reducer = (state = [], action) => {
        console.log(action);
        switch (action.type) {
            case "ADD_TODO":
                return state.concat({id: ++lastId, ...action.todo});
            case "DEL_TODO":
                return state.filter((ti) => ti.id !== action.todo.id);
            default:
        }
        return state;
    };

    const initialState = [
        {id: 1, text: "hello"},
        {id: 2, text: "world"},
        {id: 3, text: "hell"},
        {id: 4, text: "kitty"}
    ];

    let lastId = initialState[initialState.length - 1].id;

    return createStore(reducer, initialState);
}