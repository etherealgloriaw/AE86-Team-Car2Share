import { Link } from "react-router-dom";
import User from "../pages/User";


export const Login = () => {
    return (
        <div className="login"><h1>Login</h1>
        <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div><Link to={"/User"} className="button muted-button">
            <button type="submit">Submit</button>
        </Link>
        </div>
      </form></div>
    )
}
