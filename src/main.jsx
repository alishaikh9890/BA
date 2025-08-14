import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
const Home = lazy(()=> import('./pages/Home.jsx')) 
import {Protector } from './components/index.js'
import Loading from './components/Loading.jsx'
const AllPosts = lazy(()=> import('./pages/AllPosts.jsx'))
const Login = lazy(()=> import('./pages/Login.jsx'))
const SignUp = lazy(()=> import('./pages/SignUp.jsx'))
const AddPost = lazy(()=> import('./pages/AddPost.jsx'))
const EditPost = lazy(()=> import('./pages/EditPost.jsx'))
const Post = lazy(()=> import('./pages/Post.jsx'))


const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children:[
      {
        path: '/',
        element:(
          <Suspense fallback={<Loading/>}>
            <Home/>
          </Suspense>)
      },
      {
        path:'/login',
        element:(
          <Protector authentication={false}>
            <Login/>
          </Protector>
        )
      },
      {
            path: "/signup",
            element: (
                <Protector authentication={false}>
                    <SignUp />
                </Protector>
            ),
        },
        {
            path: "/all-posts",
            element: (
              <Suspense fallback={<Loading/>}>
                <Protector authentication>
                    {" "}
                            <AllPosts />
                            </Protector>
                            </Suspense>
            ),
        },
        {
            path: "/add-posts",
            element: (
                <Protector authentication>
                    {" "}
                    <AddPost />
                </Protector>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <Protector authentication>
                    {" "}
                    <EditPost />
                </Protector>
            ),
        },
        {
            path: "/post/:slug",
            element: (
          <Suspense fallback={<Loading/>}>
            <Post/>
          </Suspense>),
        },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>

    </RouterProvider>
    </Provider>
  </StrictMode>,
)
