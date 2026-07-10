/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
const api = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

export const authenticatedFetch = async (url, options = {}) => {
  const token = localStorage.getItem("auth_token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("auth_token");
    window.location.href = "/login";
    return null;
  }

  return response;
};

// Auth API
export const login = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch(`${api}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }
  return await response.json();
};

export const getMe = async (token) => {
  const response = await authenticatedFetch(`${api}/auth/me`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return await response.json();
};

export const register = async (username, full_name, password) => {
  const response = await fetch(`${api}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      full_name,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return await response.json();
};

// COMPILER API
export const compileCode = async (souce_code, input_data) => {
  
  let formattedInput = input_data;
  if (typeof input_data === "string") {
    formattedInput = { user_input: input_data };
  } else if (!input_data) {
    formattedInput = { user_input: "" };
  }

  const postDATA = {
    source_code: souce_code,
    input_data: formattedInput,
  };
  try {
    const response = await authenticatedFetch(`${api}/compiler/compile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
};

// QUESTIONS API
export const fetchQuestions = async () => {
  
  try {
    const response = await authenticatedFetch(`${api}/questions/all`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch questions: ${error.message}`);
  }
};

export const createQuestions = async (questionData) => {
  
  try {
    const response = await authenticatedFetch(`${api}/questions/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
};

export const updateQuestion = async (qid, questionData) => {
  try {
    const response = await authenticatedFetch(`${api}/questions/${qid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
};

export const getQuestionById = async (qid) => {
  try {
    const response = await authenticatedFetch(`${api}/questions/${qid}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch question");
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch question: ${error.message}`);
  }
};

export const deleteQuestion = async (qid) => {
  
  try {
    const response = await authenticatedFetch(`${api}/questions/${qid}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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
export const updateTestCases = async (qid, testCases) => {
  
  try {
    const response = await authenticatedFetch(`${api}/questions/${qid}/update-test-cases`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
};

// SUBMISSION API
export const submitAnswer = async (question_id, code, status) => {
  try {
    const response = await authenticatedFetch(`${api}/submissions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question_id: question_id,
        code: code,
        status: status,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Submission failed: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to submit answer: ${error.message}`);
  }
};

export const fetchSubmissions = async (question_id) => {
  try {
    const response = await authenticatedFetch(`${api}/submissions/latest/${question_id}`, {
      method: "GET",
    });
    if(response.status === 404) {
      return null;
    }


    if (!response.ok) {
      throw new Error("Failed to fetch submissions");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};


export const fetchSubmisionByQuestionId = async (question_id) => {
  try {
    const response = await authenticatedFetch(`${api}/submissions/by_question/${question_id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch submissions");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};


export const fetchSubmissionById = async (submission_id) => {
  try {
    const response = await authenticatedFetch(`${api}/submissions/${submission_id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch submission");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};