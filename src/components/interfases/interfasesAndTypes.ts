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
    "backlog": IIssueLog
    "ready": IIssueLog
    "inProgress": IIssueLog
    "finished": IIssueLog
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
    activeTasks: number
    finishedTasks: number
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
//*****************************

//function interface
export type keyDownHandlerType = (event:React.KeyboardEvent<HTMLInputElement>, newIssue:string) => void