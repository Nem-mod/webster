import { Button, Popover, PopoverContent, PopoverTrigger, Slider } from '@nextui-org/react'
import { useState } from 'react';

interface Props{
    selectedElements: any
    handleUpdate: any
}

export const ImageCrop = ({ selectedElements, handleUpdate } : Props) => {

    const handleCropImage = () => {
		handleUpdate({
			crop: { ...crop },
		});
		console.log(selectedElements);
	};

    const [crop, setCrop] = useState<{
		x: number;
		y: number;
		width: number;
		height: number;
	}>({
		x: 0,
		y: 0,
		width: 0,
		height: 0
	});
	const [zoom, setZoom] = useState(0);

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Button
                        className='bg-transparent/10 h-12 hover:bg-transparent/20 duration-0'
                        size='lg'
                    >
                        Crop image
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className='flex flex-col gap-2'>
                        <Slider
                            label='X'
                            step={1}
                            maxValue={selectedElements[0].imageWidth}
                            minValue={0}
                            value={crop.x}
                            onChange={(value) => {
                                // console.log(selectedElements)
                                setCrop({
                                    ...crop,
                                    x: value as number
                                })
                            }}
                            onChangeEnd={handleCropImage}
                            className='w-[200px]'
                        />
                        <Slider
                            label='Y'
                            step={1}
                            maxValue={selectedElements[0].imageHeight}
                            minValue={0}
                            value={crop.y}
                            onChange={(value) => {
                                setCrop({
                                    ...crop,
                                    y: value as number
                                })
                            }}
                            onChangeEnd={handleCropImage}
                            className='w-[200px]'
                        />
                        <Slider
                            label='Width'
                            step={1}
                            maxValue={selectedElements[0].imageWidth - 1}
                            minValue={1}
                            value={selectedElements[0].imageWidth - crop.width}
                            onChange={(value) => {
                                setCrop({
                                    ...crop,
                                    width: selectedElements[0].imageWidth - (value as number)
                                })
                            }}
                            onChangeEnd={handleCropImage}
                            className='w-[200px]'
                        />
                        <Slider
                            label='Height'
                            step={1}
                            maxValue={selectedElements[0].imageHeight - 1}
                            minValue={1}
                            value={selectedElements[0].imageHeight - crop.height}
                            onChange={(value) => {
                                setCrop({
                                    ...crop,
                                    height: selectedElements[0].imageHeight - (value as number)
                                })
                            }}
                            onChangeEnd={handleCropImage}
                            className='w-[200px]'
                        />
                        <Slider
                            label='Zoom'
                            step={0.1}
                            maxValue={100}
                            minValue={0}
                            value={zoom}
                            onChange={(value) => {
                                const zoomRatio = 1.05;
                                // const oldZoom = zoom;
                                setZoom(value as number)
                                setCrop({
                                    ...crop,
                                    height: selectedElements[0].imageHeight / zoomRatio ** zoom,
                                    width: selectedElements[0].imageWidth / zoomRatio ** zoom,
                                    // x: crop.x + (zoom > oldZoom ? 1 : -1) * (selectedElements[0].imageWidth - selectedElements[0].imageWidth / zoomRatio ** zoom) / 2,
                                    // y: crop.y + (zoom > oldZoom ? 1 : -1) * (selectedElements[0].imageHeight - selectedElements[0].imageHeight / zoomRatio ** zoom) / 2
                                    // x: crop.x / zoomRatio ** zoom,
                                    // y: crop.y / zoomRatio ** zoom
                                })
                            }}
                            onChangeEnd={handleCropImage}
                            className='w-[200px]'
                        />
                        <Button 
                            onClick={() => {
                                setCrop({x: 0, y: 0, width: 0, height: 0})
                                setZoom(1)
                                handleUpdate({crop: null})
                            }}
                        >
                            Disable Crop
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}
