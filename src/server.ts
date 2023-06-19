import mongoose from 'mongoose';
import Config from './Config/index';
import app from './app';
import { Server } from 'http';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(Config.database_url as string);
    console.log(`Database is connected successfully`);

    server = app.listen(Config.port, () => {
      console.log(`Application listening on port ${Config.port}`);
    });
  } catch (err) {
    console.log('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  console.log('SIGTERM is recived');
  if (server) {
    server.close();
  }
});
