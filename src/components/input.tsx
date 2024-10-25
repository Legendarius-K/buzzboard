import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'htmlFor'> & {
    label: string
}

export const Input = forwardRef<HTMLInputElement, Props>(
    (
        {
            label,
            name,
            ...props
        },
        ref,
    ) => {
        return (
            <div className='group relative'>
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
                        'peer-focus-visible:-top-4 peer-focus-visible:left-2 peer-focus-visible:text-sm peer-focus-visible:text-gray-800',
                        'peer-placeholder-shown:left-6 peer-placeholder-shown:top-[7px] bottom-[10px] peer-placeholder-shown:text-lg text-gray-500 peer-placeholder-shown:pointer-events-none',
                    )}
                    htmlFor={name}
                >{label}</label>
            </div>
        );
    }
);
