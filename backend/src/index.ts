import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
// DB Connection and server listener
const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `DB connection successful, server now running on PORT:${PORT}`
      );
    });
  })
  .catch((err) => console.log(err));
