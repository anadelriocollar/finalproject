import { validate } from 'com'
import session from './session'


function logoutUser(callback) {
    validate.function(callback, 'callback')

    // Setting 'token' to null
    this.token = null
    // Setting 'sessionUserId' to null
    this.sessionUserId = null

    callback(null)
}

export default logoutUser
