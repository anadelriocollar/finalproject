import logic from '../logic'
import { Button, Link, Form, Field, Container } from '../library'
import { useContext } from '../hooks'

export default function Login(props) {
    console.log('Login')

    const context = useContext()

    const handleSubmit = async event => {
        event.preventDefault()

        const emailInput = event.target.querySelector('#email-input')
        const passwordInput = event.target.querySelector('#password-input')

        const email = emailInput.value
        const password = passwordInput.value

        try {
            await logic.loginUser(email, password)

            props.onSuccess()
        } catch (error) {
            context.handleError(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <Container>
        <h1>Login</h1>

        <Form onSubmit={handleSubmit}>
            <Field id="email-input" type="email">E-mail</Field>
            <Field id="password-input" type="password">Password</Field>

            <Button type="submit">Login</Button>
        </Form>

        <Link onClick={handleRegisterClick}>Register</Link>
    </Container>
}