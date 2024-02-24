
// The ".jsx" file extension in React indicates that the file contains JavaScript code with JSX syntax
// JSX allows you to write code that resembles the structure of the user interface you want to represent
// This JSX code is then compiled into regular JavaScript function calls, which are executed in the browser

import React from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'


import logic from './logic'

import { Button, Form, Field } from './library'
import Feedback from './components/Feedback'

import Context from './Context'
import { errors } from 'com'

const { ContentError, DuplicityError, NotFoundError, TokenError } = errors


function App() {
  console.log('App')
  // useState is a React hook. A hook is a special function that allows you to use state
  // and other React features in function components.
  //const viewState = React.useState('login')
  // [<current-state>, <setter-for-next-state>]
  // returns two states, the current state and a function that allows you to update that state.
  // the initial value of the state is login

  //const [view, setView] = React.useState('login')
  const [level, setLevel] = React.useState(null)
  const [message, setMessage] = React.useState(null)


  const navigate = useNavigate()

  const handleRegisterShow = () => {
    //setView('register')
    navigate('/register')
    setMessage(null)
    setLevel(null)
  }

  const handleLoginShow = () => {
    //setView('login')
    navigate('/login')
    setMessage(null)
    setLevel(null)
  }

  const handleHomeShow = () => {
    //setView('home')
    navigate('/')
    setMessage(null)
    setLevel(null)
  }

  // We will handle errors as follows
  const handleError = error => {

    let level = 'fatal'
    let message = error.message

    if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
      level = 'warn'

    else if (error instanceof DuplicityError || error instanceof NotFoundError)

      level = 'error'

    else if (error instanceof TokenError) {
      logic.logoutUser(() => navigate('/login'))
      message = 'Session expired'

    }


    setLevel(level)
    setMessage(message)
    console2.log(error.message, level)

  }

  // We have created the Feedback component in which we show the user a custom error message
  // Through handleFeedbackAccepted we manage the state of this component
  const handleFeedbackAccepted = () => {
    setMessage(null)
    setLevel(null)
  }

  // We encapsulate the app logic in reusable contexts and components
  // We use react-router-dom to manage which components should be displayed based on the current browser URL
  const context = { handleError }
  // all compos that are in context.provider can access the object, whatever is inside {{}}
  return <>
    <Context.Provider value={context}>
      {message && <Feedback level={level} message={message} onAccepted={handleFeedbackAccepted} />}
      {/* {view === 'login' && <Login onRegisterClick={handleRegisterShow} onSuccess={handleHomeShow} />} */}
      {/* error es una copia de la referencia handleError */}
      {/* renderiza el componente login si el estado es login. Y le pasa dos propiedades "onRegisterLink"
       y "onSuccess" */}
      {/* {view === 'register' && <Register onLoginClick={handleLoginShow} onSuccess={handleLoginShow} />} */}
      {/* {view === 'home' && <Home onLogoutClick={handleLoginShow} />} */}

      <Routes>
        <Route path='/login' element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onRegisterClick={handleRegisterShow} onSuccess={handleHomeShow} />} />
        <Route path='/register' element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginShow} onSuccess={handleLoginShow} />} />
        <Route path='/*' element={logic.isUserLoggedIn() ? <Home onLogoutClick={handleLoginShow} /> : <Navigate to="/login" />} />
      </Routes>
    </Context.Provider>
  </>
}

export default App

