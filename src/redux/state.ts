import {combineReducers, createStore} from "redux"
import {IState, kanbanReducer} from "./kanbanReducer";
import any = jasmine.any;

const reducers = combineReducers({
    state: kanbanReducer
})

const state:IState = createStore(reducers)