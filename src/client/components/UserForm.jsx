import { useState ,useEffect} from "react";
import { useHistory ,useLocation } from 'react-router-dom';
import './UserForm.css'

export default function UserForm({ handleSubmit,errorMsg ,setErrorMsg,isLoading}) {
    const [user, setUser] = useState({ username: '', password: '' });
    const location = useLocation()
    console.log(location.pathname)

      const submit = location.pathname.slice(1)
      console.log(submit)

      
    useEffect(() => {
         setErrorMsg(null)
    },[location])


    const handleSubmitDecorator = (e) => {
        e.preventDefault();
        handleSubmit(user);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    };
    console.log('ISLOADING:')
    return (
        <div className="form-container">
        {!isLoading && <form className="form-login-register" onSubmit={handleSubmitDecorator}>
            <h1>{submit}</h1>
            <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
            <input type="password" name="password" minLength="4" placeholder="Password" value={user.password} onChange={handleChange} />
            <button type="submit">{submit}</button>
            {errorMsg && <div className="error">{errorMsg}</div>}
        </form>}
        {isLoading && <div className="loader"></div>}
        </div>
    );
}