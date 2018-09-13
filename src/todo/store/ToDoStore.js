import {createStore} from "redux";
import {ToDoStatus} from "./status";
import {ActionType} from "../action/type";
import moment from "moment";

export class ToDoStore {
    static create() {
        const reducer = (state, action) => {
            switch (action.type) {
                case ActionType.SEARCH:
                    state = {...state, criteria: action.criteria}
                    break;
                case ActionType.TOGGLE_DETAIL:
                    state = {...state, showDetail: action.showDetail, todo: action.todo}
                    break;
                case ActionType.UPDATE_DETAIL:
                    state = {...state, todo: {...state.todo, ...action.updatedTodo}}
                    break;
                case ActionType.SAVE_DETAIL:
                    state = {
                        ...state,
                        showDetail: false,
                        todos: state.todos.map(todo => todo.id === state.todo.id ? state.todo : todo),
                        todo: null
                    };
                    break;
                case ActionType.DELETE_TODO:
                    state = {
                        ...state,
                        todos: state.todos.filter(todo => todo.id !== action.id)
                    };
                    break;
                default:
            }
            // console.log(state);
            return state;
        };

        const initialState = {
            todos: [
                {
                    id: 1,
                    action: "hello",
                    tags: ["hello"],
                    dueDate: moment().add(1, "days").format("YYYY-MM-DD"),
                    status: ToDoStatus.ToDo
                },
                {
                    id: 2,
                    action: "world",
                    tags: [],
                    dueDate: moment().add(3, "days").format("YYYY-MM-DD"),
                    status: ToDoStatus.InProgress
                },
                {
                    id: 3,
                    action: "hellx",
                    tags: ["hello"],
                    dueDate: moment().add(5, "days").format("YYYY-MM-DD"),
                    status: ToDoStatus.InProgress
                },
                {
                    id: 4,
                    action: "kitty",
                    tags: ["value", "kitty"],
                    dueDate: moment().add(7, "days").format("YYYY-MM-DD"),
                    status: ToDoStatus.Blocked
                }
            ],
            showDetail: false
        };

        return createStore(reducer, initialState);
    }
}

