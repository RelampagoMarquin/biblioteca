import { IsString, Matches, MaxLength, MinLength } from "class-validator"

export class Credentials {
    
    @IsString()
    @MinLength(10)
    @MaxLength(120)
    email: string
    
    @IsString()
    @MinLength(8)
    @Matches(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'passaword muito fraco'})
    senha: string
}
