import {apiUrl} from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + "/admin";

async function getAllActiveOrders() {
    return await http.get(apiEndpoint);
}

async function sendNotification(notification) {
    return await http.post(`${apiEndpoint}/notification`, notification);
}

async function updateOrderStatus(status, id) {
    return await http.put(`${apiEndpoint}/order-status/${id}`, status);
}

async function updatePrintingStatus(status) {
    return await http.put(`${apiEndpoint}/printing-status`, status);
}

const admin = {
    getAllActiveOrders,
    sendNotification,
    updateOrderStatus,
    updatePrintingStatus
}

export default admin