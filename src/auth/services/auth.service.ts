import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "src/usuario/services/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";
import { UserLogin } from "../entities/userlogin.entity";

@Injectable()
export class AuthService {
    constructor (
        private usuarioService: UsuarioService,
        private jwService: JwtService,
        private bcrypt: Bcrypt
    ) {}

    async validateUser (username: string, password: string): Promise<any> {
        const buscaUsuario = await this.usuarioService.findByUsuario(username);

        if(!buscaUsuario)
            throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)

        const match = await this.bcrypt.compararSenhas(buscaUsuario.senha, password)

        if(buscaUsuario && match) {
            const { senha, ...result } = buscaUsuario
            return result
        }

        return null
    }

    async login (usuarioLogin: UserLogin) {
        const payload = {
            username: usuarioLogin.usuario,
            sub: 'lojagames'
        }

        return {
            usuario: usuarioLogin.usuario,
            token: `Bearer ${this.jwService.sign(payload)}`
        }
    }
}