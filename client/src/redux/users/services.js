const url = '/Profile';

const getHistory = async(name) => {
    const response = await fetch (`${url}/${name}`,{
        method: 'GET'
    });
    return response.json();
};

const getDriverHistory = async(name) => {
    const response = await fetch (`${url}/driver/${name}`,{
        method: 'GET'
    });
    return response.json();
};

const joinHistory = async(post) =>{
    const response = await fetch(url + "/join", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });
    const data = await response.json();
    console.log(data)
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;
}


const cancelPost = async(id) =>{
    const response = await fetch(`${url}/cancel/${id}`, {
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



const UserService = {
    getHistory,
    joinHistory,
    getDriverHistory,
    cancelPost
};

export default UserService;