import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import Head  from 'next/head';
import { ToastContainer } from 'react-toastify';
export default function App({ Component, pageProps }) {
  return <>
      <Head>
        <title>Kursus Mengemudi RPL</title>
        <meta name="title" content="Kursus Mengemudi RPL"/>
        <meta name="description" content="Kursus Mengemudi RPL adalah mitra terpercaya Anda dalam mengejar keterampilan mengemudi praktis."/>
        <meta name="keywords" content="Kursus, Mengemudi, RPL, Keterampilan, Mengemudi, "/>
        <meta name="robots" content="index, follow"/>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="author" content="Muhammad Helmi Hibatullah"/>

      </Head>
    <Component {...pageProps} />
    <ToastContainer autoClose={2000} draggable={false} containerId={1} key={1} limit={1} pauseOnFocusLoss={false} position='top-right' closeButton />
  </>
}
