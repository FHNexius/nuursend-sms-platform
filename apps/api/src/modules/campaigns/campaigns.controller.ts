import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { ScheduleCampaignDto } from './dto/schedule-campaign.dto';

@Controller('api/v1/campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  async getCampaigns(@CurrentUser() user: any, @Query() filters: any) {
    // Get user campaigns
    // Implementation by Codex
    return this.campaignsService.getCampaigns(user.id, filters);
  }

  @Post()
  async createCampaign(@CurrentUser() user: any, @Body() dto: CreateCampaignDto) {
    // Create campaign
    // Implementation by Codex
    return this.campaignsService.createCampaign(user.id, dto);
  }

  @Get(':id')
  async getCampaignById(@CurrentUser() user: any, @Param('id') campaignId: string) {
    // Get campaign by ID
    // Implementation by Codex
    return this.campaignsService.getCampaignById(user.id, campaignId);
  }

  @Put(':id')
  async updateCampaign(
    @CurrentUser() user: any,
    @Param('id') campaignId: string,
    @Body() dto: UpdateCampaignDto,
  ) {
    // Update campaign
    // Implementation by Codex
    return this.campaignsService.updateCampaign(user.id, campaignId, dto);
  }

  @Delete(':id')
  async deleteCampaign(@CurrentUser() user: any, @Param('id') campaignId: string) {
    // Delete campaign
    // Implementation by Codex
    return this.campaignsService.deleteCampaign(user.id, campaignId);
  }

  @Post(':id/schedule')
  async scheduleCampaign(
    @CurrentUser() user: any,
    @Param('id') campaignId: string,
    @Body() dto: ScheduleCampaignDto,
  ) {
    // Schedule campaign
    // Implementation by Codex
    return this.campaignsService.scheduleCampaign(user.id, campaignId, dto);
  }

  @Post(':id/send')
  async sendCampaign(@CurrentUser() user: any, @Param('id') campaignId: string) {
    // Send campaign immediately
    // Implementation by Codex
    return this.campaignsService.sendCampaign(user.id, campaignId);
  }

  @Get(':id/stats')
  async getCampaignStats(@CurrentUser() user: any, @Param('id') campaignId: string) {
    // Get campaign statistics
    // Implementation by Codex
    return this.campaignsService.getCampaignStats(user.id, campaignId);
  }
}

