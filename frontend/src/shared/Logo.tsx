import styled from "styled-components";

interface LogoProps {
    size?: 'small' | 'medium' | 'large';
}

const logoSizeDict: Record<NonNullable<LogoProps['size']>, number> = {
    small: 24,
    medium: 32,
    large: 48,
}

export default function Logo(
    {
        size = 'medium',
    }: LogoProps,
) {
    return (
        <S.logo width={logoSizeDict[size]} height={logoSizeDict[size]} src={`${process.env.PUBLIC_URL}/logo.png`}/>
    );
}

const S = {
    logo: styled.img`
        
    `,
};