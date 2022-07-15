const url = 'http://localhost:3001/Profile';

const getHistory = async(name) => {
    console.log(url +  "/" + name);
    const response = await fetch (url +  "/" + name,{
        method: 'GET'
    });
    return response.json();
};

const joinHistory = async(dest) =>{
}

const editProfile = async(id) =>{

}

const exportUser = {
    getHistory,
    joinHistory,
    editProfile 
};

export default exportUser;