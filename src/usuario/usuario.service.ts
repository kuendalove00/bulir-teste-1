import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async salvar(createUsuarioDto: CreateUsuarioDto) {
    const senhaEncriptada = await bcrypt.hash(createUsuarioDto.senha, 10);
    createUsuarioDto.senha = senhaEncriptada;

    const usuario = await this.prisma.usuario.create({
      data: createUsuarioDto,
    });
    return usuario;
  }

  async listar() {
    const usuarios = await this.prisma.usuario.findMany();
    return usuarios;
  }

  async consultarPorId(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id: id,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`O usuario com o  ${id} não encontrado`);
    }

    return usuario;
  }

  async consultarPorEmail(email: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`O usuario com o  ${email} não encontrado`);
    }

    return usuario
  }

  async consultarPorNif(nif: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        nif: nif,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`O usuario com o  ${nif} não encontrado`);
    }

    const { senha, ...resultado } = usuario;
    return resultado
  }

  async atualizarDados(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.prisma.usuario.update({
      where: {
        id: id,
      },
      data: updateUsuarioDto,
    });

    const { senha, ...resultado } = usuario;
    return resultado
  }

  async atualizarSaldo(id: number, saldo: number) {
    const usuario = await this.prisma.usuario.update({
      where: {
        id: id,
      },
      data: {
        saldo: saldo
      },
    });

    const { senha, ...resultado } = usuario;
    return resultado
  }

  async excluir(id: number) {
    const usuario = await this.prisma.usuario.delete({
      where: {
        id: id,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`O usuario com o  ${id} não encontrado`);
    }

    return usuario;
  }
}
