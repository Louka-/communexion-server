import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "src/entities/contact.entity";
import { Repository } from "typeorm";

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) { }

  async create(contact: any): Promise<Contact[]> {
    const newContact = this.contactRepository.create(contact);
    await this.contactRepository.save(newContact);
    return newContact;
  }

  async update(id: number, contact: any) {
    return this.contactRepository.update(id, contact);
  }

  async delete(id: number) {
    return this.contactRepository.delete(id);
  }

    async findAll(): Promise<Contact[]> {
    return await this.contactRepository.find();
  }
}