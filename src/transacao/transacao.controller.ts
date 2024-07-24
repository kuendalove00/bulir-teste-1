import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { CreateTransacaoDto } from './dto/create-transacao.dto';


@Controller('transacao')
export class TransacaoController {
  constructor(private readonly transacaoService: TransacaoService) {}

  @Post('contratar')
  async contratar(@Body() createTransacaoDto: CreateTransacaoDto) {
    return this.transacaoService.salvar(createTransacaoDto);
  }

  @Get()
  listar() {
    return this.transacaoService.listar();
  }

  @Get(':id')
  consultarPorId(@Param('id') id: string) {
    return this.transacaoService.consultarPorId(+id);
  }

  @Get()
  consultarPorData(@Query('data') data: Date) {
    return this.transacaoService.consultarPorData(data);
  }
}
