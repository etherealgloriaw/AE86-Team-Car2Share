const url = 'http://localhost:3001';

const getPosts = async() => {
    const response = await fetch (url + '/home',{
        method: 'GET'
    });
    console.log(response);
    return response.json();
};

const searchPost = async(searchReq) =>{
    const dest = searchReq.destination;
    const selection = searchReq.selection;
    const sorting = searchReq.sorting;
    const response = await fetch(`${url}/search/${dest}/${selection}/${sorting}`, {
        method: 'GET',
        headers:{
            "Content-type": "application/json"
        },
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;
}

const deletePost = async(id) =>{
    console.log(id)
    const response = await fetch(`${url}/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        }
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;
};

const finishPost = async(id) =>{
    const response = await fetch(`${url}/finish/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json"
        }
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;
};

const addPost = async(newPost)=>{
    const response = await fetch(url + '/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    });
    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }

    return data;
};

const editPost = async(edited) =>{
    const id = edited._id;
    const response = await fetch(`${url}/Edit/${id}`, {
        method: 'PUT',
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


const joinPost = async(id, active)=> {
    console.log("join")
}

const PostService = {
    getPosts,
    addPost,
    deletePost,
    editPost,
    joinPost,
    searchPost,
    finishPost
};

export default PostService;