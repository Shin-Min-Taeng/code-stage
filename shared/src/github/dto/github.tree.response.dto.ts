export default interface GithubDirectory {
    type: 'directory' | 'file';
    name: string;
    contents?: GithubDirectory[];
}