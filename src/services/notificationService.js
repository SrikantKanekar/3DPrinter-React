import http from "./httpService";

const apiEndpoint = "/notifications";

async function getAll() {
    return await http.get(apiEndpoint);
}

async function get(id) {
    return await http.get(`${apiEndpoint}/${id}`);
}

const notification = {
    getAll,
    get
}

export default notification