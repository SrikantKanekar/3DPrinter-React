import http from "./httpService";

const apiEndpoint = "/admin";

async function getAllActiveOrders() {
    return await http.get(apiEndpoint);
}

async function sendNotification(notification) {
    return await http.post(`${apiEndpoint}/notification`, notification);
}

async function updateOrderStatus(status, id) {
    return await http.put(
        `${apiEndpoint}/order-status/${id}`,
        status,
        {headers: {"Content-Type": "application/json"}}
    );
}

async function updatePrintingStatus(request) {
    return await http.put(`${apiEndpoint}/printing-status`, request);
}

const admin = {
    getAllActiveOrders,
    sendNotification,
    updateOrderStatus,
    updatePrintingStatus
}

export default admin