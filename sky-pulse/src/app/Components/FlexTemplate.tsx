import { ReactNode } from 'react';

export default function FlexTemplate( { children }: { children: ReactNode }) {
    return (
        <div className="d-flex">
        {children}

        </div>
    )
}