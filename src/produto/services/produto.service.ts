import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

    @Injectable()
    export class ProdutoService {
        delete(id: number) {
            throw new Error("Method not implemented.");
        }
        update(produto: Produto): Promise<Produto> {
            throw new Error("Method not implemented.");
        }
        create(produto: Produto): Promise<Produto> {
            throw new Error("Method not implemented.");
        }
        constructor (
            @InjectRepository(Produto)
            private produtoReporsitory: Repository<Produto>,
    ) {}

    async findAll (): Promise<Produto[]> {
        return await this.produtoReporsitory.find({

        })
    }

    async findById (id:number): Promise<Produto> {
        let produto = await this.produtoReporsitory.findOne({
            where:{
                id
            }
        });

        if (!produto)
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND)
        return produto
    }

    async findByDescricao (descricao: string): Promise<Produto[]> {
        return await this.produtoReporsitory.find({
            where: {
                descricao_produto: ILike(`%${descricao}%`)
            }
        })
    }
    }