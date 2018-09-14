import React from "react";
import {connect} from "react-redux";
import "./Detail.css"
import {Button, Modal} from "react-bootstrap";
import {Actions} from "../action/actions";
import {ToDoStatus} from "../store/constants";
import _ from "lodash";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';
import CreatableSelect from 'react-select/lib/Creatable';

const mapStateToProps = state => {
    return {
        showDetail: state.showDetail,
        title: state.detailTitle,
        todo: state.todo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClose: () => {
            dispatch(Actions.toggleDetail(false));
        },
        onSave: () => {
            dispatch(Actions.saveDetail());
        },
        onUpdateStatus: (selectedOption) => {
            dispatch(Actions.updateDetail({status: selectedOption.value}));
        },
        onUpdateDueDate: (date) => {
            dispatch(Actions.updateDetail({dueDate: date.format("YYYY-MM-DD")}));
        },
        onUpdateAction: (e) => {
            dispatch(Actions.updateDetail({action: e.target.value}));
        },
        onUpdateTags: (values) => {
            dispatch(Actions.updateDetail({tags: values.map(value => value.value)}));
        },
    };
};
const statusOptions = _.map(ToDoStatus, value => ({
    value: value, label: value
}));

const ToDoDetail = ({title, showDetail, onClose, onSave, todo, onUpdateStatus,
                        onUpdateDueDate, onUpdateAction, onUpdateTags}) => {
    function convertToSelectStatus(todo) {
        return todo && ({value: todo.status, label: todo.status});
    }

    function convertToSelectTags(todo) {
        return todo && todo.tags.map(tag => ({value: tag, label: tag}));
    }

    const selectTags = convertToSelectTags(todo);

    return (
        <div className="static-modal">
            <Modal show={showDetail}>
                <Modal.Header closeButton>
                    <Modal.Title>Details of Action - {title || "Create New ToDo"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="detail-label">Action:</div>
                        <input className="status-selector" type="text" placeholder={todo && todo.action}
                               onChange={onUpdateAction}/>
                    </div>
                    <div>
                        <div className="detail-label inline-next">Due Date:</div>
                        <DatePicker className="status-selector"
                                    selected={todo && moment(todo.dueDate)} onChange={onUpdateDueDate}
                                    dateFormat="YYYY/MM/DD"/>
                    </div>
                    <div>
                        <div className="detail-label">Status:</div>
                        <Select
                            value={convertToSelectStatus(todo)}
                            onChange={onUpdateStatus}
                            options={statusOptions}
                            className="status-selector"
                        />
                    </div>
                    <div>
                        <div className="detail-label">Tags:</div>
                        <CreatableSelect
                            className="status-selector"
                            isMulti
                            isClearable
                            onChange={onUpdateTags}
                            defaultValue={selectTags}
                            options={selectTags}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onSave} bsStyle="primary">OK</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(ToDoDetail);