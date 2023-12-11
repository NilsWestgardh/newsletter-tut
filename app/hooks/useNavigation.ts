// Reusable hook for Next.js navigation

import { usePathname, useParams, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export const useNavigation = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [active, setActive] = useState<string>('');

    const pathname = usePathname();
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    return {
        pathname,
        params,
        router,
        searchParams
    };
};