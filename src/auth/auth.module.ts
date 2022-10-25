import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsuarioModule } from "src/usuario/usuario.module";
import { Bcrypt } from "./bcrypt/bcrypt";
import { jwtConstantes } from "./constants/constants";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
    imports:[UsuarioModule, PassportModule, JwtModule.register({
        secret: jwtConstantes.secret,
        signOptions: { expiresIn: '24'}
        })
    ],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt]
})
export class AuthModule {}