export default interface BaseResponse<T = any> {
  status: number;
  message: string;
  data?: T;
}