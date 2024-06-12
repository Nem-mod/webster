export default function CanvasShortcuts() {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <p className="rounded-lg shadow-md p-2 mb-2 text-default-500 bg-gray-200">
                ctr + z - Undo the last action
            </p>
            <p className="rounded-lg shadow-md p-2 mb-2 text-default-500 bg-gray-200">
                ctr + y - Redo the last undone action
            </p>
            <p className="rounded-lg shadow-md p-2 mb-2 text-default-500 bg-gray-200">
                delete - Delete the selected item
            </p>
            <p className="rounded-lg shadow-md p-2 mb-2 text-default-500 bg-gray-200">
                shift + left click - Select multiple items
            </p>
        </div>
    );
};
