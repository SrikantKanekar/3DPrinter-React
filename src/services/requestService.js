import http from "./httpService";
import {trackPromise} from "react-promise-tracker";

const apiEndpoint = "/objects";

async function sendDirectRequest(id, body) {
    return await trackPromise(
        http.post(`${apiEndpoint}/requests/direct/${id}`, body)
    );
}

async function getAllDirect() {
    return await trackPromise(
        http.get(`/admin/requests/direct`)
    );
}

async function getDirect(id) {
    return await trackPromise(
        http.get(`/admin/requests/direct/${id}`)
    );
}

async function fulfillDirect(id, body) {
    return await trackPromise(
        http.put(`/admin/requests/direct/${id}`, body)
    );
}

async function sendSpecialRequest(id, body) {
    return await trackPromise(
        http.post(`${apiEndpoint}/requests/special/${id}`, body)
    );
}

async function getAllSpecial() {
    return await trackPromise(
        http.get(`/admin/requests/special`)
    );
}

async function getSpecial(id) {
    return await trackPromise(
        http.get(`/admin/requests/special/${id}`)
    );
}

async function fulfillSpecial(id, body) {
    return await trackPromise(
        http.put(`/admin/requests/special/${id}`, body)
    );
}

const requestService = {
    sendDirectRequest,
    getAllDirect,
    getDirect,
    fulfillDirect,
    sendSpecialRequest,
    getAllSpecial,
    getSpecial,
    fulfillSpecial
}

export default requestService