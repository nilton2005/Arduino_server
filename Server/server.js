const WebSocket = require('ws');
const mongoose = require('mongoose');

// Conectar a MongoDB
const mongoURI = 'mongodb+srv://techunter_user:techunter_pass@clustertechunters.h523d.mongodb.net/ClusterTecHUnters?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Esquema y modelo de MongoDB
const rfidSchema = new mongoose.Schema({
  value: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
const RFID = mongoose.model('RFID', rfidSchema);

// Configurar WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });
let esp32Socket = null;

wss.on('connection', (ws) => {
  console.log('Nuevo cliente conectado.');

  ws.on('message', async (message) => {
    message = String(message).trim();
    console.log('Mensaje recibido:', message);

    // Identificar al ESP32
    if (message === 'ESP32') {
      esp32Socket = ws;
      console.log('ESP32 identificado y conectado.');
      // return;
    }else if(message.startsWith('LED')){
      const [led, estado] = message.split(':');
      console.log(`EStado del LED es ${led} : ${estado}`)
    }else if(message === 'TOGGLE_CONTROL' && esp32Socket);

    // Procesar mensaje recibido
    // try {
    //   const data = JSON.parse(message);

    //   // Validar datos
    //   if (!data.id_esp32 || !data.rfid) {
    //     console.warn('Datos incompletos recibidos.');
    //     ws.send(JSON.stringify({ error: 'Datos incompletos.' }));
    //     return;
    //   }


    //   // Guardar en MongoDB
    //   const nuevaRfid = new RFID({ value: data.rfid });
    //   await nuevaRfid.save();
    //   console.log('RFID guardado en la base de datos:', data.rfid);

    //   // Enviar respuesta al ESP32
    //   ws.send(JSON.stringify({ rfid: data.rfid }));
    // } catch (error) {
    //   console.error('Error procesando mensaje:', error);
    //   ws.send(JSON.stringify({ error: 'Error interno del servidor.' }));
    // }
  });

  ws.on('close', () => {
    console.log('Cliente desconectado.');
    if (ws === esp32Socket) {
      esp32Socket = null;
      console.log('ESP32 desconectado.');
    }
  });
});

console.log('Servidor WebSocket corriendo en el puerto 8080.');

