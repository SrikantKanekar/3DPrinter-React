import http from "./httpService";
import {trackPromise} from "react-promise-tracker";

const apiEndpoint = "/objects";

async function sendDirectRequest(id, body) {
    return await trackPromise(
        http.post(`${apiEndpoint}/request/direct/${id}`, body)
    );
}

async function sendSpecialRequest(id, body) {
    return await trackPromise(
        http.post(`${apiEndpoint}/request/special/${id}`, body)
    );
}

const requestService = {
    sendDirectRequest,
    sendSpecialRequest
}

export default requestService