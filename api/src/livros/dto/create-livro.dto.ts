import { IsNumber, IsString, IsNotEmpty } from "class-validator"

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
}
