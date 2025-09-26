import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from 'src/controllers/contact.controller';
import { Contact } from 'src/entities/contact.entity';
import { ContactService } from 'src/services/contact.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
  ],
  providers: [ContactService],
  exports: [ContactService],
  controllers: [ContactController],
})
export class ContactModule { }