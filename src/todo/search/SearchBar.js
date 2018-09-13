import React from "react";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import {Actions} from "../action/actions";


const mapStateToProps = state => {
    return {
        criteria: state.criteria
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSearch: criteria => {
            dispatch(Actions.search(criteria));
        }
    };
};

const SearchBar = (props) => {
    return (
        <div>
            <input defaultValue={props.criteria}
                   onChange={(e) => props.onSearch(e.target.value)}/>
            <Button bsStyle="link">Advanced</Button>
        </div>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);