import { useState } from "react"
import { Link } from "react-router-dom"
import './ItemCount.css'
import { useCart } from "../../context/CartContext"

const ItemCount = ({ stock, inicial = 1, onAdd }) => {
    const [cantidad, setCantidad] = useState(inicial)
    const [productoAgregado, setProductoAgregado] = useState(false)

    const incrementar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1)
        }
    }

    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    }

    const handleOnAdd = () => {
        onAdd(cantidad)
        setProductoAgregado(true)
    }

    

    if (productoAgregado) {
        return (
            <div className="card">
                <Link to='../cart'>Terminar compra</Link>
            </div>
        )
    } else {

        return (
            <div className="card">
                <div style={{ display: 'flex', position: 'relative', left: '40%' }}>
                    <button className="btn" onClick={decrementar}>-</button>
                    <h3>{cantidad}</h3>
                    <button className="btn" onClick={incrementar}>+</button>
                </div>
                <div>
                    <button style={{ fontSize: '10px', backgroundColor: '#0076fc', color: 'white' }} onClick={handleOnAdd} disabled={!stock}>Agregar al carrito</button>
                </div>
            </div>
        )
    }

}

export default ItemCount