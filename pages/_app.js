import '../styles/sass/style.scss'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Head from 'next/head'
import { Open_Sans } from 'next/font/google'

import { NextAuthProvider } from './../app/Providers';


const opensans = Open_Sans({
    weight: ['400', '700'],
    subsets: ['latin', 'cyrillic'],
    variable: '--base-font',
})

function MyApp({Component, pageProps}) {
    return (
        <NextAuthProvider>
            <Provider store={store}>
            <div>
                <style jsx global>{`
                    :root {
                    --heading-font: ${opensans.style.fontFamily};
                    --base-font: ${opensans.style.fontFamily};
                    }
                `}</style>
                <Head>
                    <title>Planner</title>
                </Head>
                <Component {...pageProps} />
                <ToastContainer position="top-center"
                    autoClose={2000}
                    hideProgressBar
                    style={{ fontSize: '1.5rem' }} 
                    closeOnClick
                    rtl={false}
                    draggable
                    theme="light"/>
            </div>
    
            </Provider>
            </NextAuthProvider>
    )
}

export default MyApp
