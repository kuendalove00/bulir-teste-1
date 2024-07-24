import { UsuarioService } from 'src/usuario/usuario.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ServicoService } from './servico.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';

@Controller('servico')
export class ServicoController {
  constructor(
    private readonly servicoService: ServicoService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post()
  async salvar(@Body() createServicoDto: CreateServicoDto) {
    const usuario = await this.usuarioService.consultarPorId(
      createServicoDto.prestadorId,
    );

    if (usuario.tipo !== 'PRESTADOR') {
      throw new ForbiddenException('Apenas prestadores podem criar serviços.');
    }

    return this.servicoService.salvar(createServicoDto);
  }

  @Get()
  listar() {
    return this.servicoService.listar();
  }

  @Get(':id')
  consultarPorId(@Param('id') id: string) {
    return this.servicoService.consultarPorId(+id);
  }

  @Patch(':id')
  atualizar(
    @Param('id') id: string,
    @Body() updateServicoDto: UpdateServicoDto,
  ) {
    return this.servicoService.atualizar(+id, updateServicoDto);
  }

  @Delete(':id')
  excluir(@Param('id') id: string) {
    return this.servicoService.excluir(+id);
  }
}
