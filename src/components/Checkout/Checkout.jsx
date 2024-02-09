import { useState } from "react"
import { collection, getDocs, where, query, documentId, writeBatch, addDoc } from "firebase/firestore"
import { useCart } from "../../context/CartContext"
import { db } from "../../services/firebase/firebaseConfig"
import { Button, Container, Spinner, Alert, Table } from 'react-bootstrap'

const Checkout = ({ user }) => {
    const [orderDetails, setOrderDetails] = useState(null)
    const { cart, total, clearCart } = useCart()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const createOrder = async () => {
        setLoading(true)
        try {
            const objOrder = {
                buyer: {
                    name: user.nombre + ' ' + user.apellido,
                    email: user.email,
                    phone: user.numeroTel
                },
                items: cart,
                total
            }

            const batch = writeBatch(db)
            const outOfStock = []

            const ids = cart.map(prod => prod.id)
            const productsCollection = query(collection(db, 'productos-nonadelma'), where(documentId(), 'in', ids))

            const querySnapshot = await getDocs(productsCollection)
            const { docs } = querySnapshot

            docs.forEach(doc => {
                const fields = doc.data()
                const stockDb = fields.stock

                const productsAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productsAddedToCart.cantidad

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outOfStock.push({ id: doc.id, ...fields })
                }
            })

            if (outOfStock.length === 0) {
                batch.commit()

                const orderCollection = collection(db, 'orders')
                const { id } = await addDoc(orderCollection, objOrder)

                setOrderDetails({ id, ...objOrder })
                clearCart()
            } else {
                setError('Hay productos que no tienen stock disponible')
            }
        } catch (error) {
            if (!user) {
                setError('Para hacer el checkout debes estar logueado')
            } else {
                console.error('Hubo un error al crear la orden: ' + error)
                setError('Hubo un error al crear la orden')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-4">CHECKOUT</h1>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {orderDetails ? (
                        <>
                            <h2>Detalles de la compra</h2>
                            <p><strong>ID:</strong> {orderDetails.id}</p>
                            <h3>Productos:</h3>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Cantidad</th>
                                        <th>Precio unitario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetails.items.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.title}</td>
                                            <td>{item.cantidad}</td>
                                            <td>${item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <p><strong>Total:</strong> ${orderDetails.total}</p>
                            <p><strong>Comprador:</strong> {orderDetails.buyer.name}</p>
                            <p><strong>Email:</strong> {orderDetails.buyer.email}</p>
                            <p><strong>Teléfono:</strong> {orderDetails.buyer.phone}</p>
                        </>
                    ) : (
                        <Button onClick={createOrder} variant="primary">
                            Generar orden
                        </Button>
                    )}
                </>
            )}
        </Container>
    )
}

export default Checkout