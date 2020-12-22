import constants from './constants';
let transactions = [];

const contextReducer = (state, action) => {
    switch(action.type){
        case constants.DELETE_TRANSACTION:
            transactions = state.filter((t) => t.id !== action.payload)
            return transactions;
        case constants.ADD_TRANSACTION:
            transactions  = [action.payload, ...state];
            return transactions;
        default: 
            return state;
    }
}

export default contextReducer;