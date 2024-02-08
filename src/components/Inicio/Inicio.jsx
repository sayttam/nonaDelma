import 'bootstrap/dist/css/bootstrap.min.css'

const Inicio = ({ user })=> {
    return <>
    
    <h1>Bienvenido</h1>
    {user && (
             <h2>{user.nombre} {user.apellido}</h2>
            )}
    </>
}

export default Inicio