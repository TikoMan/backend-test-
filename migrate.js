import { Users, Blogs } from './models/index.js';

async function main() {
  await Users.sync({ alter: true });
  await Blogs.sync({ alter: true });

  process.exit(0);
}

main();
