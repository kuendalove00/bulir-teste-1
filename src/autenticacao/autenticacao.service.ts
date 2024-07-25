import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AutenticacaoService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(email: string, senha: string): Promise<any> {
    const usuario = await this.usuarioService.consultarPorEmail(email);
    if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
      const { senha, ...resultado } = usuario;
      return resultado;
    }

    return null;
  }

  async login(usuario: any) {
    const payload = {
      email: usuario.email,
      id: usuario.id,
      tipo: usuario.tipo,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),
    };
  }
}
