import {apiUrl} from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + "/cart";

async function getCart() {
    return await http.get(apiEndpoint);
}

async function addToCart(id) {
    return await http.post(`${apiEndpoint}/${id}`);
}

async function removeFromCart(id) {
    return await http.delete(`${apiEndpoint}/${id}`);
}

const cart = {
    getCart,
    addToCart,
    removeFromCart
}

export default cart