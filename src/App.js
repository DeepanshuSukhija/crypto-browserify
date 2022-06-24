import axios from 'axios';
import { useState } from 'react';

import logo from './logo.svg';
import './App.css';

import PdfViewer from './PdfViewer';

const KEY = 'xxxxxxxxxxxxxxxx';

function App() {
  const [pdfUri, setPdfUri] = useState(null);

  const downloadPDf = async (url) => {
    try {
      const { data } = await axios.request({ url, responseType: 'arraybuffer' });
      return data;
    } catch (error) {
      console.warn(error);
      return null;
    }
  };

  const getDecryptedPDF = (pdfToDecrypt) => {
    if (!window.CryptoBrowserify) {
      throw new Error('CryptoBrowserify not installed');
    }
    const crypto = new window.CryptoBrowserify(KEY);
    const pdfBuffer = crypto.toBuffer(pdfToDecrypt);
    const decryptedPdfBuffer = crypto.decrypt(pdfBuffer);

    return URL.createObjectURL(
      new Blob([new Uint8Array(decryptedPdfBuffer)], { type: 'application/pdf' })
    );
  };

  const viewPdf = async () => {
    const pdfToDecrypt = await downloadPDf('http://localhost:3000/samples/encrypt.pdf');

    if (pdfToDecrypt) {
      const url = getDecryptedPDF(pdfToDecrypt);
      setPdfUri(url);
    }
  };

  return (
    <div className='App'>
      {!pdfUri ? (
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={viewPdf}>View PDF</button>
        </header>
      ) : (
        <PdfViewer url={pdfUri} />
      )}
    </div>
  );
}

export default App;
