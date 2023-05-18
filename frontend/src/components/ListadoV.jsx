import VehiculosContext from "../context/VehiculosProvider";
import useVehiculos from "../hooks/useVehiculos"  // para sacar datos del state 
import Vehiculo from "./Vehiculo";

const ListadoV = () => {
  const { vehiculos } = useVehiculos();

  return (
    <>
      <h1 className="text-lg text-center mb-5 font-bold">Vehículos Registrados</h1>
      <div className="flex flex-col mt-4 mx-5 ">
    <div className="py-2 overflow-x-auto mt-5">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
      <table  className="min-w-full bg-white">
        <thead className="bg-gray-100 ">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Marca</th>
            <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Placa</th>
            <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Año</th>
            <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Color</th>
            <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Puestos</th>
            <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Precio</th>
            <th className="px-6 py-3 border-b border-gray-200  text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className='text-center '>
          {vehiculos.map((vehiculo) => (
            <Vehiculo key={vehiculo._id} vehiculo={vehiculo} />
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
    </>
  );
};


export default ListadoV

