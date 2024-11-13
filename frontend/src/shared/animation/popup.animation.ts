import {css, keyframes} from "styled-components";

export const popupAnimation = keyframes`
    from {
        transform: translate(0, -10px);;
    }
    to {
        transform: translate(0, 0px);;
    }
`;

export const popupAnimationStyle = css`
    animation: ${popupAnimation} 0.2s;
`;