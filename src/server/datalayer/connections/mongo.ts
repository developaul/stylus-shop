import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
  isConnected: 0
}

export const connect = async () => {
  if (mongoConnection.isConnected) {
    console.log('Ya estabamos conectados');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
      console.log('Usando conexión anterior');
      return;
    }

    await disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || '');
  mongoConnection.isConnected = 1;
  console.log('Conectado a MongoDB:', process.env.MONGO_URL);
}

export const disconnect = async () => {

  if (['phase-production-build', 'development'.includes(process.env.NEXT_PHASE!)]) return;

  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;

  console.log('Desconectado de MongoDB');
}