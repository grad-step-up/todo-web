import {connect} from "react-redux";
import SearchBar from "./view/SearchBarView";
import {Actions} from "../action/actions";


const mapStateToProps = state => {
    return {
        criteria: state.criteria,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSearch: criteria => {
            dispatch(Actions.search(criteria));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);