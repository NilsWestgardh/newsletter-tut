import { useState } from 'react';
import { Email, EmailStatusArray } from '../types';

export const useEmails = () => {
    const [email, setEmail] = useState<Email>({
        title: 'A new email',
        content: '',
        status: EmailStatusArray[0],
    });

    return {
        email,
        setEmail
    }
};