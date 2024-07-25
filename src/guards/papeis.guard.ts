import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PapeisGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    const usuario = request.usuario;

    if (!usuario) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }

    if (usuario.tipo !== 'PRESTADOR') {
      throw new UnauthorizedException(
        'Apenas prestadores podem criar serviços.',
      );
    }
    
    return true;
  }
}
