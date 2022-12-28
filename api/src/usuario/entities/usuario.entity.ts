import { Emprestimo } from "src/emprestimo/entities/emprestimo.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    senha: string

    @OneToMany((type) => Emprestimo, (emprestimo) => emprestimo.usuario)
    emprestimos: Emprestimo[]
}
