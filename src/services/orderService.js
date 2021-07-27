import http from "./httpService";

const apiEndpoint = "/orders";

async function getAll() {
    return await http.get(apiEndpoint);
}

async function get(id) {
    return await http.get(`${apiEndpoint}/${id}`);
}

const order = {
    getAll,
    get
}

export default order