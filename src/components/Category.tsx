'use client'
import React, { useContext } from 'react'

const Category = ({cat}: any) => {

  
  return (
    <div className='p-4 rounded-lg shadow-md cursor-pointer bg-[#af8533]' onClick={() => {}}>{cat.attributes.Title}</div>
  )
}

export default Category