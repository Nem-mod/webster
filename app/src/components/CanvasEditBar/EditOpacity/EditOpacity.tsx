import { Popover, PopoverTrigger, Button, PopoverContent, Slider } from '@nextui-org/react'
import { useState } from 'react';
import handleUpdate from '../CanvasEditBar'

export const EditOpacity = () => {

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
                    <Button>Opacity</Button>
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
