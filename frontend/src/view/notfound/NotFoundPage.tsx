import S from './NotFoundPage.style';
import Logo from "../../shared/component/Logo";
import Button from "../../shared/component/Button";
import {useNavigate} from "react-router-dom";
import Spacer from "../../shared/component/Spacer";

export default function NotFountPage() {
    const navigate = useNavigate();
    return (
        <S.container>
            <S.logoContainer>
                <Logo size={'large'}/>
                <S.logoTitleContainer>코드스테이지</S.logoTitleContainer>
            </S.logoContainer>
            <S.notFoundTitle>404</S.notFoundTitle>
            <S.description>페이지를 찾을 수 없습니다</S.description>
            <Spacer h={16}/>
            <Button size={'large'} isReversedColor={true} onClick={() => {
                navigate('');
            }} text={'홈으로'}/>
        </S.container>
    );
}