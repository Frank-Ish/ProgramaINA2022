import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Productos {

    @PrimaryColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    idCategoria: number

    @Column()
    precio: number

    @Column()
    estado: boolean
}