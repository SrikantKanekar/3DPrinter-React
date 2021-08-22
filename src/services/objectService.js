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

async function updateQuality(id, quality) {
    return await trackPromise(
        http.put(
            `${apiEndpoint}/quality/${id}`,
            quality,
            {headers: {"Content-Type": "application/json"}}
        )
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
    updateQuality,
    updateQuantity,
    deleteObject
}

export default objectService