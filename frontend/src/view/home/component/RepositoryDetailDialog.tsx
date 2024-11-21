import BaseDialog from "../../../shared/component/BaseDialog";
import styled from "styled-components";
import dialogContentStyle from "../../../shared/component/DialogContentStyle";
import Button from "../../../shared/component/Button";
import {Row} from "../../../shared/component/FlexLayout";
import GithubrepositoryResponseDto from "shared/dist/github/dto/githubrepository.response.dto";

interface RepositoryDetailDialogProps {
    repository: GithubrepositoryResponseDto;
    dismiss: () => void;
}

export default function RepositoryDetailDialog(
    {
        repository,
        dismiss,
    }: RepositoryDetailDialogProps
) {
    return (
        <BaseDialog dismiss={dismiss}>
            <S.container>
                <S.thumbnail src={repository.thumbnailImg}/>
                <Row alignItems={'center'} justifyContent={'space-between'}>
                    {repository.name}
                    <Button text={'코드 스테이지로 이동 >'}/>
                </Row>
            </S.container>
        </BaseDialog>
    );
}

const S = {
    container: styled.div`
        display: flex;
        flex-direction: column;
        ${dialogContentStyle};
        min-width: 720px;
    `,
    thumbnail: styled.img`
        height: 240px;
        object-fit: cover;
        border-radius: 12px;
        border: 2px solid var(--container-low);
    `,
    infoContainer: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `
}