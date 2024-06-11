import Masonry from "react-responsive-masonry";
import {useAppDispatch} from "../../hooks/redux.ts";
import {addElement} from "../../redux/slices/canvasSlice/canvas-slice.ts";
import {CanvasElementType} from "../../services/canvas/canvas-element-types.enum.ts";
import {getImageSize} from "react-image-size";
import {Button, image} from "@nextui-org/react";
import {useEffect, useRef, useState} from "react";
import axios from "../../axios/instance";

interface IImage {
  _id: string
  url: string
  user: string
  updatedAt: string
}

interface IProps {
  dimensions: {
    width: number;
    height: number;
  };
}

export default function ImagesList({ dimensions }: IProps) {
  const [images, setImages] = useState<IImage[]>([])
  const dispatch = useAppDispatch();
  const wrapperRef = useRef<HTMLElement>();
  const buttonRefs = {};

  useEffect(() => {
    const fetchImages = async () => {
      const images = await axios.get('uploader/url')

      setImages(images.data)
    }

    fetchImages()
  }, []);

  const handleClick = async (url: string, id: string) => {
    const imageSize = await getImageSize(url)

    const scaleX = dimensions.width / imageSize.width;
    const scaleY = dimensions.height / imageSize.height;
    const minScale = Math.min(scaleX, scaleY);

    dispatch(addElement({type: CanvasElementType.IMAGE, src: url, scaleX: minScale, scaleY: minScale}))

    axios.patch(`uploader/url/${id}`)

    const sortedImages: IImage[] = images.map(image => {
      if (image._id === id)
        image.updatedAt = new Date().toISOString()

      console.log(image.updatedAt)
      return image
    }).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

    setImages(sortedImages)

    // TODO: sort array
  }

  return (
    <div className={'flex'}>
      <Masonry
        // columns={3}
        // gap={16}
        columnsCount={2}
        gutter={5}
        ref={wrapperRef}
      >
        {images.map((image) => {
          return (
            <Button key={image._id} className={'p-0 m-0 rounded-lg flex h-auto'} onPress={() => {handleClick(image.url, image._id)}}>
              <img src={image.url} />
            </Button>
          )
        })}
      </Masonry>
    </div>
  )
}