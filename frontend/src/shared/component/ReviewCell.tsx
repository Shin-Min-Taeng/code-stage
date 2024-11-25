import styled, {css} from "styled-components";
import DateUtil from "../util/DateUtil";
import Text, {TextFont, TextSize} from "./Text";
import ReviewResponseDto from "shared/dist/review/dto/review.response.dto";

interface ReviewCellProps {
    review: ReviewResponseDto
}

export default function ReviewCell(
    {
        review
    }: ReviewCellProps
) {
    return (
        <S.container>
            <Text font={TextFont.Pretendard} size={TextSize.Large} text={review.content}/>
            <Text font={TextFont.Pretendard} size={TextSize.Small} text={DateUtil.getTimeAgo(review.createdAt)} customStyle={css`color: var(--on-surface-var)`}/>
        </S.container>
    );
}

const S = {
    container: styled.div`
        display: flex;
        flex-direction: column;
    `
};