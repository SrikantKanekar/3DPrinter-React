import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "/account";

async function get() {
    return await http.get(apiEndpoint)
}

async function update(account) {
    return await http.post(apiEndpoint, account)
}

async function updateAddress(address) {
    return await http.post(apiEndpoint, address)
}

const account = {
    get,
    update,
    updateAddress
}

export default account