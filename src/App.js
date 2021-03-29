import './App.css';
import React, { useState, useEffect } from 'react';
import FileInput from './components/FileInput'
import PdfView from './components/PdfView/index';
import { PDFDocument } from 'pdf-lib'
import download from 'downloadjs'
import generatePdfThumbnails from './utils/pdf-thumbnails-generator';
// import generatePdfThumbnails from 'pdf-thumbnails-generator';

function App() {
  const [file, setFile] = useState([]);
  // const [srcPdfDoc, setSrcPdfDoc] = useState('')
  const [srcPdfDoc, setSrcPdfDoc] = useState([])

  const [pdfDoc, setPdfDoc] = useState()

  console.log('file', file);
  useEffect(() => {
    const init = async () => {
      setPdfDoc(await PDFDocument.create())
    }
    init()
  }, [])

  const generateThumbnails = async (pdf_source) => {
    try {
      const thumbnails = await generatePdfThumbnails(pdf_source, 600);
      console.log(thumbnails);
      setFile(thumbnails)
      // return thumbnails
    } catch (err) {
      console.error(err);
    }
  }

  const handlefile = async (e) => {
    // setFile(e.target.files[0])
    if (e.target.files[0]) {
      try {
        const doc = await readFileDataAsBase64(e)
        setSrcPdfDoc(await PDFDocument.load(doc))
        generateThumbnails(doc)
      } catch (err) {
        console.error(err);
      }
    } else {
      setSrcPdfDoc(null)
    }
  }



  const savePages = async (pages) => {
    const pageList = pages.map(p => p.page - 1)
    const srcPages = await pdfDoc.copyPages(srcPdfDoc, pageList)
    console.log(pageList);
    for (let i = 0; i < pageList.length; i++) {
      pdfDoc.addPage(srcPages[i])
    }
    const pdfBytes = await pdfDoc.save()
    // Trigger the browser to download the PDF document
    download(pdfBytes, "pdf-lib_page_copying_example.pdf", "application/pdf");
    setPdfDoc(await PDFDocument.create())
  }
  // https://stackoverflow.com/questions/56001073/how-to-get-byte-array-from-a-file-in-reactjs
  function readFileDataAsBase64(e) {
    const file = e.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  }

  return (
    <div className='App'>
      <div className='row'>

        <PdfView className='view' list={file} setList={setFile} savePages={savePages} />
      </div>
      <div className='row'>
      <button onClick={() => savePages(file)}>save</button>
      <FileInput className='input' handlefile={handlefile} />
      </div>
    </div>
  );
}

export default App;
