import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../todo/schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = new this.todoModel(createTodoDto);
    return newTodo.save();
  }

  async findAll(owner: string, isCompleted: boolean, page: number, limit: number): Promise<Todo[]> {
    const query: any = {};
    if (owner) query.owner = owner;
    if (isCompleted !== undefined) query.isCompleted = isCompleted;
  
    console.log("Finding Todos with query:", query);
  
    return this.todoModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoModel.findByIdAndUpdate(id, updateTodoDto, { new: true });
  }

  async delete(id: string) {
    return this.todoModel.findByIdAndDelete(id);
  }
}
