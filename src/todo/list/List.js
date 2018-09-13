import React from "react";
import {Button, Label, Table} from "react-bootstrap";
import {connect} from "react-redux";
import "./List.css"
import ToDoDetail from "../detail/Detail.js"
import {Actions} from "../action/actions";
import _ from "lodash"
const mapStateToProps = state => {
    return {
        criteria: state.criteria,
        todos: state.todos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowDetail: (todo) => {
            dispatch(Actions.toggleDetail(true, _.clone(todo)));
        },
        onDelete: (id) => {
            dispatch(Actions.deleteToDo(id));
        }
    };
};

const ToDoList = ({todos, criteria, onShowDetail,onDelete}) => {
    function matchedTodos() {
        return !criteria ? todos : todos.filter(todo => todo.tags.some(tag => tag.includes(criteria)));
    }

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>Action</th>
                    <th>Tags</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    matchedTodos()
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
            <ToDoDetail/>
        </div>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);