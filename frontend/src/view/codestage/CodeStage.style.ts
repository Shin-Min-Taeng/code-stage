import styled from "styled-components";

const style = {
    root: styled.div`
        display: flex;
        height: 100vh;
        width: 100vw;
        word-break: keep-all;
    `,
    sidebarContainer: styled.div`
        display: flex;
        flex-direction: column;
        background: var(--surface);
        width: 480px;
    `,
    commentContainer: styled.li`
        display: flex;
        flex-direction: column-reverse;
        list-style: none;
        padding: 0 12px;
        overflow: auto;
        gap: 16px;
        flex: 1;
    `,
    inputContainer: styled.div`
        display: flex;
        padding: 8px;
        gap: 8px;
        align-items: center;
    `,
    textareaContainer: styled.div`
        display: flex;
        padding: 16px;
        min-height: 64px;
        flex: 1;
        background: var(--container-low);
        border-radius: 32px;
    `,
    textarea: styled.textarea`
        display: flex;
        width: 100%;
        outline: none;
        border: none;
        font-size: 16px;
        font-weight: lighter;
        resize: vertical;
        background: transparent;
    `,
    sendButton: styled.button`
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        border: none;
        width: 48px;
        height: 48px;
        border-radius: 8px;
        background: transparent;
        cursor: pointer;
        
        &:hover {
            background: rgba(0, 0, 0, 0.05);
        }

        &:active {
            background: rgba(0, 0, 0, 0.1);
            scale: 0.94;
        }

        transition: 0.1s background, 0.1s scale;
    `,
}

export default style;