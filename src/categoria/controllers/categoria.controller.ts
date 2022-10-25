import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";

@Controller("/categorias")
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Categoria[]> {
    
    return this.categoriaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {

    return this.categoriaService.findById(id);
  }

  @Get('/categorias/:categorias')
  @HttpCode(HttpStatus.OK)
  findBydescricao(@Param('categoria') categoria_nome: string): Promise<Categoria[]> {

    return this.categoriaService.findByDescricao(categoria_nome);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() categoria: Categoria): Promise<Categoria> {

    return this.categoriaService.create(categoria);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() categoria: Categoria): Promise<Categoria> {

    return this.categoriaService.update(categoria);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){

    return this.categoriaService.delete(id);
  }

}