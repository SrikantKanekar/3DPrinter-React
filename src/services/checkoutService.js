import http from "./httpService";

const apiEndpoint = "/checkout";

async function get() {
    return await http.get(apiEndpoint);
}

async function proceed() {
    return await http.post(`${apiEndpoint}/proceed`, {success: true});
}

const checkout = {
    get,
    proceed
}

export default checkout