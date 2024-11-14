import styled from "styled-components";

const S = {
    container: styled.div`
        display: flex;
        flex-direction: column;
        background: var(--primary);
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;
        gap: 8px;
        position: relative;
    `,
    logoContainer: styled.div`
        display: flex;
        padding: 16px;
        border-radius: 8px;
        background: var(--on-primary);
        gap: 16px;
        align-items: center;
        position: absolute;
        top: 32px;
        left: 32px;
    `,
    logoTitleContainer: styled.span`
        font-size: 18px;
        font-weight: 500;
    `,
    notFoundTitle: styled.div`
        font-size: 44px;
        font-weight: 700;
        color: var(--on-primary);
    `,
    description: styled.span`
        font-size: 20px;
        color: var(--on-primary);
    `
}

export default S;