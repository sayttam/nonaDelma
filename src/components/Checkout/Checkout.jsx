import { useState } from "react"
import { collection, getDocs, where, query, documentId, writeBatch, addDoc } from "firebase/firestore"
import { useCart } from "../../context/CartContext"
import { db } from "../../services/firebase/firebaseConfig"

const Checkout = () => {
    const [orderId, setOrderId] = useState(null)
    const { cart, total, clearCart } = useCart()

    const createOrder = async () => {
        try {
            const objOrder = {
                buyer: { 
                    name: 'Matias Bustos Zanelli',
                    email: 'joel.bustos@gmail.com',
                    phone: '+543515297866'
                },
                items: cart,
                total 
            }
    
            const batch = writeBatch(db)
            const outOfStock = []
    
            const ids = cart.map(prod => prod.id)
            console.debug(ids)
            const productsCollection = query(collection(db, 'productos-nonadelma'), where(documentId(), 'in', ids))
    
            const querySnapshot = await getDocs(productsCollection)
            const { docs } = querySnapshot
            
            docs.forEach(doc => {
                const fields = doc.data()
                const stockDb = fields.available_quantity
    
                const productsAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productsAddedToCart.cantidad
                console.log(stockDb >= prodQuantity)
                console.debug(stockDb + ' ' + prodQuantity)
                if(stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity})
                } else {
                    outOfStock.push({ id: doc.id, ...fields})
                }
            })
    
            if(outOfStock.length === 0) {
                batch.commit()
    
                const orderCollection = collection(db, 'orders')
                const { id } = await addDoc(orderCollection, objOrder)
                
                setOrderId(id)

                clearCart()
            } else {
                console.debug('error: Hay productos que no tienen stock disponible')
            }
        } catch (error) {
            console.error('Hubo un error al crear la orden: ' + error)
        } finally {
            console.debug('OK')
        }
        
    }

    if(!createOrder) {
        return <h1>Se esta generando su orden, aguarde por favor...</h1>
    }

    if(orderId) {
        return <h1>El id de su compra es: {orderId}</h1>
    }

    return (
        <>
            <h1>CHECKOUT</h1>
            <button onClick={createOrder}>Generar orden</button>
        </>
    )
}

export default Checkout