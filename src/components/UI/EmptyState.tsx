import { ReactNode } from 'react';

interface EmptyStateProps {
    icon: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
}

const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center sm:py-20">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-2xl text-slate-500">
            {icon}
        </div>
        <h3 className="mt-5 text-lg font-bold text-slate-200">{title}</h3>
        {description && <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">{description}</p>}
        {action && <div className="mt-6">{action}</div>}
    </div>
);

export default EmptyState;
