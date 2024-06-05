import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";
import CanvasMenu from "../CanvasMenuGroup/CanvasMenu/CanvasMenu.tsx"

export const CanvasSidebar = () => {

    const [selected, setSelected] = useState("tools");

    return (
        <div className={'w-64 flex flex-col'}>
            <Tabs
                selectedKey={selected}
                onSelectionChange={setSelected}
                isVertical
            >
                <Tab key={'tools'} title={'Tools'}>
                    <CanvasMenu/>
                </Tab>
                <Tab key={'images'} title={'Images'}>
                    <div className="max-w-inherit">
                            
                    </div>
                </Tab>
                <Tab key={'history'} title={'History'}>
                    <div className="max-w-inherit">
                            
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
