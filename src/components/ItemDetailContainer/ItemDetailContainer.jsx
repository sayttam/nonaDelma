import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail"
import { db } from '../../services/firebase/firebaseConfig'
import { getDoc, doc } from 'firebase/firestore'

const ItemDetailContainer = () => {
    const [producto, setProducto] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const productDocument = doc(db, 'productos-nonadelma', id)
        getDoc(productDocument)
            .then(queryDocumentSnapshot => {
                if (queryDocumentSnapshot.exists()) {
                    const fields = queryDocumentSnapshot.data()
                    const productAdapted = { id: queryDocumentSnapshot.id, ...fields }
                    setProducto(productAdapted)
                } else {
                    console.error(`El producto con ID ${id} no existe.`)
                    setProducto({})
                }
            })
            .catch(error => {
                console.error('Error al obtener el producto:', error)
            })
    }, [id])

    if (producto === null) {
        return <p className='cargando'>Cargando...</p>
    }

    if (Object.keys(producto).length === 0) {
        return <p className='cargando'>Producto no encontrado</p>
    }

    return (
        <ItemDetail {...producto}/>
    )
}

export default ItemDetailContainer