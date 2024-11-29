import BaseDialog from "../../../shared/component/BaseDialog";
import styled, {css} from "styled-components";
import dialogContentStyle from "../../../shared/component/DialogContentStyle";
import Button from "../../../shared/component/Button";
import GithubrepositoryResponseDto from "shared/dist/github/dto/githubrepository.response.dto";
import {useNavigate} from "react-router-dom";
import {HomeToCodeStage} from "../../../navigation/navigation.type";
import {useEffect, useState} from "react";
import ReviewResponseDto from "shared/dist/review/dto/review.response.dto";
import reviewRepo from "../../../data/review.repo";
import ReviewCell from "../../../shared/component/ReviewCell";
import Text, {TextFont, TextSize} from "../../../shared/component/Text";
import Spacer from "../../../shared/component/Spacer";
import Divider from "../../../shared/component/Divider";
import {hideScrollBar} from "../../../css.util";
import {Column, Row} from "../../../shared/component/FlexLayout";

interface RepositoryDetailDialogProps {
    repository: GithubrepositoryResponseDto;
    dismiss: () => void;
}

export default function RepositoryDetailDialog(
    {
        repository,
        dismiss,
    }: RepositoryDetailDialogProps
) {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState<ReviewResponseDto[]>([]);

    useEffect(() => {
        (async () => {
            const reviews = await reviewRepo.get(repository.id);
            setReviews(reviews.data ?? []);
            console.log(reviews);
        })();
    }, []);

    return (
        <BaseDialog dismiss={dismiss}>
            <S.container>
                <Row columnGap={8}>
                    <S.thumbnail src={repository.thumbnailImg}/>
                    <Column>
                        <Spacer h={4}/>
                        <Text size={TextSize.Headline} fontWeight={700} text={repository.name}/>
                        <Spacer h={4}/>
                        <Text size={TextSize.Large} text={repository.description} customStyle={css`
                            color: var(--on-surface-var);
                        `}/>
                        <Spacer h={8}/>
                    </Column>
                </Row>
                <Spacer h={4}/>
                <Button text={'코드 스테이지'} onClick={() => {
                    const state: HomeToCodeStage = {
                        id: repository.id,
                    }
                    navigate('/code-stage', {state});
                }}/>
                <Spacer h={16}/>
                <Divider/>
                <Spacer h={24}/>
                <Text font={TextFont.Pretendard} size={TextSize.Large} fontWeight={'bolder'} text={'리뷰'}/>
                <Spacer h={4}/>
                <S.reviewContainer>
                    {reviews.map(review => (
                        <ReviewCell review={review}/>
                    ))}
                </S.reviewContainer>
            </S.container>
        </BaseDialog>
    );
}

const S = {
    container: styled.div`
        display: flex;
        flex-direction: column;
        ${dialogContentStyle({
            isFullHeight: true,
        })};
        min-width: 720px;
        overflow: hidden;
        align-items: flex-start;
    `,
    thumbnail: styled.img`
        height: 240px;
        object-fit: cover;
        border-radius: 12px;
        border: 2px solid var(--container-low);
    `,
    infoContainer: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    reviewContainer: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: auto;
        ${hideScrollBar};
        gap: 16px;
    `
}