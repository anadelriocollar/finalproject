// These methods (set y get) allow setting and retrieving the values of the userId 
// and session token in a convenient way using the object property access syntax, 
// making it easier to manage the user's session in the application

// Definition of an object named 'session' that handles user session
const session = {
    // Setter and getter for session's userId
    set sessionUserId(userId) {
        // If userId is provided, it is stored in sessionStorage
        if (userId) {
            sessionStorage.userId = userId
        } else {
            // If no userId is provided, it is deleted from sessionStorage
            delete sessionStorage.userId
        }
    },

    // Getter to retrieve session's userId
    get sessionUserId() {
        // Returns userId stored in sessionStorage, or null if no userId exists
        return sessionStorage.userId ? sessionStorage.userId : null
    },

    // Setter and getter for session's token
    set token(token) {
        if (token) {
            // If token is provided, it is stored in sessionStorage
            sessionStorage.token = token
        } else {
            // If no token is provided, it is deleted from sessionStorage
            delete sessionStorage.token
        }
    },

    // Getter to retrieve session's token
    get token() {
        // Returns token stored in sessionStorage, or null if no token exists
        return sessionStorage.token ? sessionStorage.token : null
    }
}

export default session