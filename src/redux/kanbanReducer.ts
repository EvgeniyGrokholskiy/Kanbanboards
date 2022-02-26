import {IIssue, IIssueLog, IState, ITask} from "../components/interfases/interfasesAndTypes";


interface IADD_ISSUE_ACTION {
    type: typeof ADD_ISSUE_ACTION
    payload: string
}

interface IUNIVERSAL_ISSUE_MOVER {
    type: typeof UNIVERSAL_ISSUE_MOVER_ACTION
    payload: {
        id: string
        prevTitle: string
        title: string
    }
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
    | IUNIVERSAL_ISSUE_MOVER
    | ISAVE_DESCRIPTION_TO_ISSUE_ACTION
    | ISAVE_STATE_ACTION

type AddIssueActionCreatorType = (newIssue: string) => {
    type: typeof ADD_ISSUE_ACTION
    payload: string
}

type UniversalIssueMoverActionCreatorType = (id: string, prevTitle: string, title: string) => {
    type: typeof UNIVERSAL_ISSUE_MOVER_ACTION,
    payload: {
        id: string
        prevTitle: string
        title: string
    }
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
const UNIVERSAL_ISSUE_MOVER_ACTION = "KANBANBOARD/SRC/REDUX/KANBANREDUCER/UNIVERSAL_ISSUE_MOVER_ACTION"

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

        case UNIVERSAL_ISSUE_MOVER_ACTION: {

            if (action.payload.id === "Select issue...") {
                return state
            }

            let titleInObj: string = ""
            let prevTitleInObg: string = action.payload.prevTitle

            if (action.payload.prevTitle === "Backlog") {
                titleInObj = "Ready"
            } else if (action.payload.prevTitle === "Ready") {
                titleInObj = "In progress"
            } else if (action.payload.prevTitle === "inprogress") {
                prevTitleInObg = "In progress"
                titleInObj = "Finished"
            } else if (action.payload.prevTitle === "In progress") {
                prevTitleInObg = "In progress"
                titleInObj = "Finished"
            }

            const title = action.payload.title.toLowerCase()
            const prevTitle = action.payload.prevTitle.toLowerCase()

            const selectedIssue: Array<ITask> = state[prevTitle].issues.filter((task: ITask) => task.id === action.payload.id)
            const prevTaskWithOutSelectedIssue: Array<IIssue> = state[prevTitle].issues.filter((task: ITask) => task.id !== action.payload.id)

            const newBacklog: IIssueLog = {
                title: `${prevTitleInObg}`,
                issues: prevTaskWithOutSelectedIssue
            }

            const newReady: IIssueLog = {
                title: `${titleInObj}`,
                issues: [...state[title].issues, selectedIssue[0]]
            }

            return {
                ...state, [prevTitle]: newBacklog, [title]: newReady
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

export const universalIssueMoverActionCreator: UniversalIssueMoverActionCreatorType = (id: string, prevTitle: string, title: string) => {
    return {
        type: UNIVERSAL_ISSUE_MOVER_ACTION,
        payload: {
            id,
            prevTitle,
            title
        }
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