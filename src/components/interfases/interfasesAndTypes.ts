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
    [key:string]: IIssueLog
    backlog: IIssueLog
    ready: IIssueLog
    inprogress: IIssueLog
    finished: IIssueLog
}
//*************************

//props interfaces
export interface IHeaderProps {
    isOpen: boolean
    callback: () => void
    children?: ReactNode
}

export interface IAvatarProps {
    isOpen: boolean
    callback: () => void
    children?: ReactNode
}

export interface IMainProps {
    tasks: IState
}

export interface IFooterProps {
    backLog: IIssueLog
    finished: IIssueLog
    name: string
    year: number
    children?: ReactNode
}

export interface ITask {
    id:  string
    name: string
    description: string
}

export interface ITasksBlockProps {
    tasks: Array<IIssue>
    title: string
    prevTasks?: Array<IIssue>
    children?: ReactNode
}

export interface DescriptionProps {
    state: IState
}

export interface IParams {
    [key:string]:string
    "*": string
}

export type ParamsObjType =  Readonly<Partial<IParams>>
//*****************************

//function interface
export type keyDownHandlerType = (event:React.KeyboardEvent<HTMLInputElement>, newIssue:string) => void