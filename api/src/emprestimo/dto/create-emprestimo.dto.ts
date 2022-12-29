import { IsNumber, IsNotEmpty } from "class-validator"

export class CreateEmprestimoDto {
    @IsNumber()
    @IsNotEmpty()
    usuarioId: number

    @IsNumber()
    @IsNotEmpty()
    livroId: number

    
}
