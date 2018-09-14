import {createStore} from "redux";
import {ToDoSortColumn, ToDoSortOrder, ToDoStatus} from "./constants";
import {ActionType} from "../action/type";
import moment from "moment";
import _ from "lodash";

export class ToDoStore {


    static matchedTodos(todos, criteria, sorting) {
        let stream = _.chain(todos)
            .filter(todo => !criteria.text || todo.tags.some(tag => tag.includes(criteria.text)))
            .filter(todo => !criteria.withDate || (
                criteria.from.isSameOrBefore(todo.dueDate, "days") && criteria.to.isSameOrAfter(todo.dueDate, "days")
            ));
        if (sorting && sorting.order !== ToDoSortOrder.None) {
            // console.log(criteria, sorting);
            stream = stream.sortBy(sorting.column);
            if (sorting.order === ToDoSortOrder.Descending) {
                stream = stream.reverse();
            }
        }
        return stream.value();
    }

    static createNewToDo() {
        return {
            id: null,
            action: null,
            tags: [],
            dueDate: moment().format("YYYY-MM-DD"),
            status: ToDoStatus.ToDo
        };
    }


    static create() {
        let nextId = 10;

        function createOrUpdateTodo(todos, todo) {
            if (todo.id) {
                return todos.map(t => t.id === todo.id ? todo : t);
            } else {
                return [...todos, {...todo, id: nextId++}];
            }
        }

        function reorder(order) {
            return [ToDoSortOrder.None, ToDoSortOrder.Descending].includes(order) ? ToDoSortOrder.Ascending : ToDoSortOrder.Descending;
        }

        function sort(sorting, column) {
            return {
                column: column,
                order: sorting.column === column ? reorder(sorting.order) : ToDoSortOrder.Ascending
            }
        }

        const reducer = (state, action) => {
            switch (action.type) {
                case ActionType.SEARCH:
                    state = {...state, criteria: {...state.criteria, ...action.criteria}};
                    break;
                case ActionType.TOGGLE_DETAIL:
                    console.log(action.todo);
                    state = {
                        ...state,
                        showDetail: action.showDetail,
                        detailTitle: (action.todo && action.todo.action),
                        todo: action.todo
                    };
                    break;
                case ActionType.UPDATE_DETAIL:
                    state = {...state, todo: {...state.todo, ...action.updatedTodo}};
                    break;
                case ActionType.SAVE_DETAIL:
                    state = {
                        ...state,
                        showDetail: false,
                        todos: createOrUpdateTodo(state.todos, state.todo),
                        todo: null
                    };
                    break;
                case ActionType.DELETE_TODO:
                    state = {
                        ...state,
                        todos: state.todos.filter(todo => todo.id !== action.id)
                    };
                    break;
                case ActionType.SORT:
                    state = {
                        ...state,
                        sorting: sort(state.sorting, action.column)
                    };
                    break;
                default:
            }
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
            showDetail: false,
            criteria: {
                withDate: false,
                text: "",
                from: moment().subtract(7, "days"),
                to: moment().add(7, "days")
            },
            sorting: {
                column: ToDoSortColumn.Action,
                order: ToDoSortOrder.None
            }
        };

        return createStore(reducer, initialState);
    }
}

