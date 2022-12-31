import { Emprestimo } from "src/emprestimo/entities/emprestimo.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column({unique: true})
    email: string

    @Column({ select: false })
    senha: string

    @OneToMany((type) => Emprestimo, (emprestimo) => emprestimo.usuario)
    emprestimos: Emprestimo[]
}
