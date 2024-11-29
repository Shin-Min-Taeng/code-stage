export default class DateUtil {
    private constructor() {
    }

    static getTimeAgo(date: Date): string {
        const now = new Date();
        const validDate = new Date(date);
        
        const years = now.getFullYear() - validDate.getFullYear();
        const months = (now.getFullYear() - validDate.getFullYear()) * 12 + (now.getMonth() - validDate.getMonth());
        const days = Math.floor((now.getTime() - validDate.getTime()) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((now.getTime() - validDate.getTime()) / (1000 * 60 * 60));
        const minutes = Math.floor((now.getTime() - validDate.getTime()) / (1000 * 60));
        
        if (years > 0) {
            return `${years}년 전`;
        }

        if (months > 0) {
            return `${months}개월 전`;
        }

        if (days > 0) {
            return `${days}일 전`;
        }

        if (hours > 0) {
            return `${hours}시간 전`;
        }

        if (minutes > 0) {
            return `${minutes}분 전`;
        }

        return "방금 전";
    }
}