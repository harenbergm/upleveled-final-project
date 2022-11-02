import Head from 'next/head';
import { useState } from 'react';
import UploadImage from '../components/UploadIMage';

export default function Contact() {
  const [imageUrl, setImageUrl] = useState('');
  const [cloudUrl, setCloudUrl] = useState(imageUrl);
  const URL = imageUrl;
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
            <UploadImage setImageUrl={setImageUrl} />;<button>Submit</button>
          </form>

          <img
            height={100}
            width={100}
            src="https://res.cloudinary.com/ditcqem7b/image/upload/v1667399934/iguana_g9acuj.jpg"
          />
          <br></br>
          <img height={100} width={100} src={cloudUrl} />
        </div>
      </main>
    </>
  );
}
