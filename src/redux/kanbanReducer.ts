interface IIssue {
    id: number | string
    name: string
    description: string
}

interface IIssueLog {
    title: string
    issues: Array<IIssue>
}

export interface IState {
    backlog: IIssueLog
    ready: IIssueLog
    inProgress: IIssueLog
    finished: IIssueLog
}

export const initialState: IState = {
    backlog: {
        title: 'Backlog',
        issues: [
            {
                id: 1,
                name: 'Sprint bugfix',
                description: 'Fix all the bugs'
            },
            {
                id: 2,
                name: 'Login page – performance issues',
                description: 'Login page – performance'
            },
            {
                id: 3,
                name: 'Sprint bugfix',
                description: 'Sprint bugfix'
            }
        ]
    },
    ready: {
        title: 'Ready',
        issues: [
            {
                id: 1,
                name: 'Shop page – performance issues',
                description: 'Fix all the bugs'
            },
            {
                id: 2,
                name: 'Checkout bugfix',
                description: 'Checkout bugfix'
            },
            {
                id: 3,
                name: 'Shop bug1',
                description: 'Shop bug1'
            },
            {
                id: 4,
                name: 'Shop bug2',
                description: 'Shop bug2'
            },
            {
                id: 5,
                name: 'Shop bug3',
                description: 'Shop bug3'
            },
            {
                id: 6,
                name: 'Shop bug4',
                description: 'Shop bug4'
            },
            {
                id: 7,
                name: 'Shop bug5',
                description: 'Shop bug5'
            },
            {
                id: 8,
                name: 'Shop bug6',
                description: 'Shop bug6'
            },
            {
                id: 9,
                name: 'Shop page – performance issues',
                description: 'Shop page – performance issues'
            }
        ]
    },
    inProgress: {
        title: 'In progress',
        issues: [
            {
                id: 1,
                name: 'User page – performance issues',
                description: 'Fix all the bugs'
            },
            {
                id: 2,
                name: 'Auth bugfix',
                description: 'Fix all the bugs'
            }
        ]
    },
    finished: {
        title: 'Finished',
        issues: [
            {
                id: 1,
                name: 'Main page – performance issues',
                description: 'Fix all the bugs'
            },
            {
                id: 1,
                name: 'Main page bugfix',
                description: 'Fix all the bugs'
            }
        ]
    }
}

interface IADD_ISSUE_ACTION {
    type: typeof ADD_ISSUE_ACTION
    payload: string
}

interface IMOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION {
    type: typeof MOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION
    payload: number
}

interface IMOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION {
    type: typeof MOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION
    payload: number
}

interface IMOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION {
    type: typeof MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION
    payload: number
}

type addIssueActionCreatorType = (newIssue: string) => {
    type: typeof ADD_ISSUE_ACTION
    payload: string
}

type moveIssueToReadyActionCreatorType = (id: number) => {
    type: typeof MOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION,
    payload: number
}

type moveIssueToInProcessActionCreatorType = (id: number) => {
    type: typeof MOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION
    payload: number
}

type moveIssueToFinishActionCreatorType = (id: number) => {
    type: typeof MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION
    payload: number
}

type reducerActionType =
    IADD_ISSUE_ACTION
    | IMOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION
    | IMOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION
    | IMOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION

type kanbanReducerType = (state: IState, action: reducerActionType) => IState

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
            return state
        }

        case MOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION: {
            return state
        }

        case MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION: {
            return state
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

export const moveIssueToReadyActionCreator: moveIssueToReadyActionCreatorType = (id: number) => {
    return {
        type: MOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION,
        payload: id
    }
}

export const moveIssueToInProcessActionCreator: moveIssueToInProcessActionCreatorType = (id: number) => {
    return {
        type: MOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION,
        payload: id
    }
}

export const moveIssueToFinishActionCreator: moveIssueToFinishActionCreatorType = (id: number) => {
    return {
        type: MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION,
        payload: id
    }
}