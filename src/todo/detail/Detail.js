import React from "react";
import {connect} from "react-redux";
import "./Detail.css"
import {Button, Label, Modal} from "react-bootstrap";
import {Actions} from "../action/actions";
import {ToDoStatus} from "../store/status";
import _ from "lodash";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';

const mapStateToProps = state => {
    return {
        showDetail: state.showDetail,
        todo: state.todo
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
    };
};
const statusOptions = _.map(ToDoStatus, value => ({
    value: value, label: value
}));

const ToDoDetail = ({showDetail, onClose, onSave, todo, onUpdateStatus, onUpdateDueDate, onUpdateAction}) => {
    return (
        <div className="static-modal">
            <Modal show={showDetail}>
                <Modal.Header closeButton>
                    <Modal.Title>Details of Action - {todo && todo.action}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="detail-label">Action:</div>
                        <input type="text" placeholder={todo && todo.action} onChange={onUpdateAction}/>
                    </div>
                    <div>
                        <div className="detail-label inline-next">Due Date:</div>
                        <DatePicker selected={todo && moment(todo.dueDate)} onChange={onUpdateDueDate} dateFormat="YYYY/MM/DD"/>
                    </div>
                    <div>
                        <div className="detail-label">Status:</div>
                        <Select
                            defaultValue={(todo && todo.status) || null}
                            onChange={onUpdateStatus}
                            options={statusOptions}
                            className="status-selector"
                        />
                    </div>
                    <div>
                        <div className="detail-label">Tags:</div>
                        {todo && todo.tags.map(tag => <Label key={tag} className="tag">{tag}</Label>)}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onSave} bsStyle="primary">Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(ToDoDetail);