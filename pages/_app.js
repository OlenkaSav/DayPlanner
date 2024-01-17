
// import "react-toastify/dist/ReactToastify.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/animate.css'

import '../styles/sass/style.scss'
// import {ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Head from 'next/head'

import {Open_Sans} from 'next/font/google'


const opensans = Open_Sans({
    weight: ['400', '700'],
    subsets: ['latin', 'cyrillic'],
    variable: '--base-font',
})



function MyApp({Component, pageProps}) {
    return (
       
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
                {/* <ToastContainer/> */}
            </div>
    

    )
}

export default MyApp
