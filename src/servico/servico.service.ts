import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServicoService {
  constructor(private prisma: PrismaService) {}

  async salvar(createServicoDto: CreateServicoDto) {
    const servico = await this.prisma.servico.create({
      data: createServicoDto,
    });
    return servico;
  }

  async listar() {
    const servicos = await this.prisma.servico.findMany({
      include: {
        prestador: true
      }
    });
    return servicos;
  }

  async consultarPorId(id: number) {
    const servico = await this.prisma.servico.findUnique({
      where: {
        id: id,
      },
      include: {
        prestador: true
      }
    });

    if (!servico) {
      throw new NotFoundException(`O servico com o  ${id} não encontrado`);
    }

    return servico;
  }

  async atualizar(id: number, updateServicoDto: UpdateServicoDto) {
    const servico = await this.prisma.servico.update({
      where: {
        id: id,
      },
      data: updateServicoDto,
    });
    return servico;
  }

  async excluir(id: number) {
    const servico = await this.prisma.servico.delete({
      where: {
        id: id,
      },
    });
    return servico;
  }
}
