import BaseDialog from "../../../shared/component/BaseDialog";
import styled from "styled-components";
import dialogContentStyle from "../../../shared/component/DialogContentStyle";
import Text, {TextSize} from "../../../shared/component/Text";
import Button from "../../../shared/component/Button";
import Spacer from "../../../shared/component/Spacer";
import {useRef} from "react";
import GithubrepositoryRepo from "../../../data/githubrepository.repo";

interface RegisterRepositoryDialogProps {
    dismiss: () => void;
}

export default function RegisterRepositoryDialog(
    {
        dismiss
    }: RegisterRepositoryDialogProps
) {
    const repositoryInputRef = useRef<HTMLInputElement>(null);
    const descriptionTextAreaRef = useRef<HTMLTextAreaElement>(null);

    async function registerGithubRepository() {
        const repositoryInput = repositoryInputRef.current;
        const descriptionTextArea = descriptionTextAreaRef.current;
        if (!repositoryInput?.value) {
            return;
        }
        
        if (!repositoryInput.value.startsWith("https://github.com/")) {
            alert('레포지토리 url 형식이 잘못 되었습니다');
            return;
        }

        await GithubrepositoryRepo.register({
            url: repositoryInput.value,
            description: descriptionTextArea?.value ?? '',
            branch: 'main' // TODO: Fix
        });
        
        alert('레포지토리가 등록되었어요.\n최대 5분 정도 기다려야 프로젝트를 불러올 수 있어요')

        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    return (
        <BaseDialog dismiss={dismiss}>
            <S.container>
                <Text size={TextSize.Large} text={'레포지토리 등록'}/>
                <Spacer h={8}/>
                <S.input ref={repositoryInputRef} placeholder={'https://github.com/torvalds/linux'}/>
                <Spacer h={8}/>
                <S.textarea ref={descriptionTextAreaRef} placeholder={'설명을 적어주세요'}/>
                <Spacer h={32}/>
                <Button onClick={registerGithubRepository} text={'완료'}/>
            </S.container>
        </BaseDialog>
    );
}

const S = {
    container: styled.div`
        display: flex;
        flex-direction: column;
        ${dialogContentStyle({})};
        min-width: 480px;
    `,
    header: styled.div`
        display: flex;
        justify-content: space-between;
    `,
    input: styled.input`
        outline: none;
        border: none;
        padding: 16px;
        background: var(--container-low);
        border-radius: 8px;
        font-size: 16px;
        font-weight: lighter;
    `,
    textarea: styled.textarea`
        outline: none;
        min-height: 200px;
        border: none;
        padding: 16px;
        background: var(--container-low);
        border-radius: 8px;
        font-size: 16px;
        font-weight: lighter;
        resize: vertical;
    `
};