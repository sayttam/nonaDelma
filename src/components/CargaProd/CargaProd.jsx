import { useState } from "react"
import './CargaProd.css'
import { db } from '../../services/firebase/firebaseConfig'
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom"

const CargaProd = () => {
  const [productos, setProductos] = useState([])
  const [nuevoProd, setNuevoProd] = useState({
    id: "",
    category_id: "",
    currency_id: "ARS",
    price: "",
    stock: "",
    thumbnail: "",
    title: ""
  })

  const resetNuevoProd = () => {
    setNuevoProd({
      id: "",
      category_id: "",
      currency_id: "ARS",
      price: "",
      stock: "",
      thumbnail: "",
      title: ""
    })
  }

  const cargaProductos = (e) => {
    const { name, value } = e.target
    setNuevoProd((prevNuevoProd) => ({ ...prevNuevoProd, [name]: value }))
  }

  const actualizarProducto = async (productoId, nuevosDatos) => {
    try {
      const productoRef = doc(db, 'productos-nonadelma', productoId)
      await updateDoc(productoRef, nuevosDatos)
    } catch (error) {
      console.error('Error al actualizar el ID del producto:', error)
    }
  }

  const agregarProducto = async () => {
    try {
      const docRef = await addDoc(collection(db, 'productos-nonadelma'), {
        ...nuevoProd,
      })

      const productoAgregado = {
        id: docRef.id,
        ...nuevoProd,
      }

      setProductos((prevProductos) => [
        ...prevProductos,
        productoAgregado,
      ])

      await actualizarProducto(docRef.id, { id: docRef.id })

      resetNuevoProd()
    } catch (error) {
      console.error("Error al agregar producto: ", error)
    }
  }

  return (
    <Container className="cargaProductos">
      <Link to={`../productos`} className='botonAtras'>Atras</Link>
      <h1 className="text-center">Carga de Productos</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Título:</Form.Label>
            <Form.Control type="text" name="title" value={nuevoProd.title} onChange={cargaProductos} />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Precio:</Form.Label>
            <Form.Control type="text" name="price" value={nuevoProd.price} onChange={cargaProductos} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Stock:</Form.Label>
            <Form.Control type="text" name="stock" value={nuevoProd.stock} onChange={cargaProductos} />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Categoría:</Form.Label>
            <Form.Select name="category_id" value={nuevoProd.category_id} onChange={cargaProductos}>
              <option value="">Seleccionar categoría</option>
              <option value="MLA413596">Telas</option>
              <option value="MLA95393">Lanas</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>URL del Thumbnail:</Form.Label>
            <Form.Control type="text" name="thumbnail" value={nuevoProd.thumbnail} onChange={cargaProductos} />
          </Form.Group>
        </Row>

        <Button variant="primary" onClick={agregarProducto}>Agregar Producto</Button>
      </Form>

      <div className="listaProductos">
        <h2 className="text-center">Listado de Productos</h2>
        <ul className="list-group">
          {productos.map((producto) => (
            <li key={producto.id} className="list-group-item">{producto.title} - {producto.price} - Stock: {producto.stock}</li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

export default CargaProd
