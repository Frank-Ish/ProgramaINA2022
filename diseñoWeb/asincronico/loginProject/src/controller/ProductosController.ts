import { Request, Response } from 'express';
import { Productos } from '../entity/productos';
import { AppDataSource } from '../data-source';

class ProductController {

    static get = async(req : Request, res : Response) =>{
        //intancia de un repositorio de productos
        const repo = AppDataSource.getRepository(Productos)

        const lista = await repo.find({where: {estado:true}});

        if(lista.length > 0){
           return res.status(200).json(lista);
        }else {
            return res.status(401).json({message: 'No hay datos'});
        }
    }

    static getById = async(req : Request, res : Response) =>{

        //intancia de un repositorio de productos
        const repo = AppDataSource.getRepository(Productos)

        const id = parseInt(req.params['id']);

        if(!id){
            return res.status(401).json({message: 'No se indico id'});
        }

        try {
            const producto = await repo.findOneOrFail({where: {id, estado: true}});
            return res.status(200).json(producto);
        }
        catch (error){
            return res.status(401).json({message: 'No se encontro el producto con el id indicado'});
        }
        
    }

    static delete = async(req : Request, res : Response) =>{
        //intancia de un repositorio de productos
        const repo = AppDataSource.getRepository(Productos)

        const id = parseInt(req.params['id']);

        let producto : Productos;


        try {
            producto = await repo.findOneOrFail({where: {id}});
        }
        catch (error){
            return res.status(401).json({message: 'No se encontro el producto con el id indicado'});
        }

        producto.estado = false;

        await repo.save(producto);

        return res.status(200).json({message: 'El producto fue eliminado'})
    }

      // Eliminacion logica del producto
    static deleteById = async (req: Request, res: Response) => {
        
        const productosRepo = AppDataSource.getRepository(Productos);

        const id = parseInt(req.params['id']);
        let producto: Productos; 
        try {
        producto = await productosRepo.findOneOrFail({ where: { id, estado: true } })
        } catch (error) {
        return res.status(400).json({ message: 'no se encontro con el id' })

        }
        // se cambia el valor a falso para una eliminacion logica
        producto.estado = false;
        await productosRepo.save(producto);//se guarda el cambion con .save
        // reyorna un mesaje que se logro la eliminacion del producto
        return res.status(200).json({ message: 'El producto se ha eliminado' })
    }

    static create = async (req: Request, res: Response) => {

        //El console.log nos ayuda por medio de postman a ver los datos del body
        console.log(req);

        //Instanciamos una variable tipo productos
        const repo = AppDataSource.getRepository(Productos)

        //Destructuramos el request.
        const {id, nombre, idCategoria, precio } = req.body;

        //Validar los datos de entrada que vienen en el cuerpo
        if(!id){
            return res.status(400).json({message: 'Falta el ID'})
        }else if(!nombre){
            return res.status(400).json({message: 'Falta el nombre'})
        }else if(!idCategoria){
            return res.status(400).json({message: 'Falta la categoria'})
        }else if(!precio){
            return res.status(400).json({message: 'Falta el precio'})
        }
    
        /*_Regla de negocio, validar que el producto no exista en la base de datos
            1.Busqueda a la base de datos por id.
            2.Valida por medio de if que si ya existe en la base de datos
        */
        if(await repo.findOne({where:{id}})){
            return res.status(200).json({message: 'Ya existe un producto con este id'})
        }
        
        //Creamos el producto
        let producto = new Productos();
        producto.id = id;
        producto.nombre = nombre;
        producto.idCategoria =  idCategoria;
        producto.precio = precio;
        producto.estado = true;

        await repo.save(producto);
        return res.status(200).json({message: 'Estoye en create'})
    }

    static update = async (req: Request, res: Response) => {
        const productosRepo = AppDataSource.getRepository(Productos);
        const id = parseInt(req.params['id']);
        // console.log(id)
        const { nombre, idCategoria, precio } = req.body;
    
        if (!id) {
          return res.status(400).json({ mesaage: 'Falta el ID' })
        } else if (!nombre) {
          return res.status(400).json({ mesaage: 'Falta el Nombre' })
        } else if (!idCategoria) {
          return res.status(400).json({ mesaage: 'Falta la Categoria' })
        } else if (!precio) {
          return res.status(400).json({ mesaage: 'Falta el precio' })
        }
    
        let prod: Productos
        try {
          prod = await productosRepo.findOneOrFail({ where: { id, estado: true } })
        } catch (error) {
          return res.status(400).json({ message: 'no se encontro con el id' })
    
        }
    
        prod.nombre = nombre;
        prod.idCategoria = idCategoria;
        prod.precio = precio;
    
        await productosRepo.save(prod);
        return res.status(201).json({ message: 'El producto a sido actualizado' })
    }

}

export default ProductController;