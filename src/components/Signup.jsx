import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login as authLogin } from '../Store/authSlice'
import authService from '../Appwrite/auth'
import { Button, Input, Logo } from './index'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState()
    const create = async (data) => {
        setError("")
        try {
            const createUserData = await authService.createAccount(data)
            if (createUserData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width='100%' />
                    </span>
                </div>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(create)} className='mt-8'>
                <div className='space-y-5'>
                    <Input 
                    label = 'Full Name:'
                    type = 'text'
                    placeholder = 'Enter your Name'
                    {...register("name",{
                        required: true,
                    })}
                    />
                    <Input 
                    label = 'Email:'
                    type = 'email'
                    placeholder = 'Enter your email'
                    {...register("email",{
                        required: true,
                        validate: {
                            matchPatern: (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}/>
                    <Input 
                    label = 'Password:'
                    type = 'password'
                    placeholder = 'Enter your Password'
                    {...register("password",{
                        required: true,
                    })}/>
                    <Button 
                    type='submit'
                    className='w-full'>Create Account</Button>
                </div>
            </form>
        </div>
    )
}

export default Signup