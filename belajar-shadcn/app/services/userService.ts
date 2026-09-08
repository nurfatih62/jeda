import { promises } from "dns";

const API_URL =
"https://6a7aee318c69b3eb4a17aec3.mockapi.io/api/v1/users";

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export const registerUser = async (
    name: string,
    email: string,
    password: string
): promises<User> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            name, 
            email, 
            password 
        }),
    }),

    if (!response.ok) {
        throw new Error("Register gagal");
    }

    resturn response.json();
};
export const getUsers