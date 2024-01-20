import { useState } from "react";

const ItemCount = ({stock, inicial, onAdd}) => {
    const [cantidad, setCantidad] = useState(inicial)

    const incrementar = ()=> {
        if(cantidad < stock) {
            setCantidad(cantidad + 1)
        }
    }

    const decrementar = ()=> {
        if(cantidad > 1) {
            setCantidad(cantidad - 1)
        }
    } 

    return (
        <div className="card">
            <div style={{display: 'flex', position: 'relative', left: '40%'}}>
                <button className="btn" onClick={decrementar}>-</button>
                <h3>{cantidad}</h3>
                <button className="btn" onClick={incrementar}>+</button>
            </div>
            <div>
                <button style={{fontSize: '10px', backgroundColor: '#0076fc', color: 'white'}} onClick={()=> onAdd(cantidad)} disabled={!stock}>Agregar al carrito</button>
            </div>
        </div>
    )
}

export default ItemCount