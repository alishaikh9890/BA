import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import {login as authLogin}  from "../store/authSlice"
import {Button, Input, Logo} from "./index"
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm();
    cosnt [error, setError] = useState("")


    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div>
            
        </div>
    );
}

export default Login;
