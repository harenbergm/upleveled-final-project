// child component for image upload
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

type Props = {
  setImageUrl: (imageUrl: string) => void;
};

export function UploadImage({ setImageUrl }: Props) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  // console.log('preview', String(preview));
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (!newFile) return;

    /* Creating an URL for the file. */
    setPreview(URL.createObjectURL(newFile));
    console.log('newFile', newFile);

    /* Creating a form data object and appending the file and the upload preset to it. */
    const formData = new FormData();
    formData.append('file', newFile);
    formData.append('upload_preset', 'o7t0b9ra');

    console.log('formData', formData);

    /* Sending the image to cloudinary and getting the url back. */
    const data = await fetch(
      'https://api.cloudinary.com/v1_1/ditcqem7b/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((res) => res.json());
    setImageUrl(data.secure_url);
    console.log('data', data);
  };

  return (
    <div>
      <label htmlFor="file">Upload an image</label>
      <input
        id="file"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {!!preview && (
        <Image width={100} height={100} src={String(preview)} alt="preview" />
      )}
    </div>
  );
}

export default UploadImage;
