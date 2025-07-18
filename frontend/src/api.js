import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export function sendTrainRequest(payload) {
    return axios.post(`${API_URL}/train`, payload);
}

export function sendSaveRequest(payload) {
    return axios.post(`${API_URL}/save`, payload);
}

