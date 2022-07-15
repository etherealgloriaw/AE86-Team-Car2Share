const url = 'http://localhost:3001/Login';

const loginSuccess = async(form) => {
    var uri = url + "/" + form.email;
    const response = await fetch (uri, {
        method: 'GET'
    });
    return response.json();
}

const loginFailed = async() =>{
    console.log("loginFailed")
}

const signUp = async(form) => {
    console.log("signUp")
}

const editProfile = async(edited) =>{
    console.log(edited)
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

const AuthService = {
    loginSuccess,
    loginFailed,
    signUp,
    editProfile
};

export default AuthService;