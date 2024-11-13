export interface Review {
    id: number;
    content: string;
    filePath: string;
    lineNumber: number;
    fkGithubRepositoryId: number;
    createdAt: Date;
}

export const dummyComments: Array<Review> = [
    {
        id: 0,
        content: '이 코드는 정말이지 놀랍다. 세계 수준의 우수성',
        filePath: '',
        lineNumber: 10,
        fkGithubRepositoryId: 10,
        createdAt: new Date(),
    },
    {
        id: 1,
        content: '이 코드는 정말이지 놀랍다. 세계 수준의 우수성',
        filePath: '',
        lineNumber: 10,
        fkGithubRepositoryId: 10,
        createdAt: new Date(),
    },
    {
        id: 2,
        content: '이 코드는 정말이지 놀랍다. 세계 수준의 우수성',
        filePath: '',
        lineNumber: 10,
        fkGithubRepositoryId: 10,
        createdAt: new Date(),
    },
    {
        id: 3,
        content: '이 코드는 정말이지 놀랍다. 세계 수준의 우수성',
        filePath: '',
        lineNumber: 10,
        fkGithubRepositoryId: 10,
        createdAt: new Date(),
    },
    {
        id: 4,
        content: '이 코드는 정말이지 놀랍다. 세계 수준의 우수성',
        filePath: '',
        lineNumber: 10,
        fkGithubRepositoryId: 10,
        createdAt: new Date(),
    },
    {
        id: 5,
        content: '이 코드는 정말이지 놀랍다. 세계 수준의 우수성',
        filePath: '',
        lineNumber: 10,
        fkGithubRepositoryId: 10,
        createdAt: new Date(),
    },
    {
        id: 6,
        content: '이 코드는 정말이지 놀랍다. 세계 수준의 우수성',
        filePath: '',
        lineNumber: 10,
        fkGithubRepositoryId: 10,
        createdAt: new Date(),
    },
]