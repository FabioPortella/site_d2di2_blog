'use server';

import { auth, signIn, signOut } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect';

export async function login(data) {

    try {
        await signIn('credentials', data);
    }
    catch(error) {

    if(isRedirectError(error))
            throw error;

        return 'E-mail e/ou senha inválido(s)';
    }
}