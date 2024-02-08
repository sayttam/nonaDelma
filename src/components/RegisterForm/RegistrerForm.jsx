import { useState } from 'react'
import { db } from '../../services/firebase/firebaseConfig'
import { Form, Button, Container } from 'react-bootstrap'
import { addDoc, collection } from 'firebase/firestore'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [numeroTel, setNumeroTel] = useState('')
  const [error, setError] = useState(null)

  const limpiarFormulario = () => {
    setNombre('')
    setApellido('')
    setEmail('')
    setNumeroTel('')
    setPassword('')
  }


  const handleRegister = async (e) => {
    const userData = {
        nombre,
        apellido,
        email,
        numeroTel,
        password,
    }

    e.preventDefault()
    try {
        const addUser = await addDoc(collection(db, 'users'), userData)
      limpiarFormulario()
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Apellido</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPhoneNumber">
          <Form.Label>Número de teléfono</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu número de teléfono" value={numeroTel} onChange={(e) => setNumeroTel(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrarse
        </Button>

        {error && <p>{error}</p>}
      </Form>
    </Container>
  )
}

export default RegisterForm
