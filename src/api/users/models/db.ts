import {v4 as uuidv4} from "uuid";
import {UserModel} from "./user.model";

export class usersData {
    private users: UserModel[] = [];

    constructor() {
        this.users.push({
            id: uuidv4(),
            username: 'Denis',
            age: '35',
            hobbies: ['JS'],
        })
    }

    addUser(user: Omit<UserModel, 'id'>): UserModel {
        const newUser = {
            id: uuidv4(),
            ...user,
        };

        this.users.push(newUser);

        return newUser;
    }

    getUser(id: string): UserModel | undefined {
        return this.users.find((user) => user.id === id)
    }

    getUsers(): UserModel[] {
        return this.users;
    }

    removeUser(id: string): boolean {
        const user = this.users.find((user) => user.id === id);

        if (!user) return false;

        this.users = this.users.filter((user) => user.id !== id);

        return true;
    }

    updateUser(id: string, data: UserModel): UserModel | undefined {
        const user = this.users.find((user) => user.id === id);

        if (!user) return;

        const newUser = {
            ...user,
            ...data,
        }

        this.users = this.users.map((user: UserModel) => {
            if (user.id === id) {
                user = { ...newUser};
            }

            return user
        })

        return newUser;
    }

}