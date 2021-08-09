import http from "./httpService";
import {trackPromise} from "react-promise-tracker";

const apiEndpoint = "/checkout";

async function get() {
    return await trackPromise(
        http.get(apiEndpoint)
    )
}

async function proceed() {
    return await trackPromise(
        http.post(`${apiEndpoint}/proceed`)
    )
}

async function verify(body) {
    return await trackPromise(
        http.post(`${apiEndpoint}/verify`, body)
    )
}

const checkout = {
    get,
    proceed,
    verify
}

export default checkout