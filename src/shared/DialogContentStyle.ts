import {css} from "styled-components";

const DialogContentStyle = css`
    background: var(--surface);
    margin: 32px;
    z-index: 3;
    max-width: 440px;
    width: 100%;
    padding: 24px;

    // style
    border-radius: 16px;
`

export default DialogContentStyle;

/**
 *
 *
 *     // @media screen and (max-width: ${Guideline.Mobile}px) {
 *     //     padding: 12px 16px;
 *     // }
 */