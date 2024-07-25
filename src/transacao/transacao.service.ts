import { Injectable } from '@nestjs/common';
import { CreateTransacaoDto } from './dto/create-transacao.dto';
import { UpdateTransacaoDto } from './dto/update-transacao.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ServicoService } from 'src/servico/servico.service';

@Injectable()
export class TransacaoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usuarioService: UsuarioService,
    private readonly servicoService: ServicoService,
  ) {}

  async salvar(createTransacaoDto: CreateTransacaoDto) {
    const cliente = await this.usuarioService.consultarPorId(
      createTransacaoDto.usuarioId,
    );
    const servico = await this.servicoService.consultarPorId(
      createTransacaoDto.servicoId,
    );

    if (cliente.saldo < servico.preco) {
      throw new Error('Saldo insuficiente.');
    }

    cliente.saldo -= servico.preco;
    servico.prestador.saldo += servico.preco;

    await this.usuarioService.atualizarSaldo(cliente.id, cliente.saldo);
    await this.usuarioService.atualizarSaldo(
      servico.prestadorId,
      servico.prestador.saldo,
    );

    const transacaoDto = {
      data: new Date(),
      quantia: servico.preco,
      usuarioId: cliente.id,
      servicoId: servico.id,
    };

    await this.prisma.transacao.create({
      data: transacaoDto,
    });
  }

  async listar() {
    const transacoes = await this.prisma.transacao.findMany({
      include: {
        servico: {
          include: {
            prestador: true
          }
        },
        usuario: true,
      },
    });
    return transacoes;
  }

  async consultarPorId(id: number) {
    const transacao = await this.prisma.transacao.findUnique({
      where: {
        id: id,
      },
      include: {
        servico: {
          include: {
            prestador: true
          }
        },
        usuario: true,
      },
    });

    return transacao;
  }

  async consultarPorData(data: Date) {
    const transacao = await this.prisma.transacao.findMany({
      where: {
        data: data,
      },
      include: {
        servico: {
          include: {
            prestador: true
          }
        },
        usuario: true,
      },
    });

    return transacao;
  }
}
