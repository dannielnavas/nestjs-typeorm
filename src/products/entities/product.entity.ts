import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity({ name: 'products' })
@Index(['price', 'stock']) // Retorna de forma mas rapide de esta forma se hace con varios campos
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Index() // para crear un indice en la base de datos
  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'update_at',
  })
  updateAt: Date;

  // 1:n  relaciona con el decorador ManyToOne
  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  // N:N va en los dos lados de la relacion aqui en product y en category
  // el decorador JoinTable() es para crear la tabla intermedia y se debe colocar en uno de los dos lados de la relacion
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'products_has_categories', // nombre de la tabla intermedia
    joinColumn: { name: 'product_id' }, // nombre de la columna que hace referencia a la entidad actual
    inverseJoinColumn: { name: 'category_id' }, // nombre de la columna que hace referencia a la entidad con la que se relaciona
  })
  categories: Category[];
}
