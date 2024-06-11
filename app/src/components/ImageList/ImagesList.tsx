import Masonry from "react-responsive-masonry";
import {useAppDispatch} from "../../hooks/redux.ts";
import {addElement} from "../../redux/slices/canvasSlice/canvas-slice.ts";
import {CanvasElementType} from "../../services/canvas/canvas-element-types.enum.ts";
import {getImageSize} from "react-image-size";
import {image} from "@nextui-org/react";


const images = [
  {
    "_id": "665879350a248043599332f1",
    "url": "https://storage.googleapis.com/webster_images/1b9d9da6-3b45-4452-8cc8-e3c4e5813c41.Screenshot_11.png",
    "user": "6654a04e8fde70df01a68f6b",
    "updatedAt": "2024-05-30T13:04:38.559Z"
  },
  {
    "_id": "665879430a248043599332f6",
    "url": "https://plus.unsplash.com/premium_photo-1689703068047-7a5cc93a8faa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "user": "6654a04e8fde70df01a68f6b",
    "updatedAt": "2024-05-30T13:04:03.353Z"
  },
  {
    "_id": "665748ab792816bde9ceca47",
    "url": "https://storage.googleapis.com/webster_images/a2eab2e4-8064-4050-bb6f-9ffccb1f5ee8.F66a2QrXkAAig-z.jpeg",
    "user": "6654a04e8fde70df01a68f6b",
    "updatedAt": "2024-05-29T16:07:00.752Z"
  },
  {
    "_id": "665746f3792816bde9ceca3f",
    "url": "https://plus.unsplash.com/premium_photo-1689703068047-7a5cc93a8faa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "user": "6654a04e8fde70df01a68f6b",
    "updatedAt": "2024-05-29T15:17:07.826Z"
  },
  {
    "_id": "66574678d8da221610d085e3",
    "url": "https://plus.unsplash.com/premium_photo-1689703068047-7a5cc93a8faa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "user": "6654a04e8fde70df01a68f6b",
    "updatedAt": "2024-05-29T15:15:04.077Z"
  },
  {
    "_id": "665745e22006670f0d0fde3d",
    "url": "https://storage.googleapis.com/webster_images/d0ee0fde-a58d-42ba-a74d-b0a1da433cb7.F66a2QrXkAAig-z.jpeg",
    "user": "6654a04e8fde70df01a68f6b",
    "updatedAt": "2024-05-29T15:12:34.639Z"
  },
  {
    "_id": "665745dc2006670f0d0fde38",
    "url": "https://plus.unsplash.com/premium_photo-1689703068047-7a5cc93a8faa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "user": "6654a04e8fde70df01a68f6b",
    "updatedAt": "2024-05-29T15:12:28.229Z"
  },
  {
    "_id": "665742c6b8c84d93ce0dad3d",
    "url": "https://plus.unsplash.com/premium_photo-1689703068047-7a5cc93a8faa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "user": "6654a04e8fde70df01a68f6b",
    "updatedAt": "2024-05-29T14:59:18.918Z"
  },
  {
    "_id": "6657426f24cfab148da3f7fd",
    "url": "https://plus.unsplash.com/premium_photo-1689703068047-7a5cc93a8faa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "user": "6654a04e8fde70df01a68f6b",
    "updatedAt": "2024-05-29T14:57:51.633Z"
  }
]

interface IProps {
  dimensions: {
    width: number;
    height: number;
  };
}

export default function ImagesList({ dimensions }: IProps) {
  const dispatch = useAppDispatch();

  const handleClick = async (url: string) => {
    const imageSize = await getImageSize(url)

    const scaleX = dimensions.width / imageSize.width;
    const scaleY = dimensions.height / imageSize.height;
    const minScale = Math.min(scaleX, scaleY);

    dispatch(addElement({type: CanvasElementType.IMAGE, src: url, scaleX: minScale, scaleY: minScale}))
  }

  return (
    <div className={'flex'}>
      <Masonry
        // columns={3}
        // gap={16}
        columnsCount={2}
        gutter={5}
      >
        {images.map((image) => {
          return <img src={image.url} key={image._id} onClick={() => {handleClick(image.url)}} />;
        })}
      </Masonry>
    </div>
  )
}