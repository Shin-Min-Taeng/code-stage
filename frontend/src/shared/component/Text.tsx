import styled, {css, CSSProperties, RuleSet} from "styled-components";
import {HTMLAttributes} from "react";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

export enum TextSize {
    Small,
    Medium,
    Large,
    Headline,
    Display
}

export enum TextFont {
    Elice,
    Pretendard
}

const textSizeValues: { [key in TextSize]: number } = {
    [TextSize.Display]: 32,
    [TextSize.Headline]: 24,
    [TextSize.Large]: 18,
    [TextSize.Medium]: 14,
    [TextSize.Small]: 12
}

const textFontValues: { [keyboard in TextFont]: CSSProperties['fontFamily'] | undefined } = {
    [TextFont.Elice]: undefined,
    [TextFont.Pretendard]: 'Pretendard !important;',
};

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
    size: TextSize;
    text: string;
    fontWeight?: CSSProperties['fontWeight'];
    font?: TextFont;
    customStyle?: RuleSet;
}

export default function Text(
    {
        size,
        // color,
        text,
        fontWeight,
        font,
        customStyle,
        ...props
    }: TextProps
) {
    return <Container
        fontSize={textSizeValues[size]}
        fontWeight={fontWeight}
        fontFamily={font ? textFontValues[font] : undefined}
        $customStyle={customStyle}
        {...props}
    >
        {text}
    </Container>
}

const Container = styled.span<{
    fontFamily: CSSProperties['fontFamily'];
    fontSize: CSSProperties['fontSize'];
    fontWeight: CSSProperties['fontWeight'];
    $customStyle?: RuleSet;
}>`
    display: flex;
    ${props => css`
        font-family: ${props.fontFamily};
        font-size: ${props.fontSize}px;
        font-weight: ${props.fontWeight};
        ${props.$customStyle};
    `};
`;