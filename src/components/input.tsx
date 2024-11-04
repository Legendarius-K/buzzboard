import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils';
import { type FieldError } from 'react-hook-form';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'htmlFor'> & {
    label: string
    error?: FieldError
}

export const Input = forwardRef<HTMLInputElement, Props>(
    (
        {
            label,
            name, error,
            ...props
        },
        ref,
    ) => {
        return (
            <div className='group relative flex flex-col'>
                <input ref={ref}
                    {...props}
                    name={name}
                    id={name}
                    className={cn(
                        'peer border-2 rounded-full px-4 py-2 placeholder:text-transparent outline-none min-w-[300px] md:min-w-[350px]'
                    )}
                    placeholder={label} />
                <label
                    className={cn(
                        'absolute -top-4 left-2 transition-all text-sm pointer-events-none',
                        'peer-focus-visible:-top-4 peer-focus-visible:left-2 peer-focus-visible:text-sm peer-focus-visible:text-gray-200',
                        'peer-placeholder-shown:left-6 peer-placeholder-shown:top-[7px] bottom-[10px] peer-placeholder-shown:text-lg text-gray-400 peer-placeholder-shown:pointer-events-none',
                    )}
                    htmlFor={name}
                >{label}</label>
                {error && <span className='ml-3 text-sm text-amber-700'>{error.message}</span>}
            </div>
        );
    }
);
