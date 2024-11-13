import styled from "styled-components";

const S = {
    container: styled.div`
        display: flex;
        width: 100vw;
        height: 100vh;
        flex-direction: column;
        align-items: stretch;
    `,
    navContainer: styled.div`
        display: flex;
        margin: 12px 0;
        justify-content: center;
        align-items: center;
    `,
    navLeftContainer: styled.div`
        display: flex;
        flex: 1;
    `,
    logoContainer: styled.div`
        display: flex;
        cursor: pointer;
        padding: 0 12px;
        align-items: center;
        gap: 12px;
        word-break: keep-all;
    `,
    logoTitleContainer: styled.span`
        font-size: 18px;
        font-weight: 500;
        @media (max-width: 768px) {
            display: none;
        }
    `,
    searchInput: styled.input`
        width: 960px;
        padding: 16px 20px;
        outline: none;
        border: none;
        border-radius: 100px;
        background: var(--container-low);
        color: var(--on-surface);
        font-size: 18px;
        &:hover {
            background: var(--container-high);
        }
        &:focus {
            outline: var(--secondary-opa-35) solid 4px;
        }
    `,
    navRightContainer: styled.div`
        display: flex;
        flex: 1;
        justify-content: flex-end;
    `,
    content: styled.div`
        padding: 0 8px;
        
        column-gap: 0;
        column-count: 5;
        @media (min-width: 1200px) {
            column-count: 5;
        }

        @media (max-width: 1199px) and (min-width: 992px) {
            column-count: 4;
        }

        @media (max-width: 991px) and (min-width: 768px) {
            column-count: 3;
        }

        @media (max-width: 767px) {
            column-count: 2;
        }
    `
};

export default S;