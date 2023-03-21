import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Productos } from './entity/productos';
import { Clientes } from "./entity/clientes";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "login",
    synchronize: true,
    logging: false,
    entities: [User, Productos, Clientes],
    migrations: [],
    subscribers: [],
})
