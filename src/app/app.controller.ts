import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app/app.service';
import { Public } from '@/auth/public.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'This action show hallo wold text.' })
  getHello(): string {
    return this.appService.getHello();
  }
}
