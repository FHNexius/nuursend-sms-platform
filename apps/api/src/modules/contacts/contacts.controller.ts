import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ImportContactsDto } from './dto/import-contacts.dto';

@Controller('api/v1/contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  async getContacts(@CurrentUser() user: any, @Query() filters: any) {
    // Get user contacts
    // Implementation by Codex
    return this.contactsService.getContacts(user.id, filters);
  }

  @Post()
  async createContact(@CurrentUser() user: any, @Body() dto: CreateContactDto) {
    // Create contact
    // Implementation by Codex
    return this.contactsService.createContact(user.id, dto);
  }

  @Get(':id')
  async getContactById(@CurrentUser() user: any, @Param('id') contactId: string) {
    // Get contact by ID
    // Implementation by Codex
    return this.contactsService.getContactById(user.id, contactId);
  }

  @Put(':id')
  async updateContact(
    @CurrentUser() user: any,
    @Param('id') contactId: string,
    @Body() dto: UpdateContactDto,
  ) {
    // Update contact
    // Implementation by Codex
    return this.contactsService.updateContact(user.id, contactId, dto);
  }

  @Delete(':id')
  async deleteContact(@CurrentUser() user: any, @Param('id') contactId: string) {
    // Delete contact
    // Implementation by Codex
    return this.contactsService.deleteContact(user.id, contactId);
  }

  @Post('import')
  async importContacts(@CurrentUser() user: any, @Body() dto: ImportContactsDto) {
    // Import contacts from CSV
    // Implementation by Codex
    return this.contactsService.importContacts(user.id, dto);
  }
}

