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
        http.post(`${apiEndpoint}/proceed`, {success: true})
    )
}

const checkout = {
    get,
    proceed
}

export default checkout