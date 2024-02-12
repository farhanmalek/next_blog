'use client'
import React, { useState } from 'react'
import axios, { AxiosError } from "axios"
import {useRouter} from 'next/navigation';


const Page = () => { 
    const router = useRouter();
    const [message, setMessage] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);
        try {
            const formData = new FormData(e.currentTarget);
            const formDataObject = Object.fromEntries(formData.entries());
            const res : any = await axios.post("http://127.0.0.1:1337/api/auth/local/register", formDataObject );

            if (res.jwt && res.user) {
                setMessage("Registration Successful")
            }
            
           alert("Success");
           router.push("/login")
            
            

            
        } catch (err) {
            console.error(err)
            setMessage(err.response?.data.error.message);


        }
        

        
      


    }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-2'>
        <h1 className='self-center text-xl font-bold'>Register to access Blog</h1>
        <div className='bg-gray-800 flex justify-center items-center rounded-xl'>
        <form className='flex flex-col gap-2 p-11' onSubmit={handleSubmit}>
            <input type='text' placeholder='Fm123' name='username' className='rounded-sm p-2  text-gray-950'/>
            <input type='email' placeholder='example@gmail.com' name='email' className='rounded-sm p-2 text-gray-950'/>
            <input type='password' placeholder='Enter a password'  name='password' className='rounded-sm p-2 text-gray-950'/>
            <button type='submit' className=' mt-1 bg-slate-500 rounded-xl p-2 hover:bg-orange-600'>Register!</button>
        </form>
        </div>
        <p>{message}</p>
        

    </div>

    </div>
    
  )
}

export default Page