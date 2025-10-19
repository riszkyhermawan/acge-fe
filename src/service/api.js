const api = "http://127.0.0.1:8000";


export const login = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);


    const response = await fetch(`${api}/auth/login`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }   
    return await response.json();
}


export const getMe = async (token) => {
    const response = await fetch (`${api}/auth/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }
    return await response.json();
}


export const register = async (username, full_name, password) => {
    const response = await fetch(`${api}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            full_name,
            password
        }),
    });
    if (!response.ok) {
        throw new Error("Registration failed");
    }
    return await response.json();
}