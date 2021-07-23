import jwtDecode from "jwt-decode";
import http from "../../services/httpService";
import {apiUrl} from "../../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
    const {data} = await http.post(`${apiEndpoint}/login`, {email, password});
    localStorage.setItem(tokenKey, data);
}

export async function register(user) {
    const {data} = await http.post(`${apiEndpoint}/register`, {
        email: user.email,
        username: user.username,
        password1: user.password1,
        password2: user.password2
    });
    localStorage.setItem(tokenKey, data);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    register,
    logout,
    getCurrentUser,
    getJwt
};
