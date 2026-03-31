import { axiosInstance } from "../../../api/axiosInstance";

interface LoginRequest {

  username: string;
  password: string;

}

interface LoginResponse {

  token: string;
  username: string;

}

export const authService = {

  async login(data: LoginRequest): Promise<LoginResponse> {

    const response =
      await axiosInstance.post<LoginResponse>(
        "/recursos/login",
        data
      );

    return response.data;

  },

};
