const api = import.meta.env.VITE_API_URL_DEV;


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


export const compileCode = async (souce_code, input_data) => {
    const tokenForCompile = localStorage.getItem("auth_token");
    const postDATA = {
        "source_code": souce_code,
        "input_data": input_data,
    };
    try {
        const response = await fetch(`${api}/compiler/compile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenForCompile}`
            },
            body: JSON.stringify(postDATA),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
       
        console.log("Received from backend:", result);
        return result;
    } catch (error) {
        throw new Error(`Failed to compile code: ${error.message}`);
    }
}