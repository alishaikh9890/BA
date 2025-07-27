import React, { useEffect, useState } from 'react'
import appwriteServece from '../appwrite/config'
import { Container, PostCart } from '../components'

const AllPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(()=> {
    appwriteServece.getPosts().then((posts)=> {
        if(posts){
            setPosts(posts.documents)
        }
    })
}, [])
console.log(posts)

  return (
    <div className='w-full py-8'>
        <Container>
        <div className='flex flex-wrap'>
            {posts.map((post)=> (
                <div key={post.$id} className='f-2 w-1/4'>
                    <PostCart {...post} />
                </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts