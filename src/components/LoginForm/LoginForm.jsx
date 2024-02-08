import { useState, useEffect } from 'react'
import { db } from '../../services/firebase/firebaseConfig'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { Form, Button, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [redirectToInicio, setRedirectToInicio] = useState(false)
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault()
      try {
        const usersRef = collection(db, 'users')
        const q = query(usersRef, where('email', '==', email), where('password', '==', password))
        const querySnapshot = await getDocs(q)
        if (querySnapshot.empty) {
          setError('Credenciales inválidas')
          return
        } else {
          const userDoc = querySnapshot.docs[0]
          const userData = userDoc.data()
          onLogin(userData)
          setRedirectToInicio(true)
        }
      } catch (error) {
        console.error(error)
        setError('Error al iniciar sesión: ' + error)
      }
    }

    useEffect(() => {
        if (redirectToInicio) {
            navigate('/');
        }
    }, [redirectToInicio, navigate]);

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Iniciar sesión
        </Button>

        <Link to='../register'>Registrarse</Link>

        {error && <p>{error}</p>}
      </Form>
    </Container>
  )
}

export default LoginForm