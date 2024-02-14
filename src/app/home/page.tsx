/* eslint-disable @next/next/no-async-client-component */
"use client"

import Image from "next/image";
import Categories from "@/components/Categories";
import Blogs from "@/components/Blogs";
import { useSnapshot } from "valtio";
import { state } from "../../proxy"
import { useRouter } from "next/navigation";



async function fetchCategories () {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    }
  }


  try {
    const res = await fetch("http://127.0.0.1:1337/api/categories", {
      ...options,
      cache: 'no-store',
    });
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
  }
  
}

async function fetchBlogs () {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    }
  }


  try {
    const res = await fetch("http://127.0.0.1:1337/api/blogs?populate=*", options);
    const response = await res.json();
    console.log(response, "hi");
    return response;
  } catch(err) {
    console.error(err)
  }
}

// const categories =  fetchCategories();
const blogs =  fetchBlogs();



export default function Home() {

  const router = useRouter();
  const snap = useSnapshot(state)
  console.log(snap.userJwt)

  if (!snap.userJwt) {
    router.replace("/login");
  }


  return (
    <div className="flex flex-col">
        
          <Blogs blogs={blogs} />
          <button onClick={() => (state.userJwt = null)}>Logout</button>
      
    </div>
  );
}
