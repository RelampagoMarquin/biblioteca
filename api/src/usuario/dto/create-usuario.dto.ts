import { IsString, IsNotEmpty } from "class-validator"

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    senha: string
}
