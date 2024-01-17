import Document, { Html, Head, Main, NextScript } from 'next/document';
import ToolsPanel from '../components/ToolsPanel';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div className='container'>
            <ToolsPanel />
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;