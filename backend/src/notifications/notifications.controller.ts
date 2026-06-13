import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import type { AuthRequest } from 'src/types/auth-request.interface';

@ApiTags('notifications')
@UseGuards(JwtGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notifService: NotificationsService) {}

  @ApiOperation({ summary: 'Get all notifications for current user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'List of notifications' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  async getAll(@Request() req: AuthRequest) {
    return await this.notifService.getAll(req.user.id);
  }

  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':id')
  async markAsRead(@Param('id') id: string) {
    return await this.notifService.markAsRead(id);
  }

  @ApiOperation({ summary: 'Delete notification' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Notification deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.notifService.delete(id);
  }
}
