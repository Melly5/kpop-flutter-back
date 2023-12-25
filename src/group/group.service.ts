import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'prisma/prisma.service';
import { log } from 'console';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const groups = await this.prisma.group.findMany({
      select: {
        id:true,
        name:true,
        koreanName:true,
        description:true,
        image:true,
        debut:true,
        reform:true,
        memberAmount: true,
        items: true,
      }
    })
    log("wfrdgsf");
    return groups;
  }

  async deleteByItemId(id){
    const itemId = parseInt(id);
    await this.prisma.cart.deleteMany({
      where: { itemId },
    });
  }

  async createCartItem(props) {
    const itemId = parseInt(props.id);
    const intAmount = parseInt(props.amount);
    log(itemId, intAmount);

    const isExist = await this.prisma.cart.findFirst({
      where: { itemId },
    });

    if (!isExist) {
      await this.prisma.cart.create({
        data: { itemId, amount:intAmount },
      });
    } else {
      await this.prisma.cart.updateMany({
        where: { itemId,},
        data: { amount:intAmount },
      });
    }

    return "success";
  }

  async getCartItems() {
    const items = await this.prisma.cart.findMany({ select: { itemId: true, amount: true } });
    const itemIds = items.map((item) => item.itemId);
  
    const all_items = await this.prisma.item.findMany({
      where: {
        id: {
          in: itemIds,
        },
      },
    });
  
    const all_items_with_amount = all_items.map((item) => {
      const cartItem = items.find((cartItem) => cartItem.itemId === item.id);
      return { ...item, amount: cartItem?.amount || 0 };
    });
  
    return all_items_with_amount;
  }
}