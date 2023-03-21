import { Router } from 'express';
import productos from "./productos";
import clientes from "./clientes";

const routes = Router();

routes.use('/productos', productos);

routes.use('/clientes', clientes);

export default routes;