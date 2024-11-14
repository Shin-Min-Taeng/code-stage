import {Review} from "../../../model/Review";
import styled, {css} from "styled-components";
import DateUtil from "../../../shared/util/DateUtil";
import Text, {TextSize} from "../../../shared/component/Text";

interface ReviewCellProps {
    review: Review
}

export default function ReviewCell(
    {
        review
    }: ReviewCellProps
) {
    return (
        <S.container>
            {review.content}
            <Text size={TextSize.Small} text={DateUtil.getTimeAgo(review.createdAt)} customStyle={css`color: var(--on-surface-var)`}/>
        </S.container>
    );
}

const S = {
    container: styled.div`
        display: flex;
        flex-direction: column;
        gap: 8px;
    `
};