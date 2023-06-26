import axios from "axios";
import Notification, { HomeworkNotification } from "../models/notify/Notification";

const baseUrl = process.env.NODE_ENV === "development" ? "" : "https://osdkt9tre1.execute-api.eu-central-1.amazonaws.com/dev"

export const sendNotification = async (notification: Notification) => {
    try {
        const url = `${baseUrl}/sendMail`;
        const response = await axios.post(url, notification)
        return response;
    } catch (err) {
        if (axios.isAxiosError(err)) return err.response?.data;
    }
}

export const sendHomeworkEmail = async (notification: HomeworkNotification) => {
    try {
        const url = `${baseUrl}/sendHomework`
        const response = await axios.post(url, notification)
        return response;
    } catch (err) {
        if (axios.isAxiosError(err)) return err.response?.data;
    }
}