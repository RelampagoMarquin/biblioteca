import { IsNumber, IsString, IsNotEmpty } from "class-validator"
import { Autor } from "src/autor/entities/autor.entity"

export class CreateLivroDto {
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @IsNotEmpty()
    genero: string
    
    @IsNumber()
    quantidade: number
    
    @IsNotEmpty()
    edicao: number
    
    @IsNumber()
    ano: number

    autorId?: number

    autor?: Autor


}
