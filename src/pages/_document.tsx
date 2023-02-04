import { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Link
        rel="stylesheet"
        href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css"
      />
      <body>
        <Main />
        <NextScript />
      </body>
      <Script src="../path/to/flowbite/dist/flowbite.min.js" defer></Script>
    </Html>
  );
}
