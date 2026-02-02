import {defineStore} from 'pinia';
import {authorize, login, register} from '@/services/auth.service';
import {getUserDetail} from '@/services/user.service';
import type {AuthLoginType, AuthRegisterType} from '@/types/api/auth.api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loading: false,

        code: "",

        userId: "",
        accessToken: "",
    }),

    getters: {
        isVerified: (s) => !!s.code,
        isAuthenticated: (s) => !!s.accessToken,
    },

    actions: {
        setCode(code: string) {
            this.code = code;
            localStorage.setItem("code", code)
        },
        setAccessToken(token: string) {
            this.accessToken = token;
            localStorage.setItem("accessToken", token)
        },
        setUserId(userId: string) {
            this.userId = userId;
            localStorage.setItem("userId", userId)
        },

        async init() {
            this.loading = true;

            this.code = localStorage.getItem('code') || "";
            this.userId = localStorage.getItem('userId') || "";
            this.accessToken = localStorage.getItem('accessToken') || "";

            if (this.isAuthenticated) {
                try {
                    await getUserDetail(this.userId);
                } catch {
                    this.handleLogout()
                }
            }
        },

        async handleAuthorize() {
            const clientId: string = import.meta.env.VITE_CLIENT_ID;
            const redirectUri: string = import.meta.env.VITE_CLIENT_REDIRECT_URI;
            return await authorize(clientId, redirectUri);
        },
        async handleLogin(userInfo: AuthLoginType) {
            const clientId: string = import.meta.env.VITE_CLIENT_ID;
            const clientSecret: string = import.meta.env.VITE_CLIENT_SECRET;
            const code: string = localStorage.getItem('code') || "";

            const response = await login(clientId, clientSecret, code, userInfo);
            const data = response.data;

            this.setAccessToken(data.access_token)
            this.setUserId(data.user_id)

            return response;
        },
        async handleRegister(userInfo: AuthRegisterType) {
            return await register(userInfo);
        },
        handleLogout() {
            this.setAccessToken("")
            this.userId = "";
        },
    },
});
