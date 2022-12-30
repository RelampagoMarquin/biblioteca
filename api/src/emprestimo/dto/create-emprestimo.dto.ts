import { IsNumber, IsNotEmpty } from "class-validator"
import { Livro } from "src/livros/entities/livro.entity"
import { Usuario } from "src/usuario/entities/usuario.entity"

export class CreateEmprestimoDto {
    @IsNotEmpty()
    usuario: Usuario

    @IsNumber()
    @IsNotEmpty()
    livroId: number

    livro?: Livro
}
