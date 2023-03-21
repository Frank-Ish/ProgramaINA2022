import { Router } from 'express';
import ProductosController  from '../controller/ProductosController';

const routes = Router();

//Ruta para buscar todos
routes.get('', ProductosController.get);

//Ruta para buscar por id
routes.get('/:id', ProductosController.getById);

//Ruta para para eliminar por id
routes.delete('/:id', ProductosController.delete);

//Ruta para crear un producto
routes.post('/:crete', ProductosController.create);


export default routes;