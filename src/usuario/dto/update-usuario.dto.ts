import { Tipo } from '@prisma/client';

export class UpdateUsuarioDto {
  nome_completo: string;
  nif: string;
  email: string;
  senha: string;
  tipo: Tipo;
}
