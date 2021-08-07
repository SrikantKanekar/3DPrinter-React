import http from "./httpService";
import {trackPromise} from "react-promise-tracker";

const apiEndpoint = "/cart";

async function get() {
    return await trackPromise(http.get(apiEndpoint))
}

async function add(id) {
    return await trackPromise(http.post(`${apiEndpoint}/${id}`))
}

async function remove(id) {
    return await trackPromise(http.delete(`${apiEndpoint}/${id}`))
}

const cart = {
    get,
    add,
    remove
}

export default cart