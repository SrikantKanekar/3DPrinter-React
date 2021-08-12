import http from "./httpService";
import {trackPromise} from "react-promise-tracker";

const apiEndpoint = "/objects";

async function getAll() {
    return await trackPromise(
        http.get(apiEndpoint)
    );
}

async function get(id) {
    return await trackPromise(
        http.get(`${apiEndpoint}/${id}`)
    );
}

async function create(object) {
    return await trackPromise(
        http.post(apiEndpoint, object)
    );
}

async function downloadFile(url) {
    return await http.get(url, {responseType: 'arraybuffer'})
}


async function slice(id, body) {
    return await trackPromise(
        http.put(`${apiEndpoint}/slice/${id}`, body)
    );
}

async function updateSetting(id, setting) {
    return await trackPromise(
        http.put(`${apiEndpoint}/setting/${id}`, setting)
    );
}

async function updateQuantity(id, quantity) {
    return await trackPromise(
        http.put(`${apiEndpoint}/quantity/${id}`, quantity)
    );
}

async function deleteObject(id) {
    return await trackPromise(
        http.delete(`${apiEndpoint}/${id}`)
    );
}

const objectService = {
    getAll,
    get,
    create,
    downloadFile,
    slice,
    updateSetting,
    updateQuantity,
    deleteObject
}

export default objectService