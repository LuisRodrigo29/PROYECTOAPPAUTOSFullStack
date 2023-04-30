
//ordenar el routing 
const registrar = (req, res) => {
    res.json({url:"Desde API/USUARIOS"});
};

const perfil = (req, res) =>{
    res.json({url:"Desde API/USUARIOS/perfil"});
};

export {registrar, perfil} //se abren llaves porque va a ser un objeto  donde se pueden exportar multiples funciones
 
