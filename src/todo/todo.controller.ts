import { Controller, Post, Get, Patch, Delete, Body, Query, Param, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
      return this.todoService.create(createTodoDto);
  }

  @Get('read')
  findAll(@Query('owner') owner: string, @Query('isCompleted') isCompleted: boolean, @Query('page') page: number, @Query('limit') limit: number) {
    return this.todoService.findAll(owner, isCompleted, page, limit);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {  // Use UpdateTodoDto here
      return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
