const getHistory = async() => {
    const response = await fetch (`http://localhost:3001/users/Jasper`,{
        method: 'GET'
    });
    return response.json();
};

const joinPost = async(dest) =>{
    const response = await fetch ('http://localhost:3001/users',{

    })
}

const editProfile = async(id) =>{

}
