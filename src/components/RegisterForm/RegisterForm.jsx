import { useState } from 'react'
import { db } from '../../services/firebase/firebaseConfig'
import { Form, Button, Container, Toast  } from 'react-bootstrap'
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [numeroTel, setNumeroTel] = useState('')
    const [error, setError] = useState(null)
    const [showToast, setShowToast] = useState(false)
    const navigate = useNavigate()

    const limpiarFormulario = () => {
        setNombre('')
        setApellido('')
        setEmail('')
        setNumeroTel('')
        setPassword('')
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        const correoExistente = await verificarCorreoExistente(email)
        if (correoExistente) {
            setError('El correo electrónico ya está en uso')
            return
        }

        const userData = {
            nombre,
            apellido,
            email,
            numeroTel,
            password,
        }

        try {
            const addUser = await addDoc(collection(db, 'users'), userData)
            setShowToast(true)
            setTimeout(() => {
                limpiarFormulario()
                setShowToast(false)
                navigate('../login')
            }, 3000)
        } catch (error) {
            setError(error.message)
        }
    }

    const verificarCorreoExistente = async (email) => {
        const q = query(collection(db, 'users'), where('email', '==', email))
        const querySnapshot = await getDocs(q)
        return !querySnapshot.empty
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

                <Toast show={showToast} onClose={() => setShowToast(false)} style={{ position: 'fixed', top: '80px', right: '20px' }}>
                    <Toast.Header>
                        <strong className="me-auto">Cuenta creada!</strong>
                    </Toast.Header>
                    <Toast.Body>Ahora puedes loguearte.</Toast.Body>
                </Toast>

                {error && <p>{error}</p>}
            </Form>
        </Container>
    )
}

export default RegisterForm