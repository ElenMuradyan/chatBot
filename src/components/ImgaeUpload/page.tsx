import { Upload } from 'antd';
import type { UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { supabase } from '@/services/supabase';
import '../../styles/imageRecognition.css';

export default function ImageUpload ({setImageUrl}: {setImageUrl: (img: string) => void}) {
  const handleImageUpload: UploadProps["customRequest"] = async ({ file, onSuccess, onError }) => {
    try {
        const imageFile = file as RcFile;
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;
  
        const { error, data } = await supabase.storage.from("product-images").upload(filePath, imageFile);
  
        if (error) {
          console.error("Upload error:", error);
          onError?.(error);
        } else {
              const { data: publicUrlData} = supabase.storage
              .from("product-images")
              .getPublicUrl(filePath);

              const imageUrl = publicUrlData.publicUrl
              setImageUrl(imageUrl);
            onSuccess?.(data);
        }
    }catch( error ){
        const err = error as Error;
        console.log(err.message);
      }
   };

  return (
      <Upload
        className='upload'
        customRequest={handleImageUpload}
        style={{height: 300, width: 300}}
      >
        <h1>+ UPLOAD</h1>
      </Upload>
  );
};