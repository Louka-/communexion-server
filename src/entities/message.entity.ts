import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: number;

  @Column()
  content: string;

  @Column()
  received_at?: Date;

  @Column()
  send_at?: Date;

  @Column()
  user_id?: number;

  @Column()
  contact_id?: number;

  @Column()
  type: string;
}