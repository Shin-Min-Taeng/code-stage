import {css} from "styled-components";
import {popupAnimationStyle} from "../animation/popup.animation";
import {hideScrollBar} from "../../css.util";

interface DialogContentStyleProps {
    isFullHeight?: boolean
}

const DialogContentStyle = (
    {
        isFullHeight = false
    }: DialogContentStyleProps
) => css`
    position: fixed;
    background: var(--surface);
    z-index: 3;
    max-width: 440px;
    width: 100%;
    ${isFullHeight ? css`
        height: calc(100vh - 64px);
    `: undefined};
    padding: 24px;

    // style
    border-radius: 16px;
    ${popupAnimationStyle};
    overflow: auto;
    ${hideScrollBar};
`;

export default DialogContentStyle;