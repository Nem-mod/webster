import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useAppDispatch } from "../../../hooks/redux";
import {
	moveElements,
	moveElementsOneStep,
} from '../../../redux/slices/canvasSlice/canvas-slice';

export const EditLayer = () => {

    const dispatch = useAppDispatch();

    const handleMoveMax = (to: boolean) => {
		dispatch(moveElements({ to }));
	};
	const handleMoveOneStep = (to: boolean) => {
		dispatch(moveElementsOneStep({ to }));
	};

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Button>Layers</Button>
                </PopoverTrigger>
                <PopoverContent className={'p-4 flex flex-col items-stretch'}>
                    <Button
                        onClick={() => {
                            handleMoveMax(true);
                        }}
                    >
                        Top Layer
                    </Button>
                    <br />
                    <Button
                        onClick={() => {
                            handleMoveMax(false);
                        }}
                    >
                        Bottom Layer
                    </Button>
                    <br />
                    <Button
                        onClick={() => {
                            handleMoveOneStep(true);
                        }}
                    >
                        Layer Up
                    </Button>
                    <br />
                    <Button
                        onClick={() => {
                            handleMoveOneStep(false);
                        }}
                    >
                        Layer Down
                    </Button>
                </PopoverContent>
            </Popover>
        </>
    )
}
