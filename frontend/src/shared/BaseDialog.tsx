import styled from "styled-components";
import React, {useEffect, useRef} from "react";
import {fadeInAnimationStyle} from "./animation/fade.animation";

interface BaseDialogProps {
    children: React.ReactNode;
    dismiss: () => void;
}

export default function BaseDialog(
    {
        children,
        dismiss
    }: BaseDialogProps
) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    return (
        <S.container ref={dialogRef}>
            {children}
            <S.backdrop onClick={() => {
                dialogRef.current?.close();
                dismiss();
            }}/>
        </S.container>
    );
}

const S = {
    container: styled.dialog`
        display: flex;
        width: 100vw;
        min-width: 100vw;
        height: 100vh;
        min-height: 100vh;
        justify-content: center;
        align-items: center;

        // style
        border: none;
        outline: none;
        background: none;
        ${fadeInAnimationStyle};
    `,
    backdrop: styled.div`
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: fixed;
        background: black;
        opacity: 0.5;
        z-index: 2;
    `,
}