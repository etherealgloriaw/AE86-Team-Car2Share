import ModifyPost from '../components/ModifyPost'
import { useNavigate, Navigate } from 'react-router-dom'

export default function AddNewPost() {
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user != null) return (<ModifyPost post={null} forEdit={false}/>)
    else return < Navigate to='/Login' />
}
