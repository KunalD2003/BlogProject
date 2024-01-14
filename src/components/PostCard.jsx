import React from 'react'
import crudOps from '../Appwrite/crud'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-red-200 rounded-xl p-4 transition duration-300 ease-in-out hover:bg-red-500 hover:text-white'>
        <div className='w-full justify-center mb-4'>
          <img src={crudOps.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
        </div>
        <h2 className='text-xl font-bold text-center pr-4'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard