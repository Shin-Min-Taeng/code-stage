import BaseDialog from "../../../shared/component/BaseDialog";
import styled from "styled-components";
import dialogContentStyle from "../../../shared/component/DialogContentStyle";
import Text, {TextSize} from "../../../shared/component/Text";
import Button from "../../../shared/component/Button";
import Spacer from "../../../shared/component/Spacer";

interface RegisterRepositoryDialogProps {
    dismiss: () => void;
}

export default function RegisterRepositoryDialog(
    {
        dismiss
    }: RegisterRepositoryDialogProps
) {
    return (
        <BaseDialog dismiss={dismiss}>
            <S.container>
                <Text size={TextSize.Large} text={'레포지토리 등록'}/>
                <Spacer h={8}/>
                <S.input placeholder={'https://github.com/torvalds/linux'}/>
                <Spacer h={8}/>
                <S.textarea placeholder={'설명을 적어주세요'} />
                <Spacer h={32}/>
                <Button text={'완료'}/>
            </S.container>
        </BaseDialog>
    );
}

const S = {
    container: styled.div`
        display: flex;
        flex-direction: column;
        ${dialogContentStyle};
        width: 960px;
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