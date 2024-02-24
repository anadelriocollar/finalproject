import { useParams } from 'react-router-dom'
import logic from "../logic"

import { useEffect, useState } from 'react'
import Post from './Post' // lo importo para renderizar un post
import { Container } from '../library'


import { useContext } from '../hooks'


function UserPosts(props) {
    console.log('UserPosts')

    const params = useParams()
    const context = useContext()
    const [posts, setPosts] = useState([])



    const refreshPosts = () => {
        try {
            props.loadPosts(params.userId)
                .then(posts => {
                    posts.reverse()

                    setPosts(posts)

                })
                .catch(error => context.handleError(error))


        } catch (error) {
            //alert(error.message)
            context.handleError(error)
        }
    }

    useEffect(() => {
        console.log('Posts effect')

        refreshPosts()
    }, [props.stamp])




    return <div className="posts">
        {/* {posts.map((post) => <Post key={post.id} post={post} onToggleLikeClick={handleLikeClick} onToggleFavClick={handleFavPostClick} onToggleDeleteClick={handleDeletePostClick} />)} */}
        {posts.map(post => <Post key={post.id} post={post} onToggleLikeClick={refreshPosts} onToggleFavClick={refreshPosts} onToggleEditClick={refreshPosts} onToggleDeleteClick={refreshPosts} onError={context.handleError} />)}
        {/* con React necesitamos crear una Key para renderizar una lista de
         elementos. Esta lista de elementos se renderiza con .map, porque .map
         devuelve un arrays */}
    </div>

}

export default UserPosts
