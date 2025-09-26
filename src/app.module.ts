import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ContactModule } from './modules/contact.module';
import { UserModule } from './modules/user.module';
import { User } from './entities/user.entity';
import { MessageModule } from './modules/message.module';
import { Contact } from './entities/contact.entity';
import { Message } from './entities/message.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

    }),
    TypeOrmModule.forFeature([User, Contact, Message]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5433'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: false,
      autoLoadEntities: true,
    }),
    ContactModule,
    MessageModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
