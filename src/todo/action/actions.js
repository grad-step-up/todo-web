import {ActionType} from "./type";

export const Actions = {
    search: (criteria) => ({type: ActionType.SEARCH, criteria: criteria}),
    updateDetail: (todo) => ({type: ActionType.UPDATE_DETAIL, updatedTodo: todo}),
    saveDetail: () => ({type: ActionType.SAVE_DETAIL}),
    deleteToDo: (id) => ({type: ActionType.DELETE_TODO, id: id}),
    sortBy: (column) => ({type: ActionType.SORT, column: column}),
    toggleDetail: (showDetail, todo) => ({
        type: ActionType.TOGGLE_DETAIL,
        showDetail: showDetail,
        todo: todo
    })
};