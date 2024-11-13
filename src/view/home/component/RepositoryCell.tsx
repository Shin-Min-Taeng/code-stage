import Repository from "../../../model/Repository";
import styled from "styled-components";

interface RepositoryCellProps {
    repository: Repository;
}

export default function RepositoryCell(
    {
        repository,
    }: RepositoryCellProps
) {
    return (
        <S.container>
            <S.thumbnail src={repository.thumbnailUrl}/>
        </S.container>
    );
};

const S = {
    container: styled.div`
        display: flex;
        margin: 0 4px 4px 4px;
        
        &:hover {
            scale: 1.01;
        }
        
        transition: 0.1s ease-in-out;
        cursor: pointer;
    `,
    thumbnail: styled.img`
        display: flex;
        width: 100%;
        border-radius: 16px;
        
    `
}