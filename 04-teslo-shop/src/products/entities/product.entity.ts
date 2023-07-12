import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '43b57f31-4379-4c97-b2b4-31e445867e0c',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product Title',
    uniqueItems: true,
  })
  title: string;

  @Column('float', {
    default: 0,
  })
  @ApiProperty({
    example: 0,
    description: 'Product Price',
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  @ApiProperty({
    example: 'Lorem Ipsum',
    description: 'Product description',
    default: null,
  })
  description: string;

  @Column('text', {
    unique: true,
  })
  @ApiProperty({
    example: 't-shirt-teslo',
    description: 'Product SLUG - for SEO',
    uniqueItems: true,
  })
  slug: string;

  @Column('int', {
    default: 0,
  })
  @ApiProperty({
    example: 10,
    description: 'Product stock',
    default: 0,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  @ApiProperty({
    example: ['M', 'XL', 'XXL'],
    description: 'Product sizes',
  })
  sizes: string[];

  @Column('text')
  @ApiProperty({
    example: 'women',
    description: 'Product gender',
  })
  gender: string;

  @Column('text', {
    array: true,
    default: [],
  })
  @ApiProperty({
    example: ['shirt'],
    description: 'Product tags',
  })
  tags: string[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, {
    eager: true,
  })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    //TODO common helper
    this.slug = this.slug
      .normalize('NFD')
      .replace("'", '')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\W_]+/g, '-')
      .toLowerCase()
      .replace(/^-+|-+$/g, '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    //TODO common helper (duplicated
    this.slug = this.slug
      .normalize('NFD')
      .replace("'", '')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\W_]+/g, '-')
      .toLowerCase()
      .replace(/^-+|-+$/g, '');
  }
}
