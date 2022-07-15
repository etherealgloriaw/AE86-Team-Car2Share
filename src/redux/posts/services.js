const getPosts = async() => {
    const response = await fetch ('http://localhost:3001',{
        method: 'GET'
    });
    return response.json();
};

const searchPost = async(dest) =>{
    console.log("search")
}

const deletePost = async(id) =>{
    console.log(id)
    const response = await fetch(`http://localhost:3001/delete/${id}`, {
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

const addPost = async(newPost)=>{

    const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    });
    console.log(JSON.stringify(newPost))
    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }

    return data;
};

const editPost = async(edited) =>{
    const id = edited._id;
    const response = await fetch(`http://localhost:3001/Edit/${id}`, {
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

export default {
    getPosts,
    addPost,
    deletePost,
    editPost,
    joinPost,
    searchPost,
};
