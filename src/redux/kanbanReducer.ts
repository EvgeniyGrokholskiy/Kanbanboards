import {IIssue, IIssueLog, IState, ITask} from "../components/interfases/interfasesAndTypes";


interface IADD_ISSUE_ACTION {
    type: typeof ADD_ISSUE_ACTION
    payload: string
}

interface IMOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION {
    type: typeof MOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION
    payload: string
}

interface IMOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION {
    type: typeof MOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION
    payload: string
}

interface IMOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION {
    type: typeof MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION
    payload: string
}

type reducerActionType =
    IADD_ISSUE_ACTION
    | IMOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION
    | IMOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION
    | IMOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION

type addIssueActionCreatorType = (newIssue: string) => {
    type: typeof ADD_ISSUE_ACTION
    payload: string
}

type moveIssueToReadyActionCreatorType = (id: string) => {
    type: typeof MOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION,
    payload: string
}

type moveIssueToInProcessActionCreatorType = (id: string) => {
    type: typeof MOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION
    payload: string
}

type moveIssueToFinishActionCreatorType = (id: string) => {
    type: typeof MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION
    payload: string
}

type kanbanReducerType = (state: IState, action: reducerActionType) => IState

export const initialState: IState = {
    "backlog": {
        title: 'Backlog',
        issues: [
            {
                id: "1",
                name: 'Sprint bugfix',
                description: 'Fix all the bugs'
            },
            {
                id: "2",
                name: 'Login page – performance issues',
                description: 'Login page – performance'
            },
            {
                id: "3",
                name: 'Sprint bugfix',
                description: 'Sprint bugfix'
            }
        ]
    },
    "ready": {
        title: 'Ready',
        issues: [
            {
                id: "1",
                name: 'Shop page – performance issues',
                description: 'Fix all the bugs'
            },
            {
                id: "2",
                name: 'Checkout bugfix',
                description: 'Checkout bugfix'
            },
            {
                id: "3",
                name: 'Shop bug1',
                description: 'Shop bug1'
            },
            {
                id: "4",
                name: 'Shop bug2',
                description: 'Shop bug2'
            },
            {
                id: "5",
                name: 'Shop bug3',
                description: 'Shop bug3'
            },
            {
                id: "6",
                name: 'Shop bug4',
                description: 'Shop bug4'
            },
            {
                id: "7",
                name: 'Shop bug5',
                description: 'Shop bug5'
            },
            {
                id: "8",
                name: 'Shop bug6',
                description: 'Shop bug6'
            },
            {
                id: "9",
                name: 'Shop page – performance issues',
                description: 'Shop page – performance issues'
            }
        ]
    },
    "inProgress": {
        title: 'In progress',
        issues: [
            {
                id: "1",
                name: 'User page – performance issues',
                description: 'Fix all the bugs'
            },
            {
                id: "2",
                name: 'Auth bugfix',
                description: 'Fix all the bugs'
            }
        ]
    },
    "finished": {
        title: 'Finished',
        issues: [
            {
                id: "1",
                name: 'Main page – performance issues',
                description: 'Fix all the bugs'
            },
            {
                id: "2",
                name: 'Main page bugfix',
                description: 'Fix all the bugs'
            }
        ]
    }
}

const ADD_ISSUE_ACTION = "KANBANBOARD/SRC/REDUX/KANBANREDUCER/ADD_ISSUE_ACTION"
const MOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION = "KANBANBOARD/SRC/REDUX/KANBANREDUCER/MOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION"
const MOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION = "KANBANBOARD/SRC/REDUX/KANBANREDUCER/MOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION"
const MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION = "KANBANBOARD/SRC/REDUX/KANBANREDUCER/MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION"

export const kanbanReducer: kanbanReducerType = (state: IState = initialState, action: reducerActionType): IState => {
    switch (action.type) {

        case ADD_ISSUE_ACTION: {
            const newIssue: IIssue = {
                id: `${state.backlog.issues.length}${action.payload}`,
                name: action.payload,
                description: ""
            }

            let newBacklog: IIssueLog = {
                title: "Backlog",
                issues: [...state.backlog.issues, newIssue]
            }

            return {
                ...state, backlog: newBacklog
            }
        }

        case MOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION: {

            const selectedIssue: Array<ITask> = state.backlog.issues.filter((task: ITask) => task.id === action.payload)
            const prevTaskWithOutSelectedIssue: Array<IIssue> = state.backlog.issues.filter((task: ITask) => task.id !== action.payload)

            const newBacklog: IIssueLog = {
                title: "Backlog",
                issues: prevTaskWithOutSelectedIssue
            }

            const newReady: IIssueLog = {
                title: "Ready",
                issues: [...state.ready.issues, selectedIssue[0]]
            }

            return {
                ...state, backlog: newBacklog, ready: newReady
            }
        }

        case MOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION: {

            const selectedIssue: Array<ITask> = state.ready.issues.filter((task: ITask) => task.id === action.payload)
            const prevTaskWithOutSelectedIssue: Array<IIssue> = state.ready.issues.filter((task: ITask) => task.id !== action.payload)

            const newReady: IIssueLog = {
                title: "Ready",
                issues: prevTaskWithOutSelectedIssue
            }

            const newInProgress: IIssueLog = {
                title: "In progress",
                issues: [...state.inProgress.issues, selectedIssue[0]]
            }

            return {
                ...state, ready: newReady, inProgress: newInProgress
            }
        }

        case MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION: {

            const selectedIssue: Array<ITask> = state.inProgress.issues.filter((task: ITask) => task.id === action.payload)
            const prevTaskWithOutSelectedIssue: Array<IIssue> = state.inProgress.issues.filter((task: ITask) => task.id !== action.payload)

            const newInProgress: IIssueLog = {
                title: "In progress",
                issues: prevTaskWithOutSelectedIssue
            }

            const newFinished: IIssueLog = {
                title: "Finished",
                issues: [...state.finished.issues, selectedIssue[0]]
            }

            return {
                ...state, inProgress: newInProgress, finished: newFinished
            }
        }

        default:
            return state
    }
}

export const addIssueActionCreator: addIssueActionCreatorType = (newIssue: string) => {
    return {
        type: ADD_ISSUE_ACTION,
        payload: newIssue
    }
}

export const moveIssueToReadyActionCreator: moveIssueToReadyActionCreatorType = (id: string) => {
    return {
        type: MOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION,
        payload: id
    }
}

export const moveIssueToInProcessActionCreator: moveIssueToInProcessActionCreatorType = (id: string) => {
    return {
        type: MOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION,
        payload: id
    }
}

export const moveIssueToFinishActionCreator: moveIssueToFinishActionCreatorType = (id: string) => {
    return {
        type: MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION,
        payload: id
    }
}