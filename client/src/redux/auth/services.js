const url = 'http://localhost:3001/Login';

const loginIn = async(form) => {
    console.log(form)
    const response = await fetch(url + "/signIn", {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(form)
    });
    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;
}

const signUp = async(form) => {
    console.log(form)
    const response = await fetch(url + "/signUp", {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(form)
    });
    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;
}

const editProfile = async(edited) =>{
    const id = edited._id;
    const response = await fetch(url + "/Edit", {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(edited)
    });
    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;

}

const rateUser = async(user) =>{
    const response = await fetch(url + "/rate", {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;

}

const uploadPhoto = async(user) =>{
    console.log(user)
    const response = await fetch(url + "/upload", {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;

}

const AuthService = {
    loginIn,
    signUp,
    editProfile,
    rateUser,
    uploadPhoto
};

export default AuthService;