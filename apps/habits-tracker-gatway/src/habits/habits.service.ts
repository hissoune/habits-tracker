import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Habit } from 'apps/types';

@Injectable()
export class HabitsService {
    constructor(@Inject("HABITS_SERVICE") private readonly habitsClient:ClientProxy  ){}


    getAll(userId:any) {
        return this.habitsClient.send('get_all_habits', {userId});
    }

    getOne(id: string) {
        return this.habitsClient.send('get_habit', { id });
    }

    create(data:Habit) {
        
        return this.habitsClient.send('create_habit', data);
    }

    update(id: string, data) {
        return this.habitsClient.send('update_habit', { id, ...data });
    }
    reactiveHabit(id: string){
        return this.habitsClient.send('reactive_habit', { id });

    }

    delete(id: string) {
        return this.habitsClient.send('delete_habit', { id });
    }
}
