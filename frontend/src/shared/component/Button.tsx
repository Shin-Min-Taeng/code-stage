import styled, {css, RuleSet} from "styled-components";
import React from "react";

export type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    text: string;
    size?: ButtonSize;
    isReversedColor?: boolean;
    customStyle?: RuleSet;
}

const paddingByButtonSize: { [key in ButtonSize]: RuleSet } = {
    small: css`padding: 8px 12px`,
    medium: css`padding: 12px 16px`,
    large: css`padding: 16px 20px`
}

const fontSizeByButtonSize: { [key in ButtonSize]: number } = {
    small: 14,
    medium: 15,
    large: 16,
}

export default function Button(
    {
        text,
        size = 'medium',
        isReversedColor = false,
        customStyle,
        ...props
    }: ButtonProps
) {
    return (
        <S.container
            $isReversedColor={isReversedColor}
            size={size}
            customStyle={customStyle} {...props}>
            {text}
        </S.container>
    );
}

const S = {
    container: styled.button<{
        $isReversedColor: boolean,
        size: ButtonSize,
        customStyle?: RuleSet
    }>`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 16px;

        ${({$isReversedColor}) => $isReversedColor ? css`
            background: var(--on-primary);
            color: black;
        ` : css`
            background: var(--primary);
            color: var(--on-primary);
        `};
        border-radius: 12px;
        outline: none;
        border: none;
        cursor: pointer;
        white-space: nowrap;
        ${({size}) => css`
            font-size: ${fontSizeByButtonSize[size]}px;
            ${paddingByButtonSize[size]};
        `};

        &:hover {
            ${({$isReversedColor}) => css`
                background: color-mix(in srgb, ${$isReversedColor ? 'var(--on-primary)' : 'var(--primary)'} 90%, black 10%);
            `}
        }

        &:active {
            scale: 1.03;
        }

        transition: 0.1s scale ease-in-out;
        ${({customStyle}) => customStyle};
    `
};