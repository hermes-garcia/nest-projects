import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column('float', {
    default: 0,
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  sizes: string[];

  @Column('text')
  gender: string;

  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  //TODO images

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
