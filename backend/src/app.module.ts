import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AipInvestModule } from './invest/aip-invest.module'; // 생성한 모듈 import
import { AipInvest } from './invest/aip-invest.entity'; // 엔티티 import

@Module({
  imports: [
    // 1. 데이터베이스 연결 설정
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aipeoples.iptime.org',
      port: 5432,
      username: 'chooya',
      password: 'chooya01',
      database: 'aipdb',
      // 엔티티를 자동으로 인식하게 하거나 직접 등록합니다.
      entities: [AipInvest],
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 모든 엔티티 자동 스캔 방식
      synchronize: false, // 이미 있는 테이블을 사용하므로 반드시 false!
      logging: true, // SQL 쿼리가 실행되는 것을 터미널에서 확인하고 싶을 때 true
    }),

    // 2. 투자 관련 모듈 연결
    AipInvestModule,
  ],
})
export class AppModule {}
