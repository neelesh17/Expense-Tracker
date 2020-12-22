import React, { useReducer, createContext} from 'react';
import contextReducer from './contextReducer';
import constants from './constants';
const initialState = [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({children}) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    //Action Creators
    const deleteTransactions = (id) => (dispatch({ type: constants.DELETE_TRANSACTION, payload: id}));
    const addTransactions = (transaction) => (dispatch({ type: constants.ADD_TRANSACTION, payload: transaction}));

    return (
        <ExpenseTrackerContext.Provider value={{
            deleteTransactions, addTransactions
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}