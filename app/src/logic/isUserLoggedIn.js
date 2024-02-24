// This isUserLoggedIn() function is a function that determines whether a user is logged in or not

import session from './session'

export default function isUserLoggedIn() {
    // This line returns a boolean value.The double negation!! is used to explicitly convert the value to a boolean
    return !!this.token
}