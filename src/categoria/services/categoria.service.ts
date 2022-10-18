import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

    @Injectable()
    export class CategoriaService {
        constructor(
            @InjectRepository(Categoria)
            private categoriaReporsitory: Repository<Categoria>
        ) {}
        
        async findAll (): Promise<Categoria[]>{
            return await this.categoriaReporsitory.find({
                relations: {
                    produto: true
                }
            })
        }
    
        async findById (id: number): Promise<Categoria> {
            let tema = await this.categoriaReporsitory.findOne({
                where: {
                    id
                },
                relations: {
                    categoria_nome: true
                }
            });
    
            if (!tema)
                throw new HttpException('Tema não encontrado!',HttpStatus.NOT_FOUND)
            return tema;
        }
    
        async findByDescricao (categoria_nome: string): Promise<Categoria[]> {
            return await this.categoriaReporsitory.find({
                where: {
                    categoria_nome: ILike(`%${categoria_nome}%`)
                },
                relations: {
                    categoria_nome: true
                }
            })
        }
    
        async create (categoria: Categoria): Promise<Categoria> {
            return await this.categoriaReporsitory.save(categoria);
        }
    
        async update (categoria: Categoria): Promise<Categoria> {
            let buscaCategoria = await this.findById(categoria.id)
    
            if(!buscaCategoria || !categoria.id)
                throw new HttpException('Categoria não encontrado', HttpStatus.NOT_FOUND)
            return await this.categoriaReporsitory.save(categoria)
        }
    
        async delete (id: number): Promise<DeleteResult>{
            let buscaTema = await this.findById(id)
    
            if(!buscaTema)
                throw new HttpException('Tema não encontrado', HttpStatus.NOT_FOUND)
                
            return await this.categoriaReporsitory.delete(id)
        }
    }
        
    