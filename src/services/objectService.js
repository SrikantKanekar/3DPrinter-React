import http from "./httpService";

const apiEndpoint = "/objects";

async function getAll() {
    return await http.get(apiEndpoint);
}

async function get(id) {
    return await http.get(`${apiEndpoint}/${id}`);
}

async function create(object) {
    return await http.post(apiEndpoint, object);
}

async function slice(id) {
    return await http.put(`${apiEndpoint}/slice/${id}`);
}

async function updateSetting(id, setting) {
    return await http.put(`${apiEndpoint}/setting/${id}`, setting);
}

async function updateQuantity(id, quantity) {
    return await http.put(`${apiEndpoint}/quantity/${id}`, quantity);
}

async function deleteObject(id) {
    return await http.delete(`${apiEndpoint}/${id}`);
}

const obj = {
    getAll,
    get,
    create,
    slice,
    updateSetting,
    updateQuantity,
    deleteObject
}

export default obj