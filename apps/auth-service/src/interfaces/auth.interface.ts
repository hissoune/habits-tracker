
import { User } from "../schemas/user.schema";

export interface AuthInterface {
    register(user: User): Promise<User>;

    login(user: User): Promise<{ token: string }>;

    forgotPassword(email: string): Promise<{ email: string }>;

    resetPassword(resetToken: string, newPassword: string): Promise<{ message: string }>;
}
