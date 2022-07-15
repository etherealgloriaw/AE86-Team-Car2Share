const getPosts = async() => {
    const response = await fetch ('http://localhost:3001/posts',{
        method: 'GET'
    });
    return response.json();
};

const searchPost = async(dest) =>{
    console.log("search")
}

const deletePost = async(id) =>{
    console.log("del")
};

const addPost = async(newPost)=>{

    const response = await fetch('http://localhost:3001/posts', {
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

const editPost = async(id, edited) =>{
    const response = await fetch(`http://localhost:3001/posts/edit/${id.user}`, {
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
