import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [MessagesGateway, MessagesService],
  imports: [AuthModule],
})
export class MessagesModule {}
