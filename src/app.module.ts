import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import  {typeormConfig} from "./common/config/typOrem.config"
import { UserModule } from './module/user/user.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
