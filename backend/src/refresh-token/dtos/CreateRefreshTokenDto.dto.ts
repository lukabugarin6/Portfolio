import { RefreshToken } from "../refresh-token.entity";

export interface CreateRefreshTokenDto {
    userId: number;
    token: string;
};