import React, { Suspense, useCallback, useState } from "react";
const ShowImage = React.lazy(() => import("./ShowImage"));
const DropBox = React.lazy(() => import("./DropBox"));
export type Image = {
  id: number;
  src: any;
};
function App({
  images,
  setImages,
}: {
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
}) {
  //   const [images, setImages] = useState<Image[]>([]);
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.map((file: any, index: any) => {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setImages((prevState) => [
          ...prevState,
          { id: index, src: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);
  return (
    <Suspense>
      <div className="App">
        <DropBox onDrop={onDrop} />
        <ShowImage images={images} />
      </div>
    </Suspense>
  );
}
export default App;
