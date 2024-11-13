import styled, {RuleSet} from "styled-components";
import React from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    text: string;
    customStyle?: RuleSet;
}

export default function Button(
    {
        text,
        customStyle,
        ...props
    }: ButtonProps
) {
    return (
        <S.container customStyle={customStyle} {...props}>
            {text}
        </S.container>
    );
}

const S = {
    container: styled.button<{
        customStyle?: RuleSet
    }>`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 16px;
        background: var(--primary);
        color: var(--on-primary);
        border-radius: 12px;
        cursor: pointer;
        white-space: nowrap;

        &:hover {
            background: color-mix(in srgb, var(--primary) 90%, black 10%);
        }

        &:active {
            scale: 1.03;
        }

        transition: 0.1s scale ease-in-out;
    `
};