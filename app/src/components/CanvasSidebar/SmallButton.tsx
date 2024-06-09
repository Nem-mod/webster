import {Button, Image} from "@nextui-org/react";

const icons = {
  minmize: '../../../../public/minimize_icon.png'
}

interface Props {
  onClick: () => void
  className?: string
}

export default function SmallButton({onClick, className}: Props) {
  return (
    <Button isIconOnly className={`bg-secondary/70 rounded-r-none rounded-t-none + ${className}`} size={'sm'} onClick={onClick}>
      <Image src={icons.minmize} width={20} height={20} radius={'none'} />
    </Button>
  )
}