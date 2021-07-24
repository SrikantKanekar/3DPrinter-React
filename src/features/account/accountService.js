import http from "../../services/httpService";
import {apiUrl} from "../../config.json";

const apiEndpoint = apiUrl + "/account";

export async function updateAccount(username) {
    const {data} = await http.post(apiEndpoint, {username})
    console.log(data)
}

export default {
    updateAccount
}