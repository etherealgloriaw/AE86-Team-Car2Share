import Posts from "../components/Posts";
import {SearchBar} from "../components/SearchBar";
import {Filter} from "../components/Filter";
import {Logo} from "../components/Logo";
import React from 'react';
import { Link } from "react-router-dom";

function Login () {
    return (
      <><p>hello</p><div className="login"><h1>Login</h1>
        <form>
          <label>
            <p>Username</p>
            <input type="text" />
          </label>
          <label>
            <p>Password</p>
            <input type="password" />
            <div><Link to={"/User"}>
              <button type="submit">Submit</button>
            </Link>
            </div>
          </label>
        </form></div></>
    )
}

export default Login;