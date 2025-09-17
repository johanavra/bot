// --- 1. Importación de Módulos ---
// Importamos las librerías que necesitamos.
import express from 'express';
import twilio from 'twilio';
import dotenv from 'dotenv';

// --- 2. Configuración Inicial ---
// Carga las variables de entorno de nuestro archivo .env.
dotenv.config();

// Obtenemos nuestras credenciales de Twilio de forma segura.
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Creamos una aplicación Express.
const app = express();
// Middleware para que Express pueda entender los datos que envía Twilio.
app.use(express.urlencoded({ extended: false }));

// --- 3. La Lógica del Webhook ---
// Creamos una ruta en "/whatsapp" que escuchará las peticiones POST.
// Cada vez que un usuario envíe un mensaje, Twilio hará una petición a esta ruta.
app.post('/whatsapp', (req, res) => {
    
    // Extraemos el mensaje del cuerpo de la petición (req.body).
    const mensajeUsuario = req.body.Body;
    console.log(`Mensaje del usuario: "${mensajeUsuario}"`);

    // Preparamos nuestra respuesta usando el lenguaje de Twilio (TwiML).
    const twiml = new twilio.twiml.MessagingResponse();
    
    // Añadimos un mensaje a nuestra respuesta.
    twiml.message(`¡Hola desde mi bot! 👋 Has dicho: "${mensajeUsuario}"`);

    // Enviamos la respuesta a Twilio.
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

// --- 4. Iniciar el Servidor ---
// Le decimos a nuestra app que se inicie y escuche en el puerto 3000.
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
});