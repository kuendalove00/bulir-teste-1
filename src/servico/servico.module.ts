import { Module } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioService } from 'src/usuario/usuario.service';

@Module({
  controllers: [ServicoController],
  providers: [ServicoService, PrismaService, UsuarioService],
})
export class ServicoModule {}
