import { Popover, PopoverTrigger, Button, PopoverContent, Slider } from '@nextui-org/react'
import { useState } from 'react';

interface Props {
    handleUpdate: any
}

export const EditOpacity = ({handleUpdate} : Props) => {

    const [opacity, setOpacity] = useState<number | number[]>(1);


    const handleChangeOpacity = () => {
		handleUpdate({
			opacity: opacity as number,
		});
	};

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Button
                        className='bg-transparent/10 h-12 hover:bg-transparent/20 duration-0'
                        size='lg'
                    >
                        Opacity
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-[240px] py-2'>
                    <div className={''}>
                        <Slider
                            label='Opacity'
                            step={0.01}
                            maxValue={1}
                            minValue={0}
                            value={opacity}
                            onChange={setOpacity}
                            onChangeEnd={handleChangeOpacity}
                            className='w-[200px]'
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}
