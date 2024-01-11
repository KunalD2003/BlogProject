import React, { useEffect, useState } from 'react'
import service from '../Appwrite/crud'
import {PostCard, Container} from '../components/index'

function AllPosts() {
    const [posts, getPosts] = useState("")

    useEffect(() => {
        service .getPosts([]).then((posts) => {
            if(posts){
                getPosts(posts.documents)
            }
        })
    },[posts])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts