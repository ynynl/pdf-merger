import './App.scss';
import React, { useState, useEffect } from 'react';
import PdfView from './components/PdfView/index';
import { PDFDocument } from 'pdf-lib'
import download from 'downloadjs'
import generatePdfThumbnails from './helper/pdf-thumbnails-generator';
import Right from './components/Right/index';



function App() {
  const [pdfList, setPdfList] = useState([]);
  const [srcPdfDoc, setSrcPdfDoc] = useState([])
  const [workingList, setWorkingList] = useState([])

  useEffect(() => {
    const initSave = pdfList.map((pages, i) => (i > workingList.length - 1)
      ? { id: i, pages: pages.map(p => { return { from: i, page: p.page - 1 } }), checked: true }
      : workingList[i])
    setWorkingList(initSave)
  }, [pdfList])

  /**
   * 
   * @param {object} newSate 
   * @param {number} id 
   */
  const updateList = (newSate, id) => {
    const update = workingList.map(l => (l.id === id) ? newSate : l)
    setWorkingList(update)
  }

  const updateCheck = (id) => {
    const update = workingList.map(l => (l.id === id) ? { ...l, checked: !l.checked } : l)
    setWorkingList(update)
  }

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

      setSrcPdfDoc(srcPdfDoc.concat(srcFiles))
      setPdfList(pdfList.concat(thumbnailsList))
    } catch (error) {
      console.log(error);
    }
  }

  const handleSave = async () => {

    const pdfDoc = await PDFDocument.create()
    // console.log(pdfDoc);

    for (let i = 0; i < workingList.length; i++) {
      if (workingList[i].checked) {
        const pages = workingList[i].pages
        console.log('save', pages);
        for (let j = 0; j < pages.length; j++) {
          const p = pages[j]
          const [srcPage] = await pdfDoc.copyPages(srcPdfDoc[p.from], [p.page])
          pdfDoc.addPage(srcPage)
        }
      }
    }
    const pdfBytes = await pdfDoc.save()
    download(pdfBytes, "mergedPDF.pdf", "application/pdf");
  }

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
      {pdfList.map((f, i) => {
        return <PdfView
          className='row'
          key={i}
          fileId={i}
          file={f}
          updateList={updateList}
          updateCheck={updateCheck}
        />
      })}

      <Right className='row' handlefile={handlefile} handleSave={handleSave} loaded={!!workingList.length} />

    </div>
  );
}

export default App;
