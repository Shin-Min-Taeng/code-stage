import styled, {CSSProperties, RuleSet} from "styled-components";

export enum TextSize {
    Small,
    Medium,
    Large,
    Headline,
    Display
}

const textSizeValues: { [key in TextSize]: number } = {
    [TextSize.Display]: 32,
    [TextSize.Headline]: 24,
    [TextSize.Large]: 18,
    [TextSize.Medium]: 14,
    [TextSize.Small]: 12
}

interface TextProps {
    size: TextSize;
    color?: CSSProperties['color'];
    text: string;
    fontWeight?: CSSProperties['fontWeight'];
    customStyle?: RuleSet;
}

const Container = styled.span<{
    customStyle?: RuleSet
}>`
    ${({customStyle}) => customStyle}
`

export default function Text(
    {
        size,
        color,
        text,
        fontWeight,
        customStyle
    }: TextProps
) {
    return <Container customStyle={customStyle} style={{
        fontSize: textSizeValues[size],
        color,
        display: 'flex',
        fontWeight: fontWeight,
    }}>
        {text}
    </Container>
}