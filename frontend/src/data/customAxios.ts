import axios from "axios";
import config from "../shared/config";

const customAxios = axios.create({
    baseURL: config.serverUrl,
});

export default customAxios;