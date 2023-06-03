export default interface Notification {
    projectName: string;
    teacherEmail: string;
    studentName: string;
    linkProject?: string;
}

export interface HomeworkNotification {
    teacherEmail: string;
    studentName: string;
    studentEmail: string;
    message?: string;
    photo: string;
}