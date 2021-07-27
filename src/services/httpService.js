import axios from "axios";
import logger from "./logService";
import {toast} from "react-toastify";

setupJwtHeader()

axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        logger.log(error);
        toast.dark("An unexpected error occurred.");
    }

    return Promise.reject(error);
});

function setupJwtHeader() {
    const jwt = localStorage.getItem('token');
    axios.defaults.headers.common = {'Authorization': `Bearer ${jwt}`};
}

const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt: setupJwtHeader
}

export default http
