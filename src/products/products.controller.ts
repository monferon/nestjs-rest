import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
  Redirect,
  HttpCode,
  HttpStatus,
  Header,
  Res,
  Req,
} from '@nestjs/common';
import { from } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response, Request } from 'express';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  //   @Get()
  //   @Redirect('https://google.com', 301)
  //   getAll(@Req() req, @Res() res): string {
  //     res.status(201).end('Poke');
  //     return 'getAll';
  //   }

  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }
}
