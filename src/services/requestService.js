import http from "./httpService";
import {trackPromise} from "react-promise-tracker";

async function getAllObjectRequests() {
    return await trackPromise(
        http.get(`/admin/objects`)
    );
}

async function getObjectRequest(email, id) {
    return await trackPromise(
        http.get(`/admin/objects/${email}/${id}`)
    );
}

async function fulfillObject(email, id, body) {
    return await trackPromise(
        http.put(`/admin/objects/${email}/${id}`, body)
    );
}

async function sendSpecialRequest(id, body) {
    return await trackPromise(
        http.post(`/objects/requests/special/${id}`, body)
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
    getAllObjectRequests,
    getObjectRequest,
    fulfillObject,
    sendSpecialRequest,
    getAllSpecial,
    getSpecial,
    fulfillSpecial
}

export default requestService