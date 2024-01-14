import React, { useEffect, useState } from 'react'
import {useNavigate, useParams, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import service from '../Appwrite/crud'
import {Container,Button} from '../components/index'
import parse from "html-react-parser";
 
function Post() {
  const [post, setPost] = useState()
  const {slug} = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)

  const isAuthor = post && userData ? (post.userId === userData.$id) :false

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if(post){
          setPost(post)
        }
        else{
          navigate('/')
        }
      }) 
    }
    else{
      navigate('/')
    }
  },[slug,navigate])

  const deletePost = () =>{ 
    service.deletePost(post.$id).then((status) => {
      if(status){
        service.deleteFile(post.featuredImage);
        navigate('/');
      }
    })
  }

  return post ? (
    <div className='py-8 flex items-center justify-center bg-red-200'>
  <Container>
    <div className='w-[50%] flex flex-col items-center mb-4 relative border rounded-xl p-2 mx-auto bg-white'>
      <img src={service.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-xl mb-4' />
      {isAuthor && (
        <div className='absolute right-6 top-6'>
          <Link to={`/edit-post/${post.$id}`}>
            <Button bgColor="bg-green-500" className="mr-3">
              Edit
            </Button>
          </Link>
          <Button bgColor="bg-red-500" onClick={deletePost}>
            Delete
          </Button>
        </div>
      )}
      <div className='w-full mb-6 text-center'>
        <h1 className='text-2xl font-bold'>{post.title}</h1>
      </div>
      <div className="browser-css">
        {parse(post.content)}
      </div>
    </div>
  </Container>
</div>

  ) : null
}

export default Post