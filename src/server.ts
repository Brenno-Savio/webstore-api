import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log();
  console.log(`Listening on ${port}`);
  console.log(`CTRL + Click on http://localhost:${port} to connect`);
});
