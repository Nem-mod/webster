import { Input } from '@nextui-org/input';
import { UseFormRegister } from 'react-hook-form';

interface Props {
    type: string;
    placeHolder?: string;
    errorMessage?: string;
    className?: string;
    register: UseFormRegister<any>;
    rules?: object;
    name: string;
    [x: string]: any;
}

function InputFormText({
    type,
    placeholder,
    register,
    name,
    rules,
    errorMessage,
    ...props
}: Props) {return (
        <Input
            {...(register && register(name, rules))}
            isRequired
            type={type}
            placeholder={placeholder}
            isInvalid={Boolean(errorMessage)}
            errorMessage={errorMessage}
            size={'lg'}
            radius={'sm'}
            variant={'flat'}
            {...props}
            classNames={{
              base: ['mb-2'],
                input: [
                    'text-black',
                ],
                label: ['text-secondary-dark'],
                mainWrapper: [
                    'hover:bg-primary/40 mb-20'
                ],
              helperWrapper: [
                'absolute pt-16'
              ]
            }}
        />
    );
}

export default InputFormText;