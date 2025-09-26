import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Message } from 'src/entities/message.entity';
import { MessageService } from 'src/services/message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post('create')
  create(
    @Body() message: any,
  ): Promise<Message[]> {
    return this.messageService.create(message);
  }

  @Get('findAll')
  getAll(
  ): Promise<Message[]> {
    return this.messageService.findAll();
  }
}
