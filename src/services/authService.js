import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/auth";
const tokenKey = "token";

async function login(credentials) {
    const {data} = await http.post(`${apiEndpoint}/login`, credentials);
    localStorage.setItem(tokenKey, data);
}

async function register(user) {
    const {data} = await http.post(`${apiEndpoint}/register`, user);
    localStorage.setItem(tokenKey, data);
}

async function resetPassword(data) {
    return await http.put(`${apiEndpoint}/reset-password`, data);
}

function logout() {
    localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

const auth = {
    login,
    register,
    resetPassword,
    logout,
    getCurrentUser,
}

export default auth