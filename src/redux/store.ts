import {combineReducers, createStore} from "redux"
import {kanbanReducer} from "./kanbanReducer";


const reducers = combineReducers({
    state: kanbanReducer
})

export const store = createStore(reducers)

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch