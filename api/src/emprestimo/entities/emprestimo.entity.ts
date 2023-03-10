import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Livro } from "src/livros/entities/livro.entity";
@Entity()
export class Emprestimo {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    validade: number

    @CreateDateColumn({ type: 'timestamp' })
    emprestimo: Date

    @Column({ type: 'timestamp', nullable:true })
    retorno: Date

    @ManyToOne((type) => Usuario, (usuario) => usuario.emprestimos)
    usuario: Usuario

    @ManyToOne((type) => Livro, (livro) => livro.emprestimos, {eager: true})
    livro: Livro
} 
