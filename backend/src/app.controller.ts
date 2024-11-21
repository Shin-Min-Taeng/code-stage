import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {hello} from "shared";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log(hello);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
