import { authService } from '@/server/features/auth';
import { type UpdateUserRequest } from '@/server/features/user/user.model';
import { type UserRole } from '@prisma/client';
import { type NextAuthConfig } from 'next-auth';

export const callbacks: NextAuthConfig['callbacks'] = {
    jwt: async ({ token, account, profile, user }) => {
        if (account?.provider === 'credentials') {
            token.email = user.email;
            token.name = user.name;
            token.role = user.role;
            token.image = user.image;
            token.token = user.token;
        }

        if (account?.provider === 'google') {
            const payload = {
                name: user?.name,
                email: user?.email,
                provider: 'google',
                image: user?.image,
            };

            const response = await authService.loginWithGoogle(
                payload as UpdateUserRequest,
            );

            if (response) {
                token.email = response.email;
                token.name = response.name;
                token.role = response.role;
                token.image = response.image;
                token.token = response.token;
            }
        }

        return token;
    },
    session: async ({ session, token }) => {
        if (
            'email' in token &&
            'name' in token &&
            'role' in token &&
            'token' in token
        ) {
            session.user.email = token.email!;
            session.user.name = token.name;
            session.user.role = token.role as UserRole;
            session.user.token = token.token as string;

            if ('image' in token && token.image) {
                session.user.image = token.image as string;
            }
        }

        return {
            ...session,
            user: {
                ...session.user,
                id: token.sub,
            },
        };
    },
};
