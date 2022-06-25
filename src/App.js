import axios from 'axios';
import { useState } from 'react';

import logo from './logo.svg';
import './App.css';

import EPUBViewer from './EPUBViewer';
import PdfViewer from './PdfViewer';

const KEY = 'D(G+KbPeShVmYq3t';

function App() {
  const [fileURI, setFileURI] = useState(null);

  const downloadPDf = async (url) => {
    try {
      const { data } = await axios.request({ url, responseType: 'arraybuffer' });
      return data;
    } catch (error) {
      console.warn(error);
      return null;
    }
  };

  const getDecryptedFile = (fileToDecrypt, returnAs = 'BLOB') => {
    if (!window.CryptoBrowserify) {
      throw new Error('CryptoBrowserify not installed');
    }
    const crypto = new window.CryptoBrowserify(KEY);
    const fileBuffer = crypto.toBuffer(fileToDecrypt);
    const decryptedFileBuffer = crypto.decrypt(fileBuffer);

    if (returnAs === 'BLOB') {
      return URL.createObjectURL(
        new Blob([new Uint8Array(decryptedFileBuffer)], { type: 'application/pdf' })
      );
    }
    return crypto.toBuffer(decryptedFileBuffer);
  };

  const viewPdf = async () => {
    const pdfToDecrypt = await downloadPDf('http://localhost:3000/samples/encrypt.epub');

    if (pdfToDecrypt) {
      const url = getDecryptedFile(pdfToDecrypt, 'ArrayBuffer');
      setFileURI(url);
    }
  };

  return (
    <div className='App'>
      {!fileURI ? (
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={viewPdf}>View PDF</button>
        </header>
      ) : (
        <EPUBViewer url={fileURI} />
      )}
    </div>
  );
}

export default App;
