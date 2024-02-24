
import registerUser from './registerUser'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import retrieveUser from '/retrieveUser'
import changeUserEmail from '/changeUserEmail'
import changeUserPassword from '/changeUserPassword'

import publishPost from '/publishPost'
import retrieveFavPosts from '/retrieveFavPosts'
import retrievePosts from '/retrievePosts'
import toggleFavPost from '/toggleFavPost'
import toggleLikePost from '/toggleLikePost'
import toggleEditPost from '/toggleEditPost'
import deletePost from '/deletePost'
import isUserLoggedIn from '/isUserLoggedIn'

import retrieveUserPosts from '/retrieveUserPosts'

const logic = {
    registerUser,
    loginUser,
    logoutUser
}

export default logic
