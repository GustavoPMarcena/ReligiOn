export type createUserType = {
    name: string;
    email: string;
    password?: string;
    role: string;
    userType: 'LEADER' | 'MEMBER';
    phone: string;
}

export type createUserResponseType = {
    id: string,
    name: string;
    email: string;
    role: string;
    userType: 'LEADER' | 'MEMBER';
    phone: string;
}