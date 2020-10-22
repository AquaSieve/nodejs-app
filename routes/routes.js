import indexRouter from "./index";
import usersRouter from "./users";

const routes = (app) => {
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
};

export default routes;
