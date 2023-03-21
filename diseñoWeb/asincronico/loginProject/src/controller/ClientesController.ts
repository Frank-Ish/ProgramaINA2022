import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Clientes } from '../entity/clientes';


class ClientesController {

    //Metodo que trae todos los clientes activos
    static getAll = async(req : Request, res : Response) =>{

        //intancia de un repositorio de clientes
        const repo = AppDataSource.getRepository(Clientes)

        const lista = await repo.find({where: {estado:true}});

        if(lista.length > 0){
           return res.status(200).json(lista);
        }else {
            return res.status(401).json({message: 'No hay datos'});
        }
    }

    static getById = async(req : Request, res : Response) =>{

        //intancia de un repositorio de productos
        const repo = AppDataSource.getRepository(Clientes)

        const cedula = parseInt(req.params['cedula']);

        if(!cedula){
            return res.status(401).json({message: 'No se indico la cedula'});
        }

        try {
            const cliente = await repo.findOneOrFail({where: {cedula, estado: true}});
            return res.status(200).json(cliente);
        }
        catch (error){
            return res.status(401).json({message: 'No se encontro el cliente con la cedula indicada'});
        }
        
    }

    static  deleteClient = async (req: Request, res: Response) => {

        const repo = AppDataSource.getRepository(Clientes);
        const cedula = parseInt(req.params['cedula']);

        let cliente: Clientes;

        try {
            cliente = await repo.findOneOrFail({ where: { cedula, estado: true } })
            } catch (error) {
            return res.status(400).json({ message: 'no se encontro con el id' })
    
            }
            // se cambia el valor a falso para una eliminacion logica
            cliente.estado = false;
            await repo.save(cliente);//se guarda el cambion con .save
            // reyorna un mesaje que se logro la eliminacion del producto
            return res.status(200).json({ message: 'El producto se ha eliminado' })
    }
    
     static createClient = async (req: Request, res: Response) => {

        //El console.log nos ayuda por medio de postman a ver los datos del body
        console.log(req);

        //Instanciamos una variable tipo productos
        const repo = AppDataSource.getRepository(Clientes)

        //Destructuramos el request.
        const {cedula, nombre, primerApellido, segundoApellido, email, fechaNacimiento } = req.body;

        //Validar los datos de entrada que vienen en el cuerpo
        if(!cedula){
            return res.status(400).json({message: 'Falta el ID'})
        }else if(!nombre){
            return res.status(400).json({message: 'Falta el nombre'})
        }else if(!primerApellido){
            return res.status(400).json({message: 'Falta el primer apellido'})
        }else if(!segundoApellido){
            return res.status(400).json({message: 'Falta el segundo apellido'})
        }else if(!email){
            return res.status(400).json({message: 'Falta el correo electronico'})
        }else if(!fechaNacimiento){
            return res.status(400).json({message: 'Falta la fecha de nacimiento'})
        }

        /*_Regla de negocio, validar que el producto no exista en la base de datos
            1.Busqueda a la base de datos por id.
            2.Valida por medio de if que si ya existe en la base de datos
        */
        if(await repo.findOne({where:{cedula}})){
            return res.status(200).json({message: 'Ya existe un cliente con este numero de cedula'})
        }
        
        //Creamos el producto
        let cliente = new Clientes();
        cliente.cedula = cedula;
        cliente.nombre = nombre;
        cliente.primerApellido = primerApellido;
        cliente.segundoApellido = segundoApellido;
        cliente.email = email;
        cliente.fechaNacimiento = fechaNacimiento;
        cliente.estado = true;

        await repo.save(cliente);
        return res.status(200).json({message: 'Estoye en create'})
    }

    static update = async (req: Request, res: Response) => {
        const clientesRepo = AppDataSource.getRepository(Clientes);
        const id = parseInt(req.params['id']);
        // console.log(id)
        const { cedula, nombre, primerApellido, segundoApellido, email, fechaNacimiento } = req.body;
    
        //Validar los datos de entrada que vienen en el cuerpo
        if(!cedula){
            return res.status(400).json({message: 'Falta el ID'})
        }else if(!nombre){
            return res.status(400).json({message: 'Falta el nombre'})
        }else if(!primerApellido){
            return res.status(400).json({message: 'Falta el primer apellido'})
        }else if(!segundoApellido){
            return res.status(400).json({message: 'Falta el segundo apellido'})
        }else if(!email){
            return res.status(400).json({message: 'Falta el correo electronico'})
        }else if(!fechaNacimiento){
            return res.status(400).json({message: 'Falta la fecha de nacimiento'})
        }
        let cliente: Clientes
        try {
          cliente = await clientesRepo.findOneOrFail({ where: { id, estado: true } })
        } catch (error) {
          return res.status(400).json({ message: 'no se encontro con el id' })
    
        }
    
        cliente.nombre = nombre;
        cliente.primerApellido = primerApellido;
        cliente.segundoApellido = segundoApellido
        cliente.email = email;
        cliente.fechaNacimiento = fechaNacimiento;

        await clientesRepo.save(cliente);
        return res.status(201).json({ message: 'El producto a sido actualizado' })
    }

}

export default ClientesController;
