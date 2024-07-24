import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AutenticacaoService } from 'src/autenticacao/autenticacao.service';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly autenticacaoService: AutenticacaoService,
  ) {}

  @Post('registar')
  salvar(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.salvar(createUsuarioDto);
  }

  @Post('login')
  async login(@Body() credenciais: { email: string; senha: string }) {
    const validado = await this.autenticacaoService.validarUsuario(
      credenciais.email,
      credenciais.senha,
    );

    if (!validado) {
      throw UnauthorizedException;
    }

    return this.autenticacaoService.login(validado);
  }

  @Get()
  listar() {
    return this.usuarioService.listar();
  }

  @Get(':id')
  consultarPorId(@Param('id') id: string) {
    return this.usuarioService.consultarPorId(+id);
  }

  @Get()
  consultarPorEmail(@Query('email') email: string) {
    return this.usuarioService.consultarPorEmail(email);
  }

  @Get()
  consultarPorNif(@Query('nif') nif: string) {
    return this.usuarioService.consultarPorNif(nif);
  }

  @Patch(':id')
  atualizarDados(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.atualizarDados(+id, updateUsuarioDto);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() saldo: number) {
    return this.usuarioService.atualizarSaldo(+id, saldo);
  }

  @Delete(':id')
  excluir(@Param('id') id: string) {
    return this.usuarioService.excluir(+id);
  }
}
