import Head from 'next/head';
import { useState } from 'react';
import UploadImage from '../components/UploadIMage';

export default function Contact() {
  const [imageUrl, setImageUrl] = useState('');
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
        </div>
      </main>
    </>
  );
}
