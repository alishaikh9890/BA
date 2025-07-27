import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import {Protector } from './components/index.js'
import AllPosts from './pages/AllPosts.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children:[
      {
        path: '/',
        element:<Home/>
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
                <Protector authentication>
                    {" "}
                    <AllPosts />
                </Protector>
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
            element: <Post />,
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
