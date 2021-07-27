import http from "./httpService";

const apiEndpoint = "/cart";

async function get() {
    return await http.get(apiEndpoint);
}

async function add(id) {
    return await http.post(`${apiEndpoint}/${id}`);
}

async function remove(id) {
    return await http.delete(`${apiEndpoint}/${id}`);
}

const cart = {
    get,
    add,
    remove
}

export default cart