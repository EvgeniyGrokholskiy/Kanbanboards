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

interface ISAVE_DESCRIPTION_TO_ISSUE_ACTION {
    type: typeof SAVE_DESCRIPTION_TO_ISSUE_ACTION,
    payload: {
        id: string
        issueLogName: string
        descriptionText: string
    }
}

interface ISAVE_STATE_ACTION {
    type: typeof SAVE_STATE_ACTION
    payload: IState
}

type reducerActionType =
    IADD_ISSUE_ACTION
    | IMOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION
    | IMOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION
    | IMOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION
    | ISAVE_DESCRIPTION_TO_ISSUE_ACTION
    | ISAVE_STATE_ACTION

type AddIssueActionCreatorType = (newIssue: string) => {
    type: typeof ADD_ISSUE_ACTION
    payload: string
}

type MoveIssueToReadyActionCreatorType = (id: string) => {
    type: typeof MOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION,
    payload: string
}

type MoveIssueToInProcessActionCreatorType = (id: string) => {
    type: typeof MOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION
    payload: string
}

type MoveIssueToFinishActionCreatorType = (id: string) => {
    type: typeof MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION
    payload: string
}

type SaveDescriptionToIssueActionCreatorType = (id: string, issueLogName: string, descriptionText: string) => {
    type: typeof SAVE_DESCRIPTION_TO_ISSUE_ACTION,
    payload: {
        id: string
        issueLogName: string
        descriptionText: string
    }
}

type SaveStateActionCreatorType = (state: IState) => {
    type: typeof SAVE_STATE_ACTION
    payload: IState
}

type KanbanReducerType = (state: IState, action: reducerActionType) => IState

export const initialState: IState = {
    "backlog": {
        title: 'Backlog',
        issues: [
            /*{
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
            }*/
        ]
    },
    "ready": {
        title: 'Ready',
        issues: [
            /*{
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
            }*/
        ]
    },
    "inprogress": {
        title: 'In progress',
        issues: [
            /*{
                id: "1",
                name: 'User page – performance issues',
                description: 'Fix all the bugs'
            },
            {
                id: "2",
                name: 'Auth bugfix',
                description: 'Fix all the bugs'
            }*/
        ]
    },
    "finished": {
        title: 'Finished',
        issues: [
            /*{
                id: "1",
                name: 'Main page – performance issues',
                description: 'Fix all the bugs'
            },
            {
                id: "2",
                name: 'Main page bugfix',
                description: 'Fix all the bugs'
            }*/
        ]
    }
}

const ADD_ISSUE_ACTION = "KANBANBOARD/SRC/REDUX/KANBANREDUCER/ADD_ISSUE_ACTION"
const SAVE_STATE_ACTION = "KANBANBOARD/SRC/REDUX/KANBANREDUCER/SAVE_STATE_ACTION"
const SAVE_DESCRIPTION_TO_ISSUE_ACTION = "KANBANBOARD/SRC/REDUX/KANBANREDUCER/SAVE_DESCRIPTION_TO_ISSUE_ACTION"
const MOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION = "KANBANBOARD/SRC/REDUX/KANBANREDUCER/MOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION"
const MOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION = "KANBANBOARD/SRC/REDUX/KANBANREDUCER/MOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION"
const MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION = "KANBANBOARD/SRC/REDUX/KANBANREDUCER/MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION"

export const kanbanReducer: KanbanReducerType = (state: IState = initialState, action: reducerActionType): IState => {
    switch (action.type) {

        case ADD_ISSUE_ACTION: {
            const postfix = Math.round((Math.random() * 100))
            const newIssue: IIssue = {
                id: `${state.backlog.issues.length}${postfix}`,
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

            if (action.payload === "Select issue..."){
                return state
            }

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

            if (action.payload === "Select issue..."){
                return state
            }

            const selectedIssue: Array<ITask> = state.ready.issues.filter((task: ITask) => task.id === action.payload)
            const prevTaskWithOutSelectedIssue: Array<IIssue> = state.ready.issues.filter((task: ITask) => task.id !== action.payload)

            const newReady: IIssueLog = {
                title: "Ready",
                issues: prevTaskWithOutSelectedIssue
            }

            const newInProgress: IIssueLog = {
                title: "In progress",
                issues: [...state.inprogress.issues, selectedIssue[0]]
            }

            return {
                ...state, ready: newReady, inprogress: newInProgress
            }
        }

        case MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION: {

            if (action.payload === "Select issue..."){
                return state
            }

            const selectedIssue: Array<ITask> = state.inprogress.issues.filter((task: ITask) => task.id === action.payload)
            const prevTaskWithOutSelectedIssue: Array<IIssue> = state.inprogress.issues.filter((task: ITask) => task.id !== action.payload)

            const newInProgress: IIssueLog = {
                title: "In progress",
                issues: prevTaskWithOutSelectedIssue
            }

            const newFinished: IIssueLog = {
                title: "Finished",
                issues: [...state.finished.issues, selectedIssue[0]]
            }

            return {
                ...state, inprogress: newInProgress, finished: newFinished
            }
        }

        case SAVE_DESCRIPTION_TO_ISSUE_ACTION: {

            const {id, issueLogName, descriptionText} = action.payload

            const issueArrayWithNewDescription = state[issueLogName].issues.map((task: IIssue) => {
                if (task.id === id) {
                    task.description = descriptionText
                    return task
                }
                return task
            })

            const newIssueLog: IIssueLog = {
                title: state[action.payload.issueLogName].title,
                issues: issueArrayWithNewDescription
            }

            return {
                ...state, [issueLogName]: newIssueLog
            }

        }

        case SAVE_STATE_ACTION: {
            return action.payload
        }

        default:
            return state
    }
}

export const addIssueActionCreator: AddIssueActionCreatorType = (newIssue: string) => {
    return {
        type: ADD_ISSUE_ACTION,
        payload: newIssue
    }
}

export const moveIssueToReadyActionCreator: MoveIssueToReadyActionCreatorType = (id: string) => {
    return {
        type: MOVE_ISSUE_FROM_BACKLOG_TO_READY_ACTION,
        payload: id
    }
}

export const moveIssueToInProcessActionCreator: MoveIssueToInProcessActionCreatorType = (id: string) => {
    return {
        type: MOVE_ISSUE_FROM_READY_TO_IN_PROGRESS_ACTION,
        payload: id
    }
}

export const moveIssueToFinishActionCreator: MoveIssueToFinishActionCreatorType = (id: string) => {
    return {
        type: MOVE_ISSUE_FROM_IN_PROGRESS_TO_FINISH_ACTION,
        payload: id
    }
}

export const saveDescriptionToIssueActionCreator: SaveDescriptionToIssueActionCreatorType = (id: string, issueLogName: string, descriptionText: string) => {
    return {
        type: SAVE_DESCRIPTION_TO_ISSUE_ACTION,
        payload: {
            id,
            issueLogName,
            descriptionText
        }
    }
}

export const saveStateActionCreator: SaveStateActionCreatorType = (state: IState) => {
    return {
        type: SAVE_STATE_ACTION,
        payload: state
    }
}