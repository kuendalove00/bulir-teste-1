import { Tipo } from '@prisma/client';

export class CreateUsuarioDto {
  nome_completo: string;
  nif: string;
  email: string;
  senha: string;
  tipo: Tipo;
  saldo: number;
}
