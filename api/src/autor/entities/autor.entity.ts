import { Emprestimo } from "src/emprestimo/entities/emprestimo.entity";
import { Livro } from "src/livros/entities/livro.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Autor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @OneToMany((type) => Livro, (livro) => livro.autor)
    livro: Livro[]
}
