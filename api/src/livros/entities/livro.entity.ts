import { Autor } from "src/autor/entities/autor.entity";
import { Emprestimo } from "src/emprestimo/entities/emprestimo.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Livro {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    genero: string

    @Column()
    quantidade: number

    @Column()
    edicao: number

    @Column()
    ano: number

    @OneToMany((type) => Emprestimo, (emprestimo) => emprestimo.livro)
    emprestimos: Emprestimo[]

    @ManyToOne((type) => Autor, (autor) => autor.livro)
    autor: Autor

}
