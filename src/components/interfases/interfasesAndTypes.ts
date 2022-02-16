import {ReactNode} from "react";
import {IState} from "../../redux/stateMock";

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
    id: number
    name: string
    description: string
}

export interface ITasksBlockProps {
    tasks: Array<ITask>
    title: string
    children?: ReactNode
}