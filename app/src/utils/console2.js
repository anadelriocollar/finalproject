// This code defines a new object called window.console2, 
// which has a method called log to print messages to the browser console with 
// specific styles depending on the type of message provided

// window.console2 = {: Defines a new object called console2 in the global window object
window.console2 = {
    // Define a log method within console2 object
    log(message, type = 'debug') {
        // Default text color and background color
        let color = 'yellowgreen'
        let back = 'transparent'

        // Change text color and background color based on the type of message
        if (type === 'info')
            color = 'dodgerblue'
        else if (type === 'warn')
            color = 'gold'
        else if (type === 'error')
            color = 'tomato'
        else if (type === 'fatal') {
            color = 'white'
            back = 'tomato'
        }

        // Log the message to the console with specified styles
        console.log(`%c${message}`, `color: ${color}; background-color: ${back}; font-weight: bold;`)
    }
}