//Email con información para que pueda resetear el password y cambiarlo 
import nodemailer from "nodemailer"

const emailOlvidePassword =  async (datos) =>{
    const transport = nodemailer.createTransport({
        host:  process.env.EMAIL_HOST,
        port:  process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
  
      //Extrayendo datos 
      const {email, nombre, token} = datos;
      //Enviar el email 
      const info = await transport.sendMail({
        // Quien envía el email 
        from: "AAV - Administrador Alquiler de Vehículos",
        //Aquien se le envia el email 
        to:email,
        subject: 'Restablece tu Contraseña ',
        text: 'Restablece tu Contraseña  ',
        html: `<p>Hola: ${nombre}, has solicitado reestablecer tu contraseña.</p>
        
        <p>Sigue el siguente enlace para generar una nueva contraseña:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Contraseña</a>

        <p> Si tu no creaste esta cuenta, puedes ignorar este mensaje </p>

        `,
      });

      console.log("Mensaje enviado: %s", info.messageId)

};

export default emailOlvidePassword;
