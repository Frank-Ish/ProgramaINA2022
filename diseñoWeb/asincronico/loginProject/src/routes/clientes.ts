import { Router } from 'express';
import ClientesController  from '../controller/ClientesController';

const routes = Router();

//Ruta para buscar todos
routes.get('', ClientesController.getAll);

//Ruta para buscar por id
routes.get('/:id', ClientesController.getById);

//Ruta para para eliminar por id
routes.delete('/:id', ClientesController.deleteClient);

//Ruta para crear un producto
routes.post('/:crete', ClientesController.createClient);


export default routes;