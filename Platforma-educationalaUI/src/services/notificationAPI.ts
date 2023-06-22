import axios from "axios";
import Notification, { HomeworkNotification } from "../models/notify/Notification";

export const sendNotification = async (url: string, notification: Notification) => {
    try {
        const response = await axios.post(url, notification)
        return response;
    } catch (err) {
        if (axios.isAxiosError(err)) return err.response?.data;
    }
}

export const sendHomeworkEmail = async (url: string, notification: HomeworkNotification) => {
    try {
        const response = await axios.post(url, notification)
        return response;
    } catch (err) {
        if (axios.isAxiosError(err)) return err.response?.data;
    }
}