import Image from 'next/image'

interface IImg {
  className?: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}
export default async function Img(prop: IImg) {
  return (
    <Image
      className={prop.className}
      src={"/portfolio-next-app" + prop.src}
      alt={prop.alt}
      width={prop.width}
      height={prop.height}
      priority={prop.priority}
    />
  )
}