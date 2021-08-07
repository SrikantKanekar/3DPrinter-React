import http from "./httpService";
import {trackPromise} from "react-promise-tracker";

const apiEndpoint = "/admin";

async function getAllActiveOrders() {
    return await trackPromise(
        http.get(apiEndpoint)
    )
}

async function sendNotification(notification) {
    return await trackPromise(
        http.post(`${apiEndpoint}/notification`, notification)
    )
}

async function updateOrderStatus(status, id) {
    return await trackPromise(
        http.put(
            `${apiEndpoint}/order-status/${id}`,
            status,
            {headers: {"Content-Type": "application/json"}}
        )
    )
}

async function updatePrintingStatus(request) {
    return await trackPromise(
        http.put(`${apiEndpoint}/printing-status`, request)
    )
}

const admin = {
    getAllActiveOrders,
    sendNotification,
    updateOrderStatus,
    updatePrintingStatus
}

export default admin