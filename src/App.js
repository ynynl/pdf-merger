import './App.css';
import React, { useState, useEffect } from 'react';
import FileInput from './components/FileInput/index'
import PdfView from './components/PdfView/index';
import { PDFDocument } from 'pdf-lib'
import download from 'downloadjs'
import generatePdfThumbnails from './helper/pdf-thumbnails-generator';
// import generatePdfThumbnails from 'pdf-thumbnails-generator';

function App() {
  const [pdfList, setPdfList] = useState([]);
  const [srcPdfDoc, setSrcPdfDoc] = useState([])

  console.log('pdfList', pdfList);

  console.log('srcPdfDoc', srcPdfDoc);
  const handlefile = async (files) => {
    try {
      const thumbnailTasks = []
      const sourceFileTasks = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const doc = await readFileDataAsBase64(file)
        sourceFileTasks.push(
          PDFDocument.load(doc)
        )
        thumbnailTasks.push(
          generatePdfThumbnails(doc, 600)
        )
      }

      const srcFiles = await Promise.all(sourceFileTasks)
      const thumbnailsList = await Promise.all(thumbnailTasks)

      console.log('srcFile', srcFiles);
      console.log('ThumbnailList', thumbnailsList);

      setSrcPdfDoc(srcPdfDoc.concat(srcFiles))
      setPdfList(pdfList.concat(thumbnailsList))
    } catch (error) {
      console.log(error);
    }
  }

  const savePages = async (pages) => {
    console.log('save', pages);

    const pdfDoc = await PDFDocument.create()
    console.log(pdfDoc);

    for (let i = 0; i < pages.length; i++) {
      const p = pages[i]
      console.log(p);
      const [srcPage] = await pdfDoc.copyPages(srcPdfDoc[p.from], [p.page])
      pdfDoc.addPage(srcPage)
    }

    const pdfBytes = await pdfDoc.save()
    // Trigger the browser to download the PDF document
    download(pdfBytes, "pdf-lib_page_copying_example.pdf", "application/pdf");
  }

  // https://stackoverflow.com/questions/56001073/how-to-get-byte-array-from-a-file-in-reactjs
  function readFileDataAsBase64(file) {

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
      {pdfList.map((f, i) =>
        <PdfView className='row' key={i} fileIdx={i} file={f} savePages={savePages} />
      )
      }
      <FileInput className='row' handlefile={handlefile} />
    </div>
  );
}

export default App;
