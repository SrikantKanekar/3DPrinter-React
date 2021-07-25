import jwtDecode from "jwt-decode";
import http from "./httpService";
import {apiUrl} from "../config.json"

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(credentials) {
    const {data} = await http.post(`${apiEndpoint}/login`, credentials);
    localStorage.setItem(tokenKey, data);
}

export async function register(user) {
    const {data} = await http.post(`${apiEndpoint}/register`, user);
    localStorage.setItem(tokenKey, data);
}

export async function resetPassword(data) {
    return await http.put(`${apiEndpoint}/reset-password`, data);
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

const auth = {
    login,
    register,
    resetPassword,
    logout,
    getCurrentUser,
    getJwt
}

export default auth