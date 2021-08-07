import http from "./httpService";
import {trackPromise} from "react-promise-tracker";

const apiEndpoint = "/account";

async function get() {
    return await trackPromise(http.get(apiEndpoint))
}

async function update(account) {
    return await trackPromise(http.post(apiEndpoint, account))
}

async function updateAddress(address) {
    return await trackPromise(http.post(`${apiEndpoint}/address`, address))
}

const account = {
    get,
    update,
    updateAddress
}

export default account