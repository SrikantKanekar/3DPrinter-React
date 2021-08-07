import http from "./httpService";
import {trackPromise} from "react-promise-tracker";

const apiEndpoint = "/notifications";

async function getAll() {
    return await trackPromise(http.get(apiEndpoint))
}

async function get(id) {
    return await trackPromise(http.get(`${apiEndpoint}/${id}`))
}

const notification = {
    getAll,
    get
}

export default notification