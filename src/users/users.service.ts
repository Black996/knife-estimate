import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    private async findUserByIdThenApplyCb<T>(id: number, cb?: (user?: User) => Promise<T>): Promise<T | User> {
        const user = await this.repo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`no such user`);
        } else {
            return cb ? cb(user): user;
        }
    }

    create(userData: { username: string; email: string; password: string }) {
        const user = this.repo.create(userData);
        return this.repo.save(user);
    }

    findOneById(id: number) {
        return this.findUserByIdThenApplyCb<User>(id);
    }

    async findOneByEmail(email: string) {
        if(!email) throw new NotFoundException('Please provide an email to search for!');
        return this.repo.findOneBy({ email });
    }

    async update(id: number, attrs: Partial<User>) {
        return this.findUserByIdThenApplyCb<UpdateResult>(id, (user) => {
            Object.assign(user, attrs);
            return this.repo.update(id,user);
        })
    }

    remove(id: number) {
        return this.findUserByIdThenApplyCb(id,(user)=>this.repo.remove(user));
    }
}
