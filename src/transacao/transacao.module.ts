import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from './transacao.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ServicoService } from 'src/servico/servico.service';

@Module({
  controllers: [TransacaoController],
  providers: [TransacaoService, PrismaService, UsuarioService, ServicoService],
})
export class TransacaoModule {}
