import 'bootstrap/dist/css/bootstrap.min.css'

const Inicio = ({ user })=> {
    document.title = 'Nona Delma - Inicio'
    return <>
    
    <h1>Bienvenido</h1>
    {user && (
             <h2>{user.nombre} {user.apellido}</h2>
            )}
    </>
}

export default Inicio