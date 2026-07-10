interface SpinnerProps {
    className?: string;
}

const Spinner = ({ className = '' }: SpinnerProps) => (
    <div
        role="status"
        aria-label="Carregando"
        className={`h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500 ${className}`}
    />
);

export default Spinner;
