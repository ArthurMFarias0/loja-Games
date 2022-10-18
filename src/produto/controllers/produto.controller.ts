import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";

@Controller('/produtos')

export class ProdutoController {
    constructor (private readonly produtoService: ProdutoService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]> {
        return this.produtoService.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe)
    id: number
    ): Promise<Produto> {
        return this.produtoService.findById(id);
    }

    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK)
    findByDescricao(@Param('descricao')
        descricao: string
    ): Promise<Produto[]> {
        return this.produtoService.findByDescricao(descricao);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    create(
        @Body()
        produto: Produto
    ): Promise<Produto> {
        return this.produtoService.create(produto)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update( 
        @Body()
        produto: Produto
    ): Promise<Produto> {
        return this.produtoService.update(produto)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete (@Param('id',ParseIntPipe)
        id: number
    )  {
        return this.produtoService.delete(id)
    }
}