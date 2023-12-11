import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity()
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

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  // 1:n  relaciona con el decorador ManyToOne
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  // N:N va en los dos lados de la relacion aqui en product y en category
  // el decorador JoinTable() es para crear la tabla intermedia y se debe colocar en uno de los dos lados de la relacion
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];
}
