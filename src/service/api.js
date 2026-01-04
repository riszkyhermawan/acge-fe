const api = import.meta.env.VITE_API_URL_DEV;



// Auth API
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



// COMPILER API
export const compileCode = async (souce_code, input_data) => {
    const tokenForCompile = localStorage.getItem("auth_token");

    let formattedInput = input_data;
    if (typeof input_data === "string") {
        formattedInput = {"user_input": input_data};
    } else if(!input_data){
        formattedInput = {"user_input": ""};
    }
    

    const postDATA = {
        "source_code": souce_code,
        "input_data": formattedInput,
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
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
       
        console.log("Received from backend:", result);
        return result;
    } catch (error) {
        throw new Error(`Failed to compile code: ${error.message}`);
    }
}



// QUESTIONS API
export const fetchQuestions = async () => {
    const tokenForCompile = localStorage.getItem("auth_token");
    try {
        const response = await fetch(`${api}/questions/all`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${tokenForCompile}`
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch questions");
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch questions: ${error.message}`);
    }
}


export const createQuestions = async(questionData) => {
    const token = localStorage.getItem("auth_token");
    try {
        const response = await fetch(`${api}/questions/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(questionData),
        });
        if (!response.ok) {
            throw new Error("Failed to create question");
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to create question: ${error.message}`);
    }
}


export const updateQuestion = async(qid, questionData) => {
    const token = localStorage.getItem("auth_token");
    try {
        const response = await fetch(`${api}/questions/${qid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(questionData),
        });
        if (!response.ok) {
            throw new Error("Failed to update question");
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to update question: ${error.message}`);
    }
}

export const getQuestionById = async(qid) => {
    const token = localStorage.getItem("auth_token");
    try {
        const response = await fetch(`${api}/questions/${qid}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch question");
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch question: ${error.message}`);
    }
}



export const deleteQuestion = async (qid) => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await fetch(`${api}/questions/${qid}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete question");
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to delete question: ${error.message}`);
  }
};



// Test Cases API
export const updateTestCases = async(qid, testCases) => {
    const token = localStorage.getItem("auth_token");
    try {
        const response = await fetch(`${api}/questions/${qid}/update-test-cases`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(testCases),
        });
        if (!response.ok) {
            throw new Error("Failed to update test cases");
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to update test cases: ${error.message}`);
    }
}

