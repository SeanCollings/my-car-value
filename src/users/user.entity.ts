import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// To create an Entity
// 1) Create Entity like below - e.g. User
// 2) Import it in Module at same level e.g.  imports: [TypeOrmModule.forFeature([User])],
// 3) Import it in AppModule file e.g. imports: [TypeOrmModule.forRoot({ entities: [User]}),

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
