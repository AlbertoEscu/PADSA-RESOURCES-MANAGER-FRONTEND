import { axiosInstance } from "../../../api/axiosInstance";
import type { LoginRequest, LoginResponse } from "../types/auth.types";

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      data
    );

    return response.data;
  },
};