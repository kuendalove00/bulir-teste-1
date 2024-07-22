import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ServicoModule } from './servico/servico.module';
import { TransacaoModule } from './transacao/transacao.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UsuarioModule, ServicoModule, TransacaoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
