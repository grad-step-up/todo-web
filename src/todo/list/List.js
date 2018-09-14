import React from "react";
import {Button, Label, Table} from "react-bootstrap";
import {connect} from "react-redux";
import "./List.css"
import ToDoDetail from "../detail/Detail.js"
import {Actions} from "../action/actions";
import {ToDoStore} from "../store/ToDoStore";
import Glyphicon from "react-bootstrap/es/Glyphicon";
import {ToDoSortColumn, ToDoSortOrder} from "../store/constants";

const mapStateToProps = state => {
    return {
        criteria: state.criteria,
        todos: state.todos,
        sorting: state.sorting
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowDetail: (todo) => {
            dispatch(Actions.toggleDetail(true, {...todo}));
        },
        onDelete: (id) => {
            dispatch(Actions.deleteToDo(id));
        },
        onSort: (column) => {
            dispatch(Actions.sortBy(column));
        }
    };
};

const ToDoList = ({todos, criteria, sorting, onShowDetail, onDelete, onSort}) => {
    const matchedTodos = ToDoStore.matchedTodos(todos, criteria, sorting);

    function getOrderIcon(column, sorting) {
        if (column !== sorting.column || sorting.order === ToDoSortOrder.None) {
            return "sort";
        } else if (sorting.order === ToDoSortOrder.Ascending) {
            return "triangle-top";
        } else {
            return "triangle-bottom";
        }
    }

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th onClick={() => onSort(ToDoSortColumn.Action)}>
                        <Glyphicon glyph={getOrderIcon(ToDoSortColumn.Action, sorting)}/>
                        Action
                    </th>
                    <th onClick={() => onSort(ToDoSortColumn.Tags)}>
                        <Glyphicon glyph={getOrderIcon(ToDoSortColumn.Tags, sorting)}/>
                        Tags
                    </th>
                    <th onClick={() => onSort(ToDoSortColumn.DueDate)}>
                        <Glyphicon glyph={getOrderIcon(ToDoSortColumn.DueDate, sorting)}/>
                        Due Date
                    </th>
                    <th onClick={() => onSort(ToDoSortColumn.Status)}>
                        <Glyphicon glyph={getOrderIcon(ToDoSortColumn.Status, sorting)}/>
                        Status
                    </th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    matchedTodos
                        .map(todo => <tr key={todo.id}>
                            <th>{todo.action}</th>
                            <th>{todo.tags.map(tag => <Label className="tag" key={tag}>{tag}</Label>)}</th>
                            <th>{todo.dueDate}</th>
                            <th>{todo.status}</th>
                            <th>
                                <Button bsStyle="link" onClick={onShowDetail.bind(this, todo)}>Details</Button>
                                <Button bsStyle="link" onClick={onDelete.bind(this, todo.id)}>Delete</Button>
                            </th>
                        </tr>)
                }
                </tbody>
            </Table>
            <div>
                <Button className="add-button" onClick={onShowDetail.bind(this, ToDoStore.createNewToDo())}>+</Button>
            </div>
            <ToDoDetail/>
        </div>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);