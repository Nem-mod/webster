import {useAppDispatch} from "../../hooks/redux.ts";
import {useEffect, useRef, useState} from "react";
import {Button, Input} from "@nextui-org/react";
import Masonry from "react-responsive-masonry";
import axios from "../../axios/instance";
import {ZodType, z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import InputFormText from "../Auth/InputFormText/InputFormText.tsx";
import {getImageSize} from "react-image-size";
import {addElement} from "../../redux/slices/canvasSlice/canvas-slice.ts";
import {CanvasElementType} from "../../services/canvas/canvas-element-types.enum.ts";

export interface IImageUnsplash {
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
  search: string
}

interface ISearchForm {
  search: string;
}

const schema: ZodType<ISearchForm> = z.object({
  search: z.string()
})

export default function UnsplashImagesList({ dimensions }: IProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<IImageUnsplash[]>([])
  const [search, setSearch] = useState('landscape');
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISearchForm>({ resolver: zodResolver(schema) });

  const handleSearch = handleSubmit(async (data: ISearchForm) => {
    try {
      setLoading(true)

      const images = await axios.get('uploader/image', {params: {search: data.search}})
      console.log(images)
      setImages(images.data);
    } catch (err) {
      setImages([]);
    }
    setLoading(false)
  })

  const handleImageSelect = async (url: string, id: string) => {
    const imageSize = await getImageSize(url)

    const scaleX = dimensions.width / imageSize.width;
    const scaleY = dimensions.height / imageSize.height;
    const minScale = Math.min(scaleX, scaleY);

    dispatch(addElement({type: CanvasElementType.IMAGE, src: url, scaleX: minScale, scaleY: minScale}))

    axios.post('uploader/url', {url})
  }

  return (
    <div className={'flex flex-col h-full'} >
      <form onSubmit={handleSearch} className={'flex flex-row gap-3'}>
        <InputFormText
        isRequired={false}
        register={register}
        name={'search'}
        type={'text'}
        label={'Search'}
        errorMessage={errors.search?.message}
        className={'h-12'}/>
        <Button
          isLoading={loading}
          type={'submit'}
          className={
            'h-12 border border-secondary bg-secondary text-white hover:bg-primary-light ' +
            'w-2/5 text-lg font-semibold hover:border-primary-light hover:text-white'
          }>Search</Button>
      </form>

      { images.length === 0 && !loading &&
          <div className={'flex flex-grow justify-center items-center'}>There is no images</div>
      }
      <Masonry
        columnsCount={2}
        gutter={5}
      >
        {images.map((image) => {
          return (
            <Button key={image._id} className={'p-0 m-0 rounded-lg flex h-auto'} onPress={() => {handleImageSelect(image.url, image._id)}}>
              <img src={image.url} />
            </Button>
          )
        })}
      </Masonry>
    </div>
  )
}