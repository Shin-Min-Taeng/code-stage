import {CSSProperties} from "styled-components";

interface DividerProps {
    color?: CSSProperties['color'];
    height?: CSSProperties['minHeight'];
}

export default function Divider(
    {
        color,
        height
    }: DividerProps
) {
    return (
        <div style={{
            backgroundColor: color ?? 'var(--container-low)',
            minHeight: height ?? 2,
            width: '100%'
        }}></div>
    )
}