import { create } from 'zustand';

interface UserState {
    name: string;
    isLoggedIn: boolean;
    login: (userName: string) => void;
    logout: () => void;
}

export const useStore = create<UserState>((set) => ({
    name: '',
    isLoggedIn: false,
    login: (userName: string) =>
        set((state) => ({
            ...state, // 기존 상태 유지
            name: userName,
            isLoggedIn: true,
        })),
    logout: () =>
        set((state) => ({
            ...state, // 기존 상태 유지
            name: '',
            isLoggedIn: false,
        })),
}));
