const generarId = () => { //para que se genere un numero random en el token 
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
};

export default generarId;