import './ItemListContainer.css'
import '../ItemList/ItemList'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../../services/firebase/firebaseConfig'
import { collection, getDocs, where, query } from 'firebase/firestore'
import ItemList from '../ItemList/ItemList'

const ItemListContainer = ({ saludo }) => {
  const [productos, setProductos] = useState([])
  const { precio, categoria: categoriaParam } = useParams()
  const [categoria, setCategoria] = useState('')
  const { categoryId, productId } = useParams()

  useEffect(() => {
    const productsCollection = categoryId
      ? query(collection(db, 'productos-nonadelma'), where('category_id', '==', categoryId))
      : collection(db, 'productos-nonadelma')

    getDocs(productsCollection)
      .then(querySnapshot => {
        const productsAdapted = querySnapshot.docs.map(doc => {
          const fields = doc.data()
          return { id: doc.id, ...fields }
        })

        setProductos(productsAdapted)
      })
  }, [precio, categoriaParam, categoryId])

  const aplicarFiltroCategoria = (categoria) => {
    setCategoria(categoria)
  }

  const filtroPrecio = productos.slice()

  const productosPorPrecio =
    precio === 'menor'
      ? filtroPrecio.sort((a, b) => a.price - b.price)
      : precio === 'mayor'
        ? filtroPrecio.sort((a, b) => b.price - a.price)
        : productos

  const productosFiltradosCategoria =
    categoria === 'telas'
      ? productosPorPrecio.filter((prod) => prod.category_id === 'MLA413596')
      : categoria === 'lanas'
      ? productosPorPrecio.filter((prod) => prod.category_id === 'MLA95393')
      : categoria === 'merceria'
      ? productosPorPrecio.filter((prod) => prod.category_id === 'MLA9539354')
      : categoria === 'blanqueria'
      ? productosPorPrecio.filter((prod) => prod.category_id === 'MLA41359')
      : productosPorPrecio

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
        <Link to='/productos' onClick={() => aplicarFiltroCategoria('')} className='filtroCategoria'>Todos</Link>
        <Link to='/productos/telas' onClick={() => aplicarFiltroCategoria('telas')} className='filtroCategoria'>Telas</Link>
        <Link to='/productos/lanas' onClick={() => aplicarFiltroCategoria('lanas')} className='filtroCategoria'>Lanas</Link>
        <Link to='/productos/merceria' onClick={() => aplicarFiltroCategoria('merceria')} className='filtroCategoria'>Merceria</Link>
        <Link to='/productos/blanqueria' onClick={() => aplicarFiltroCategoria('blanqueria')} className='filtroCategoria'>Blanqueria</Link>
        <br />
        <Link to='/productos/menor' className='ordenarPrecio'>Menor precio</Link>
        <Link to='/productos/mayor' className='ordenarPrecio'>Mayor precio</Link>
      </div>
      <ItemList products={productosFiltradosCategoria} />
    </>
  )
}

export default ItemListContainer