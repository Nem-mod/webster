import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface Props {
    selectedElements: any
    handleUpdate: any
}

export const EditColor = ({ selectedElements, handleUpdate } : Props) => {

    const [color, setColor] = useState<string>('#aabbcc');
	const [colorTimeout, setColorTimeout] = useState<number>();

    const handleChangeColor = (value: string) => {
		setColor(value);
		if (colorTimeout) {
			clearTimeout(colorTimeout);
		}

		const timeoutId = setTimeout(() => {
			handleUpdate({
				fill: value,
			});
		}, 500);
		setColorTimeout(timeoutId);
	};

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <div className={'flex'}>
                        <div className={'m-auto rounded h-8 w-8 flex'}>
                            {selectedElements
                                .filter((element) => element.fill)
                                .map((element, index, array) => {
                                    const flexBasis = 100 / array.length;
                                    return (
                                        <div
                                            key={element.index}
                                            style={{
                                                backgroundColor: `${element.fill}`,
                                                flexBasis: `${flexBasis}%`,
                                            }}
                                        ></div>
                                    );
                                })}
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <HexColorPicker color={color} onChange={handleChangeColor} />
                </PopoverContent>
            </Popover>
        </>
    )
}
