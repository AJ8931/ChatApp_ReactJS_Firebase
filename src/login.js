import React from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import 'firebase/app'
import { auth } from "./firebase";
import "./Login.css";
import { IconButton } from "@mui/material";


const Login = () => {




    return (
        <div id="login-page" >
            <div id="login-card">
            <img className="profilePhoto" src='https://img.icons8.com/color/344/facebook-messenger--v1.png' alt='icon' />
                <h1>Welcome to OVOChat</h1>
                <IconButton
                variant='contained'
                color='primary'
                    className='login-button google'
                    onClick={() => signInWithPopup(auth,new GoogleAuthProvider())}
                >
                    <GoogleIcon /> {"-SignIn with Google"}
                </IconButton>
            </div>
        </div>

    );
}

export default Login;
