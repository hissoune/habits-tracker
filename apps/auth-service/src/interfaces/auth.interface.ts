
import { User } from "../schemas/user.schema";

export interface AuthInterface {
    register(user: User): Promise<User>;

    getUsersByIds(ids:string[]): Promise<User[]>
    getUserById(userId:string): Promise<User>
    login(user: User): Promise<{ token: string }>;
    getUsers(id: string): Promise<Partial<User>[]>
    forgotPassword(email: string): Promise<{ email: string }>;

    resetPassword(resetToken: string, newPassword: string): Promise<{ message: string }>;
}
