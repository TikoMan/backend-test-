import { Users } from './models/index.js';

async function main() {
  await Users.sync({ alter: true });

  process.exit(0);
}

main();
