import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {

  const { cerrarSesion} = useAuth()
  return (
   <header className=" py-3 bg-[#265E6D]  ">
     
    <div className=" container mx-auto flex flex-col lg:flex-row justify-between items-center">
    
        <div  >  <img src="../src/img/logo.png" alt="logo" className=' h-14' /></div>


        <h1 className="   flex items-center text-center font-bold text-2xl  ">Administrador de Vehículos 
        </h1>
        
        <nav className='flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0'  >
             
              <Link to="/admin" className="text-white  hover:text-[#F2B62E] text-sm mr-4 uppercase font-bold" > Vehículos</Link>
              <Link to="/admin" className="text-white  hover:text-[#F2B62E] text-sm mr-4 uppercase font-bold" > Clientes</Link>

          <button type="button"  className="text-white  hover:text-[#F2B62E] text-sm mr-4 uppercase font-bold"
          onClick={cerrarSesion}
          > 
          Cerrar Sesión 
          </button>
          
         
    
        </nav>
      </div> 
      </header>

  )
}

export default Header