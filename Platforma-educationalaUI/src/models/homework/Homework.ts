export default interface Homework {
    id: string;
    name: string;
    teacherId: string,
    studentId: string
    projectId?: string
}

export interface HomeworkResponse {
    homeworks: Homework[];
    errors: string[];
    responseStatus: number;
}