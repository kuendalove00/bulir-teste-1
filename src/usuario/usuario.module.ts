import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AutenticacaoService } from 'src/autenticacao/autenticacao.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService, AutenticacaoService, JwtService],
})
export class UsuarioModule {}
