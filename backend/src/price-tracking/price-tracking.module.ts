import { Module } from '@nestjs/common';
import { PriceTrackingController } from './price-tracking.controller';
import { PriceTrackingService } from './price-tracking.service';
import { HttpModule } from '@nestjs/axios';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  controllers: [PriceTrackingController],
  providers: [PriceTrackingService],
  imports: [NotificationsModule, HttpModule],
})
export class PriceTrackingModule {}
