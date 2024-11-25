interface SpacerProps {
    w?: number;
    h?: number;
}

export default function Spacer(
    {
        w,
        h,
    }: SpacerProps
) {
    return (
        <div style={{
            minWidth: `${w}px`,
            minHeight: `${h}px`
        }}/>
    );
}