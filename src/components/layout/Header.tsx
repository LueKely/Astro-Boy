import type { PropsWithChildren, ReactNode } from 'react';
import logo from '../../../public/logo.png';
export function Header({ children }: { children: ReactNode }) {
    return (
        <header>
            {children}

            <a href="/about" className="about">
                <p>About</p>
            </a>
        </header>
    );
}
