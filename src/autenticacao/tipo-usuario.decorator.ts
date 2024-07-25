import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TipoUsuario = createParamDecorator(
  (data: unknown, contexto: ExecutionContext) => {
    const pedido = contexto.switchToHttp().getRequest();
    return pedido.usuario?.tipo;
  },
);
