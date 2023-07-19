import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

type Props = {
     children: ReactNode;
};

export default function Protected({ children }: Props) {
     const { data: session } = useSession();
     if (!session) {
          redirect('/');
     }

     return <>{children}</>;
}
