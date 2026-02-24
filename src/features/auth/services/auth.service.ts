import { axiosInstance } from "../../../app/api/axiosInstance";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  username: string;
}

export const loginRequest = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/v1/recursos/login",
    data
  );

  return response.data;
};
