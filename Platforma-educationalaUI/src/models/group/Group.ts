export default interface Group {
    id: string;
    name: string;
}

export interface GroupsResponse {
    groups: Group[];
    errors: string[];
    responseStatus: number;
}


