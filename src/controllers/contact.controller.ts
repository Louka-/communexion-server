import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Contact } from 'src/entities/contact.entity';
import { ContactService } from 'src/services/contact.service';

@Controller('contact')
export class ContactController {
  constructor(private contatcService: ContactService) { }

  @Post('create')
  create(
    @Body() contact: any,
  ): Promise<Contact[]> {
    return this.contatcService.create(contact);
  }

  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) id,
    @Body() contact: any
  ) {
    return this.contatcService.update(id, contact);
  }

  @Delete('delete/:id')
  delete(
    @Param('id', ParseIntPipe) id,
  ) {
    console.log(id)
    return this.contatcService.delete(id);
  }

  @Get('findAll')
  getAll(
  ): Promise<Contact[]> {
    return this.contatcService.findAll();
  }
}
