import { put, takeEvery, all } from 'redux-saga/effects';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { INCREMENT, STOP } from './reducer';

const action = type => () => ({ type });

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSagas);

export const Counter = connect(state => ({ value: state }), {
    onIncrement: action(INCREMENT),
    onStop: action(STOP),
})(Counter)

export function* rootSagas() {
    yield all([watchIncrementAsync()]);
};

export function anonymous() {
    return ;
}