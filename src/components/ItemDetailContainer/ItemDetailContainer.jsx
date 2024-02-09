import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail"
import { db } from '../../services/firebase/firebaseConfig'
import { getDoc, doc } from 'firebase/firestore'

const ItemDetailContainer = () => {
    const [producto, setProducto] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        if (producto) document.title = producto.title ?? 'Nona Delma'
        else document.title = 'Nona Delma'
    }, [producto])

    useEffect(() => {
        const productDocument = doc(db, 'productos-nonadelma', id)
        getDoc(productDocument)
            .then(queryDocumentSnapshot => {
                if (queryDocumentSnapshot.exists()) {
                    const fields = queryDocumentSnapshot.data()
                    const productAdapted = { id: queryDocumentSnapshot.id, ...fields}
                    setProducto(productAdapted)
                } else {
                    console.error(`El producto con ID ${id} no existe.`)
                }
            })
            .catch(error => {
                console.error('Error al obtener el producto:', error)
            })
    }, [id])

    if (!producto) {
        return <p className='cargando'>Cargando...</p>
    }

    return (
        <ItemDetail {...producto}/>
    )
}

export default ItemDetailContainer