import {apiUrl} from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + "/notifications";

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