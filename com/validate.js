export { ContentError } from './errors.js'

// regex: a regular expression is a text search and manipulation tool that allows you to define specific text 
// patterns to perform various operations on character strings
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const ID_REGEX = /^[0-9A-Fa-f]{24}$/

function text(text, explain) {
    if (typeof text !== 'string') throw new TypeError(explain + ' is not string')
    // Check if the text is empty after trimming whitespace
    // The trim() method is used to remove whitespace from both ends of a string
    // This ensures that even if a user enters spaces or tabs, it's treated as an empty value
    if (!text.trim().length) throw new ContentError(explain + ' is empty')
}

function email(email, explain) {
    text(email, explain)

    if (!EMAIL_REGEX.test(email)) throw new ContentError(`${explain} is not valid`)
}

function password(password, explain = 'password') {
    text(password, explain)

    if (password.length < 8) throw new RangeError(`${explain} length is lower than 8 characters`)
}

function number(number, explain) {
    if (typeof number !== 'number') throw new TypeError(`${explain} is not a number`)
}

function funktion(funktion, explain) {
    if (typeof funktion !== 'function') throw new TypeError(`${explain} is not a function`)
}

function id(id, explain) {
    text(id, explain)

    if (!ID_REGEX.test(id)) throw new ContentError(`${explain} is not a valid id`)
}

const validate = {
    text,
    email,
    number,
    password,
    function: funktion,
    id
}

export default validate
