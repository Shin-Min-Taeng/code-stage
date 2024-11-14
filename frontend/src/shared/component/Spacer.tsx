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
            width: `${w}px`,
            height: `${h}px`
        }}/>
    );
}