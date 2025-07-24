import React, { useEffect, useState } from 'react'
import appwriteServece from '../appwrite/config'
import { PostCart } from '../components'

const Home = () => {
    const [posts, setPosts] = useState([])

    useEffect(()=> {
        appwriteServece.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])

return posts.length === 0 ? (
    <div className='w-full py-8 mt-4 text-center'>
        <Container>
            <div className='flex flex-wrap'>
                <div className='p-2 w-full'>
                    <h1 className='text-2xl font-bold hover:text-gray-500'>
                        Login to read Posts
                    </h1>
                </div>
            </div>
        </Container>
    </div>
): (
     <div className='w-full py-8 mt-4 text-center'>
        <Container>
            <div className='flex flex-wrap'>
               {posts.map((post)=>(
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCart post={post}/>
                </div>
               ))}
            </div>
        </Container>
    </div> 
)
}

export default Home