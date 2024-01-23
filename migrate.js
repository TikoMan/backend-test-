import { Users, Blogs, Comments } from './models/index.js';

async function main() {
  await Users.sync({ alter: true });
  await Blogs.sync({ alter: true });
  await Comments.sync({ alter: true });

  process.exit(0);
}

main();
