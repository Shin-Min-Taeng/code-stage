import styled, {CSSProperties, css, RuleSet} from "styled-components";

export interface FlexLayoutProps {
    flexDirection?: CSSProperties["flexDirection"];
    justifyContent?: CSSProperties["justifyContent"];
    alignItems?: CSSProperties["alignItems"];
    columnGap?: CSSProperties["columnGap"];
    rowGap?: CSSProperties["rowGap"];
    gap?: CSSProperties["gap"];
}

export const FlexLayout = ({...props}: FlexLayoutProps) => {
    return css`
        display: flex;

        flex-direction: ${props.flexDirection};
        justify-content: ${props.justifyContent};
        align-items: ${props.alignItems};

        column-gap: ${props.columnGap};
        row-gap: ${props.rowGap};
        gap: ${props.gap};
    `;
};

export type Align = "center" | "flex-start" | "flex-end";

export interface BaseFlexProps {
    gap?: number;
    columnGap?: number;
    rowGap?: number;
    justifyContent?: Align | "space-between";
    fill?: string;
    alignItems?: Align;
    padding?: CSSProperties["padding"];
    wrap?: boolean;
    backgroundColor?: CSSProperties["backgroundColor"];

    customStyle?: RuleSet;
}

const BaseFlex = styled.div<BaseFlexProps>`
    display: flex;

    gap: ${({gap}) => gap || 0}px;
    row-gap: ${({rowGap}) => rowGap || 0}px;
    column-gap: ${({columnGap}) => columnGap || 0}px;

    justify-content: ${({justifyContent}) => justifyContent || "flex-start"};
    align-items: ${({alignItems}) => alignItems || "flex-start"};
    flex-wrap: ${({wrap}) => (wrap ? "wrap" : "nowrap")};

    width: ${({fill}) => fill || "auto"};

    background-color: ${({backgroundColor}) =>
            backgroundColor || "transparent"};

    padding: ${({padding}) => padding};

    ${({customStyle}) => customStyle}
`;

export const Column = styled(BaseFlex)`
    flex-direction: column;
`;

export const Row = styled(BaseFlex)`
    flex-direction: row;
`;