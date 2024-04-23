import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum UserGender {
  MAN = 'man',
  WOMAN = 'woman',
  NOT_DETERMINED = 'not_determined'
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  uuid: string;

  @Column()
  firstName: string;

  @Column()
  lastName?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone?: string;

  @Column()
  dateOfBirth?: Date;

  @Column({ type: 'enum', enum: UserGender, default: UserGender.NOT_DETERMINED })
  gender?: UserGender;

  @Column()
  country?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
