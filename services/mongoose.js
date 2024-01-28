import mongoose from 'mongoose';

const { MONGODB_HOST, MONGODB_PORT, MONGODB_DATABASE } = process.env;

await mongoose.connect(`${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`).then(() => {
  /* eslint-disable no-console */
  console.log('Connected Mongoose');
}).catch((e) => {
  console.log('No Connection', e);
});

const cleanup = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

export default mongoose;
