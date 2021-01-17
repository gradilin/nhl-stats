import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [ConfigModule.forRoot({
              isGlobal: true,
            }),
            // using configService to pull values from .env file in order to inject connections string 
            MongooseModule.forRootAsync({ 
              imports: [ConfigModule],
              // configService returns a null unless it is injected
              inject: [ConfigService],
              useFactory : async (configService: ConfigService)  => ({
                uri: configService.get<string>('MONGODB_URI'),
              }),
            }),
            TeamsModule,
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
