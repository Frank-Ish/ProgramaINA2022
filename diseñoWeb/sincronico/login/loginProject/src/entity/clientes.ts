import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Clientes {

    @PrimaryGeneratedColumn()
    cedula: number

    @Column()
    nombre: string

    @Column()
    primerApellido: string

    @Column()
    segundoApellido: string

    @Column()
    email: string

    @Column()
    fechaNacimiento: Date

    @Column()
    estado: boolean

}