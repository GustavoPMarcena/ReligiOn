export type InspirationalRequest = {
    title: string,
    content: string
}

export type InspirationalResponse  ={
    id: string,
    title: string,
    content: string,
    userId: string,
    createdAt: string,
    user: {
        name: string;
        image: string | null;
    }
}