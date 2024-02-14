"use client";
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { state } from "../../proxy";

interface ApiResponse {
  jwt: string;
  user: any;
}

const LoginPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      const formDataObject = Object.fromEntries(formData.entries());
      console.log(formDataObject);

      const res = await axios.post<ApiResponse>(
        "http://127.0.0.1:1337/api/auth/local",
        formDataObject
      );

      if (res.data.jwt && res.data.user) {
        setMessage("Login Successful");
        alert("Success");
        state.userJwt = res.data.jwt;
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data.error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-2">
        <h1 className="self-center text-xl font-bold">Login to access Blog</h1>
        <div className="bg-gray-800 flex justify-center items-center rounded-xl">
          <form className="flex flex-col gap-2 p-11" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username or email"
              name="identifier"
              className="rounded-sm p-2 text-gray-950"
            />
            <input
              type="password"
              placeholder="Enter a password"
              name="password"
              className="rounded-sm p-2 text-gray-950"
            />
            <button
              type="submit"
              className=" mt-1 bg-slate-500 rounded-xl p-2 hover:bg-orange-600"
            >
              Login!
            </button>
          </form>
        </div>
        <p>{message}</p>
        <p className="self-center">
          Sign up{' '}
          <span className="underline">
            <button
              onClick={() => {
                router.push("/register");
              }}
            >
              here
            </button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
