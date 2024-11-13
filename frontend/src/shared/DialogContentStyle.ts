import {css} from "styled-components";
import {popupAnimationStyle} from "./animation/popup.animation";

const DialogContentStyle = css`
    background: var(--surface);
    margin: 32px;
    z-index: 3;
    max-width: 440px;
    width: 100%;
    padding: 24px;

    // style
    border-radius: 16px;
    ${popupAnimationStyle};
`

export default DialogContentStyle;