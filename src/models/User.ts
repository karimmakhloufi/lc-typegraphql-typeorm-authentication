import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    email!: string;

    @Field()
    @Column()
    password!: string;
}

@InputType()
export class UserInput {
    @Field()
    email!: string;

    @Field()
    password!: string;
}