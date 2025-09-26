import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "src/entities/message.entity";
import { Repository } from "typeorm";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) { }

  async create(message: any): Promise<Message[]> {
    const newContact = this.messageRepository.create(message);
    await this.messageRepository.save(newContact);
    return newContact;
  }

  async delete(id: number) {
    return this.messageRepository.delete(id);
  }

    async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }
}