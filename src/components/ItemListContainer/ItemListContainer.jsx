import './ItemListContainer.css'
import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../../services/firebase/firebaseConfig'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { CategoriasContext } from '../../App'
import ItemList from '../ItemList/ItemList'
import { Button } from 'react-bootstrap'


const ItemListContainer = ({ saludo }) => {
  const [productos, setProductos] = useState([])
  const { search, categoria } = useParams()
  const [subCategoria, setSubCategoria] = useState('')
  const { categoriaSeleccionada } = useContext(CategoriasContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [precio, setPrecio] = useState('')
  const categoriaFiltro = categoriaSeleccionada || categoria

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        let productsCollection = collection(db, 'productos-nonadelma')
        if (categoriaSeleccionada || categoria) {
          productsCollection = query(productsCollection, where('category_id', '==', categoriaFiltro))
        } else {
          productsCollection = query(productsCollection)
        }
        const querySnapshot = await getDocs(productsCollection)
        const productsAdapted = querySnapshot.docs.map(doc => {
          const fields = doc.data()
          return { id: doc.id, ...fields }
        })

        setProductos(productsAdapted);
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProductos()
  }, [categoriaSeleccionada])

  const aplicarFiltroCategoria = (categoria) => {
    setSubCategoria(categoria)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filtroPrecio = productos.slice()

  const productosPorPrecio = 
    precio === 'menor'
      ? filtroPrecio.sort((a, b) => a.price - b.price)
      : precio === 'mayor'
        ? filtroPrecio.sort((a, b) => b.price - a.price)
        : productos

  const productosFiltradosCategoria =
    subCategoria === 'telas'
      ? productosPorPrecio.filter((prod) => prod.category_id === 'telas')
      : subCategoria === 'lanas'
        ? productosPorPrecio.filter((prod) => prod.category_id === 'lanas')
        : subCategoria === 'merceria'
          ? productosPorPrecio.filter((prod) => prod.category_id === 'merceria')
          : subCategoria === 'blanqueria'
            ? productosPorPrecio.filter((prod) => prod.category_id === 'blanqueria')
            : productosPorPrecio

  const productosFiltradosBusqueda = productosFiltradosCategoria.filter((prod) => {
    if (searchTerm && searchTerm.trim() !== '') {
      const searchTermLowerCase = searchTerm.toLowerCase()
      return prod.title.toLowerCase().includes(searchTermLowerCase)
    }
    return true
  })

  document.title = 'Nona Delma - Productos'

  if (productos.length === 0) {
    return <p className='cargando'>Cargando...</p>
  }

  return (
    <>
      <div>
        <Link to='/cargaProductos' className='cargaProd'>Carga Productos</Link>
      </div>
      <div className='filtro'>
        <h2>{saludo}</h2>
       {/*  <Link to='/productos' onClick={() => aplicarFiltroCategoria('')} className='filtroCategoria'>Todos</Link>
        <Link to='/productos/categorias/telas' onClick={() => aplicarFiltroCategoria('telas')} className='filtroCategoria'>Telas</Link>
        <Link to='/productos/categorias/lanas' onClick={() => aplicarFiltroCategoria('lanas')} className='filtroCategoria'>Lanas</Link>
        <Link to='/productos/categorias/merceria' onClick={() => aplicarFiltroCategoria('merceria')} className='filtroCategoria'>Merceria</Link>
        <Link to='/productos/categorias/blanqueria' onClick={() => aplicarFiltroCategoria('blanqueria')} className='filtroCategoria'>Blanqueria</Link> */}
        <br />
        <Button className='ordenarPrecio' onClick={() => setPrecio('menor')}>Menor precio</Button>
        <Button className='ordenarPrecio' onClick={() => setPrecio('mayor')}>Mayor precio</Button>
        <div className='buscar'>
          <input type="text" placeholder="Buscar productos..." value={searchTerm} onChange={handleSearchChange} />
        </div>
      </div>
      <ItemList products={productosFiltradosBusqueda} />
    </>
  )
}

export default ItemListContainer