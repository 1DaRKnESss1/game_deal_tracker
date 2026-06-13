import { Controller } from '@nestjs/common';
import { PriceTrackingService } from './price-tracking.service';

@Controller('price-tracking')
export class PriceTrackingController {
  constructor(private readonly priceTrack: PriceTrackingService) {}
}
