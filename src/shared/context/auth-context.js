import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggenIn: false,
    userId: null,
    login: () => {},
    logout: () => {},
});