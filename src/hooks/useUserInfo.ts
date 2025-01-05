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
        set(() => ({
            name: userName,
            isLoggedIn: true,
        })),
    logout: () =>
        set(() => ({
            name: '',
            isLoggedIn: false,
        })),
}));
