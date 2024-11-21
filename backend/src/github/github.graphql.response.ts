interface GitHubRepositoryGraphqlResponse {
    repository: {
        url: string;
        owner: {
            avatarUrl: string;
        };
    };
}