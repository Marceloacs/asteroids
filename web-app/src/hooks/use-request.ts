

import { API_HOST } from "../constants/env";
import axios from "axios";
import useAuth from "./use-auth";

export default function useRequest() {

    const { authToken } = useAuth();

    const axiosInstance = axios.create({
        baseURL: API_HOST,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
        },
    });

    return axiosInstance
}