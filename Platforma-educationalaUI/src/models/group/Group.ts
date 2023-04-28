import Student from "../student/Student";

export default interface Group {
    id: string;
    name: string;
}

export interface GroupsResponse {
    groups: Group[];
    errors: string[];
    responseStatus: number;
}

export interface GroupResponse {
    group: Group;
    errors: string[];
    responseStatus: number;
}

export interface GroupStudentsResponse {
    students: Student[];
    name: string;
    errors: string[];
    responseStatus: number;
}


