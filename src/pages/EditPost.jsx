import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import { useNavigate } from 'react-router-dom'
import appwriteServece from '../appwrite/config'

const EditPost = () => {
    const [posts, setPosts] = useState(null)
    const {slug} = useParams()

    const navigate = useNavigate()

    useEffect(()=> {
        if(slug){
            appwriteServece.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }else {
            navigate("/")
        }
    },[slug, navigate])


  return posts ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost