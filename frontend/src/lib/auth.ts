const TOKEN_KEY = 'auth_token';

export const setToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, token);
    }
};

export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(TOKEN_KEY);
    }
    return null;
};

export const removeToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
    }
};

// Decode JWT without external library
export const decodeToken = (): { sub: string; email: string; role: string; exp: number } | null => {
    const token = getToken();
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        return {
            sub: payload.sub,
            email: payload.email,
            role: payload.role,
            exp: payload.exp,
        };
    } catch {
        return null;
    }
};

export const isTokenExpired = (): boolean => {
    const decoded = decodeToken();
    if (!decoded) return true;
    return decoded.exp * 1000 < Date.now();
};

export const getUserRole = (): string | null => {
    const decoded = decodeToken();
    return decoded?.role || null;
};

export const isAuthenticated = (): boolean => {
    return !!getToken() && !isTokenExpired();
};