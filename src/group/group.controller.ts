import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get('cart')
  getCartItems() {
    return this.groupService.getCartItems();
  }

  @Post('create')
  @HttpCode(200)
  createTest(@Body() body: {id: string, amount:string}) {
    return this.groupService.createCartItem( body);
  }

  @Delete(':id')
  deleteByItemId(@Param('id') id: string,){
    return this.groupService.deleteByItemId(id);
  }
}
