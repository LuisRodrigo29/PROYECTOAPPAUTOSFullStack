//Muesta mensajes de error en validación de formularios 
const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600': 'from-blue-400 to-[#82CCF5]'} bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-2`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta

