import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Field, Link } from '../library'
import logic from '../logic'
import { Input } from '../library'
import session from '../logic/session'

//import Context from '../Context'
import { useContext } from '../hooks' //esto


//está declarado en null, porque es el estado inicial


function Post(props) {

    const [editTextPost, setEditTextPost] = useState(null)

    //const { handleError } = useContext(Context)

    const context = useContext()
    const navigate = useNavigate()


    const post = props.post

    function handleToggleLikePostClick() {
        try {
            logic.toggleLikePost(post.id)
                .then(() => {
                    props.onToggleLikeClick()
                })
                .catch(error => context.handleError(error))


        } catch (error) {
            //alert(error.message)
            context.handleError(error)
        }
    }



    function handleToggleFavPostClick() {
        try {
            logic.toggleFavPost(post.id)
                .then(() => {

                    props.onToggleFavClick()
                })
                .catch(error => context.handleError(error))




        } catch (error) {
            //alert(error.message)
            context.handleError(error)
        }
    }

    function handleEditSubmit(event) {
        event.preventDefault()

        const text = event.target.querySelector("#text").value
        console.log(text)

        try {
            logic.toggleEditPost(post.id, text)
                .then(() => {
                    setEditTextPost(null)
                    props.onToggleEditClick()

                })
                .catch(error => context.handleError(error))





        } catch (error) {
            //alert(error.message)
            context.handleError(error)
        }

    }

    function handleEditClick() {

        if (editTextPost === null) {

            setEditTextPost('edit-text-post')
            // } else {
            //     setEditTextPost(null)
        }



    }

    function handleCancelEdit() {
        setEditTextPost(null)
    }

    function handleToggleDeletePostClick() {

        if (confirm('Are you sure you want to delete this post?')) {
            try {
                logic.deletePost(post.id)
                    .then(() => {
                        props.onToggleDeleteClick()

                    })
                    .catch(error => context.handleError(error))


            } catch (error) {
                //alert(error.message)
                context.handleError(error)
            }
        }
    }

    const handleUserClick = event => {
        event.preventDefault()

        navigate(`/users/${props.post.author.id}`)
    }




    return (<article className="post">
        <h2><Link onClick={handleUserClick}>{props.post.author.name}</Link></h2>
        <img className="post-image" src={post.image} />
        <p>{post.text}</p>

        <div className="post-actions">

            <Button onClick={handleToggleLikePostClick}>{post.liked ? '❤️' : '🤍'} {post.likes.length} </Button>
            <Button onClick={handleToggleFavPostClick}>{post.fav ? '⭐️' : '✩'}</Button>
            {post.author.id === session.sessionUserId && (<Button onClick={() => handleToggleDeletePostClick(post.id)}>🗑</Button>)}
            {post.author.id === session.sessionUserId && editTextPost === null && <Button onClick={handleEditClick}> 🖍</Button>}

            {/* Lo que envuelve al elemento, por ejemplo un botón se llaman children, en el caso del botón
             de like, {post.liked ? '❤️' : '🤍'} {post.likes.length}  eso son los children */}

        </div>

        <div>

            {editTextPost === 'edit-text-post' && <Form onSubmit={handleEditSubmit}>
                <Input id="text"></Input>
                <Button type='onSubmit'>Save</Button>
                <Button onClick={handleCancelEdit}>Cancel</Button>

            </Form>}


        </div>




    </article>
    )
}

export default Post
