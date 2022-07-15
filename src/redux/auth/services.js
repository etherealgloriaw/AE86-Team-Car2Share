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

const AuthService = {
    loginSuccess,
    loginFailed,
    signUp
};

export default AuthService;