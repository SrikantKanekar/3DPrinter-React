import {apiUrl} from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + "/orders";

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