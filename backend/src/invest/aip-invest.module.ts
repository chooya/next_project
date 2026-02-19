import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AipInvest } from './aip-invest.entity';
import { AipInvestService } from './aip-invest.service';
import { AipInvestController } from './aip-invest.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AipInvest])],
  controllers: [AipInvestController],
  providers: [AipInvestService],
})
export class AipInvestModule {}
