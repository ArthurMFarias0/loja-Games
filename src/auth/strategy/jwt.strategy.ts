import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { validate } from "class-validator";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { Any } from "typeorm";
import { jwtConstantes } from "../constants/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor () {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstantes.secret,
        })
    }
        async validate(payload: any) {
            return { userId: payload.sub, username: payload.username}
        }
    }
