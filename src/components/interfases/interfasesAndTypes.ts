import React, {ReactNode} from "react";

//state interfaces
export interface IIssue {
    id: string
    name: string
    description: string
}

export interface IIssueLog {
    title: string
    issues: Array<IIssue>
}

export interface IState {
    [key: string]: IIssueLog

    backlog: IIssueLog
    ready: IIssueLog
    inprogress: IIssueLog
    finished: IIssueLog
}

//*************************

export interface IAvatarProps {
    isOpen: boolean
    callback: () => void
    children?: ReactNode
}

export interface IFooterProps {
    backLog: number
    finished: number
    name: string
    year: number
    children?: ReactNode
}

export interface ITask {
    id: string
    name: string
    description: string
}

export interface ITasksBlockProps {
    tasks: Array<IIssue>
    title: string
    prevTasks?: IIssueLog
    children?: ReactNode
}

export interface DescriptionProps {
    state: IState
}

export interface IParams {
    [key: string]: string
    "*": string
}

export interface IAddNewIssueProps {
    editMode: boolean
    editModeOn: () => void
    submit: (newIssue: string) => void
    keyDownHandler: keyDownHandlerType
    selectValue: string
    toNextBoard: (id: string) => void
    prevTasks?: Array<IIssue>
    select?: ReactNode
}

export type ParamsObjType = Readonly<Partial<IParams>>
//*****************************

//function interface
export type keyDownHandlerType = (event: React.KeyboardEvent<HTMLInputElement>, newIssue: string) => void