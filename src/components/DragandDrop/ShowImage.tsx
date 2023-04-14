import { Suspense } from "react"
import Image from "./Image";

const ShowImage = ({ images }: { images: any }) => {
  const show = (image: any, i:number) => {
    return <Image key={i} image={image} />;
  };
  return (
    <Suspense>
      <div className="container">{images.map(show)}</div>
    </Suspense>
  );
};
export default ShowImage;
