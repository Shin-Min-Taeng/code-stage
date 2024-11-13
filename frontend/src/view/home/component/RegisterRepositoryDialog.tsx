import BaseDialog from "../../../shared/BaseDialog";
import styled from "styled-components";
import dialogContentStyle from "../../../shared/DialogContentStyle";
import Text, {TextSize} from "../../../shared/Text";
import Button from "../../../shared/Button";
import Spacer from "../../../shared/Spacer";

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
    `
};