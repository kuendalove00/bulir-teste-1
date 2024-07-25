import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard() {
  handleRequest(err: any, usuario: any, info: any) {
    if (err || !usuario) {
      throw err || new UnauthorizedException();
    }
    return usuario;
  }
}
