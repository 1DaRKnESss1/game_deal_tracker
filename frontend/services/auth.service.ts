import api from "@/lib/axios";
import { RegisterDto, LoginDto } from "@/types/auth.types";

export const AuthService = {
    register: async (data: RegisterDto) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    login: async (data: LoginDto) => {
        const response = await api.post('auth/login', data);
        return response.data;
    }
};