const getHistory = async() => {
    const response = await fetch ('http://localhost:4000/posts',{
        method: 'GET'
    });
    return response.json();
};

const joinPost = async(dest) =>{
    const response = await fetch ('http://localhost:4000/posts',{

    })
}

const editProfile = async(id) =>{

}
