import { useState, useRef } from "react"
import './CargaProd.css'

const CargaProd = () => {
  const [productos, setProductos] = useState([])
  const [nuevoProd, setNuevoProd] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  })

  const [idContador, setIdContador] = useState(1)

  const resetNuevoProd = () => {
    setNuevoProd({
      id: 0,
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
    })
  }

  const cargaProductos = (e) => {
    const { name, value } = e.target
    setNuevoProd((prevNuevoProd) => ({ ...prevNuevoProd, [name]: value }))
  }

  const agregarProducto = () => {
    const existingProductIndex = productos.findIndex(
      (producto) => producto.nombre === nuevoProd.nombre
    )

    if (existingProductIndex !== -1) {
      setProductos((prevProductos) => {
        const updatedProductos = [...prevProductos]
        updatedProductos[existingProductIndex] = {
          ...updatedProductos[existingProductIndex],
          stock: nuevoProd.stock,
          precio: nuevoProd.precio,
        }
        return updatedProductos
      })
    } else {
      setProductos((prevProductos) => [
        ...prevProductos,
        {
          ...nuevoProd,
          id: idContador,
        },
      ])
      setIdContador((prevCounter) => prevCounter + 1)
    }

    resetNuevoProd()
  }

    

    return (
        <div className="cargaProductos">
            <h1>Carga de Productos</h1>
            <form>
                <label>ID:</label>
                <input type="text" name="id" value={nuevoProd.id} readOnly />

                <label>Nombre:</label>
                <input type="text" name="nombre" value={nuevoProd.nombre} onChange={cargaProductos} />

                <label>Descripción:</label>
                <input type="text" name="descripcion" value={nuevoProd.descripcion} onChange={cargaProductos} />

                <label>Precio:</label>
                <input type="text" name="precio" value={nuevoProd.precio} onChange={cargaProductos} />

                <label>Stock:</label>
                <input type="text" name="stock" value={nuevoProd.stock} onChange={cargaProductos} />

                <button type="button" onClick={agregarProducto}>Agregar Producto</button>
            </form>

            <div className="listaProductos">
                <h2>Listado de Productos</h2>
                <ul>
                    {productos.map((producto, index) => (
                        <li key={index}>{producto.nombre} - {producto.precio} - Stock: {producto.stock}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default CargaProd