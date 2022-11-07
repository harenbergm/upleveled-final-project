import Head from 'next/head';
import { useState } from 'react';
import UploadImage from '../components/UploadImage';

// type Recipe = {
//   imageUrl: string;
// };

export default function Contact() {
  const [imageUrl, setImageUrl] = useState('');
  console.log('imageUrl', imageUrl);

  async function createRecipeFromApi() {
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        imageURL: imageUrl,
      }),
    });

    const cloudinaryBodyUrl = await response.json();
    console.log('cloudinaryBodyUrl', cloudinaryBodyUrl);
  }

  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Biography of the animals" />
      </Head>
      Contact
      <main>
        <div>
          <form>
            <UploadImage
              setImageUrl={setImageUrl}
              //  data={data}
            />
            ;
            <button
              onClick={(event) => {
                createRecipeFromApi();
                event.preventDefault();
              }}
            >
              Submit
            </button>
          </form>

          <img
            height={100}
            width={100}
            src="https://res.cloudinary.com/ditcqem7b/image/upload/v1667399934/iguana_g9acuj.jpg"
          />
          <br></br>
          <img height={100} width={100} src={imageUrl} />
        </div>
      </main>
    </>
  );
}
