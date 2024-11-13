import styled from "styled-components";
import {hideScrollBar} from "../../css.util";

const style = {
    root: styled.div`
        display: flex;
        height: 100vh;
        width: 100vw;
        word-break: keep-all;
    `,
    editorWrapper: styled.div`
        display: flex;
        flex: 1;
    `,
    sidebarContainer: styled.div`
        display: flex;
        flex-direction: column;
        background: var(--surface);
        color: white;
        width: 480px;
    `,
    commentContainer: styled.li`
        display: flex;
        flex-direction: column-reverse;
        list-style: none;
        padding: 0 12px;
        gap: 4px;
        overflow: auto;
    `,
    comment: styled.ul`
        display: flex;
        font-size: 16px;
        color: var(--on-surface);
        background: var(--container);
        padding: 12px;
        border-radius: 12px;
    `,
    input: styled.textarea`
        display: flex;
        background: transparent;
        resize: none;
        margin: 16px;
        outline: none;
        flex: 1;
        font-size: 20px;
        ${hideScrollBar};
    `,
    sendButton: styled.button`
        display: flex;
        width: 68px;
        height: 100%;
        outline: none;
        justify-content: center;
        align-items: center;
        color: var(--primary);
        font-weight: bold;
        align-self: flex-end;
    `,
}

export default style;