import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { CalculatorService } from './calculator/calculator.service';
import { SumService } from './calculator/sum.service';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [HttpModule, MovieModule],
  controllers: [AppController],
  providers: [AppService, CalculatorService, SumService],
})
export class AppModule {}
