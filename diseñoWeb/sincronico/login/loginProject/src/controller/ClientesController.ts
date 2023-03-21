import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Clientes } from '../entity/clientes'


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

        let clientToRemove = await this.clienteRepository.findOneBy({ cedula })

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
    static clienteRepository: any;

}

export default ClientesController;
