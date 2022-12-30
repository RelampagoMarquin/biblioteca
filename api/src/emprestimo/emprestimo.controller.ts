import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { EmprestimoService } from './emprestimo.service';
import { AuthGuard } from '@nestjs/passport'
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Controller('emprestimo')
@UseGuards(AuthGuard('jwt'))
export class EmprestimoController {
  constructor(private readonly emprestimoService: EmprestimoService) {}

  @Post('livro/:id')
  create(@Param('id') id, @GetUser() usuario: Usuario) {
    const createEmprestimoDto = new CreateEmprestimoDto()
    createEmprestimoDto.livroId = id
    createEmprestimoDto.usuario = usuario
    return this.emprestimoService.create(createEmprestimoDto);
  }

  @Get()
  findAll() {
    return this.emprestimoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emprestimoService.findOne(+id);
  }

  @Patch(':id')
  updateRetorno(@Param('id') id) {
    return this.emprestimoService.updateReturn(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emprestimoService.remove(+id);
  }
}
