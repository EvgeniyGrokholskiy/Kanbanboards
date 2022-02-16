interface IIssue {
    id: number
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

export const state:IState = {
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
