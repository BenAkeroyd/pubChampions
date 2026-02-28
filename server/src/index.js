const http = require("http");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { env } = require("./utils/env");
const { attachSockets } = require("./socket");

const userRoutes = require("./routes/user");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.set("etag", false);

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use("/user", userRoutes);

const server = http.createServer(app);
attachSockets(server);

server.listen(env.PORT, () => {
  console.log(`API running on http://localhost:${env.PORT}`);
});