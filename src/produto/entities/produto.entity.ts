import { IsNotEmpty } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_produtos'})
export class Produto {

    @PrimaryGeneratedColumn()
    id:number;

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    nome: string

    @IsNotEmpty()
    @Column({length:20, nullable: false})
    preco: string

    @IsNotEmpty()
    @Column({length:1000, nullable:false})
    descricao_produto: string

    @ManyToOne(() => Categoria, (categoria) => categoria, {
        onDelete: "CASCADE"
    })
    categoria: Categoria

    @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
        onDelete: "CASCADE"
    })
    usuario: Usuario
} 