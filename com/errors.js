// We define a class called 'CredentialsError' that extends of the Error class in JavaScript
class NotFoundError extends Error {
    // constuctor(message): Calls the constructor of the class notFoundError
    constructor(message) {
        // super(message): Calls the constructor of the parent class Error
        super(message)

        // this.constructor refers to the class itself (NotFoundError)
        // Then, this.constructor.name returns the name of the current class, which is "NotFoundError"
        // This line sets the name property of the error instance to the name of the class, 
        // ensuring that the name of the error matches the name of the class
        this.name = this.constructor.name
    }
}

class SystemError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class ContentError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class DuplicityError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class CredentialsError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class TokenError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

// Export each custom error class individually
export {
    NotFoundError,
    SystemError,
    ContentError,
    DuplicityError,
    CredentialsError,
    TokenError
}

// Create an 'errors' object containing references to each custom error class
const errors = {
    NotFoundError,
    SystemError,
    ContentError,
    DuplicityError,
    CredentialsError,
    TokenError
}

export default errors