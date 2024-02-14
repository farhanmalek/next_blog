import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const BlogCard = ({blog}:any) => {
  
  const truncateBlogDesc = blog.attributes.Description.length > 80 ?
  blog.attributes.Description.substring(0,80) + "..." : blog.attributes.Description;

  const imageUrl = "http://127.0.0.1:1337" + blog.attributes.Image.data.attributes.url;




  return (
    <div className='rounded-lg shadow-md p-4 mb-4 overflow-hidden border border-gray-600 cursor-pointer h-[500px]'>
      <Link href={`/blog/${blog.id}`}>
        <div className='relative w-full h-1 pb-[100%]'>
          <Image layout ="fill" objectFit='cover' src={imageUrl} alt={""} className='rounded-t-lg'/>
        </div>
        <div className='p-2'>
          <h2 className='text-xl font-semibold mb-2 overflow-ellipsis'>
            {blog.attributes.Title}
          </h2>
          <p className='text-gray-600'>{truncateBlogDesc}</p>

        </div>
      </Link>

        
    </div>
  )
}

export default BlogCard