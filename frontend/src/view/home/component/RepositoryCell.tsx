import styled, {css} from "styled-components";
import {HTMLAttributes, useState} from "react";
import {fadeInAnimationStyle} from "../../../shared/animation/fade.animation";
import Text, {TextSize} from "../../../shared/component/Text";
import GithubrepositoryResponseDto from "shared/dist/github/dto/githubrepository.response.dto";

interface RepositoryCellProps extends HTMLAttributes<HTMLDivElement> {
    repository: GithubrepositoryResponseDto;
}

export default function RepositoryCell(
    {
        repository,
        ...props
    }: RepositoryCellProps
) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <S.container {...props}>
            <S.thumbnailContainer
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
            >
                <S.thumbnail
                    src={repository.thumbnailImg}
                />
                <S.front isHovering={isHovering}>
                    <Text size={TextSize.Medium} text={repository.name}
                          customStyle={css`color: var(--on-surface)`}/>
                    <Text size={TextSize.Large} text={repository.description}
                          customStyle={css`color: var(--on-surface)`}/>
                </S.front>
            </S.thumbnailContainer>
            <Text size={TextSize.Small} text={repository.url}/>
        </S.container>
    );
};

const S = {
    container: styled.div`
        display: flex;
        flex-direction: column;
        position: relative;
        margin: 0 4px 16px 4px;
        gap: 8px;
        break-inside: avoid-column; // column 잘림 방지
        
        &:active {
            scale: 0.98;
        }
        transition: 0.1s ease-in-out;
    `,
    thumbnailContainer: styled.div`
        display: flex;

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
        border: 2px solid var(--container-low);
    `,
    front: styled.div<{
        isHovering: boolean;
    }>`
        display: flex;
        visibility: ${({isHovering}) => (isHovering ? 'visible' : 'hidden')};
        flex-direction: column;
        position: absolute;
        justify-content: flex-end;
        padding: 16px;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, transparent, transparent, rgba(255, 255, 255, 0.75));
        ${({isHovering}) => isHovering && fadeInAnimationStyle};
        border-radius: 16px;
    `
}