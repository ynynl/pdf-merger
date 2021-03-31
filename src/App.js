import './App.scss';
import React, { useState, useEffect } from 'react';
import FileInput from './components/FileInput/index'
import PdfView from './components/PdfView/index';
import { PDFDocument } from 'pdf-lib'
import download from 'downloadjs'
import generatePdfThumbnails from './helper/pdf-thumbnails-generator';
// import generatePdfThumbnails from 'pdf-thumbnails-generator';
import { Button } from "baseui/button";


function App() {
  const [pdfList, setPdfList] = useState([]);
  const [srcPdfDoc, setSrcPdfDoc] = useState([])
  const [workingList, setWorkingList] = useState([])

  useEffect(() => {
    const initSave = pdfList.map((pages, i) => (i > workingList.length-1)
      ? { id: i, pages: pages.map(p => { return { from: i, page: p.page - 1 } }), checked: true }
      : workingList[i])
    setWorkingList(initSave)
  }, [pdfList])


  // list { id, list, checked }

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

  const createList = (newSate) => {
    setWorkingList([...workingList, newSate])
  }

  // console.log('workingList', workingList);

  // console.log('pdfList', pdfList);

  // console.log('srcPdfDoc', srcPdfDoc);

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

      // console.log('srcFile', srcFiles);
      // console.log('ThumbnailList', thumbnailsList);
      // const initSave = thumbnailsList.map((pages, from) => {
      //   return {id: from, pages: pages.map(p => { return { from, page: p.page - 1 } })}
      // })

      // console.log('initSave', initSave);
      // toSave(true, initSave)

      setSrcPdfDoc(srcPdfDoc.concat(srcFiles))
      setPdfList(pdfList.concat(thumbnailsList))
    } catch (error) {
      console.log(error);
    }
  }

  // const toSave = (checked, doc) => {
  //   if (checked) {
  //     if (selected.find(s => doc.id === s.id)) {
  //       const newSelect = selected.map(s => {
  //         if (s.id === doc.id) {
  //           const updateDoc = {
  //             ...s,
  //             pages: doc.pages
  //           }
  //           return updateDoc
  //         }
  //         else { return s }
  //       })
  //       console.log('NEWSELECT', newSelect);
  //       setSelected(newSelect)
  //     } else {
  //       const toAdd = [...selected, doc].sort((a, b) => a.id - b.id)
  //       setSelected(toAdd)
  //     }
  //   }
  //   else {
  //     setSelected(selected.filter(f => f.id !== doc.id))
  //   }
  // }

  const savePages = async () => {

    const pdfDoc = await PDFDocument.create()
    console.log(pdfDoc);

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
      {pdfList.map((f, i) => {
        // const initList = f.map(f => {
        //   return {
        //     ...f,
        //     id: `${i}-${f.page - 1}`,
        //     from: i
        //   }
        // })
        // const initWorkingList = { list: initList, id: i, checked: true }
        // createList({ list: initList, id: i, checked: true })
        return < PdfView
          className='row'
          key={i}
          fileId={i}
          file={f}
          savePages={savePages}
          // toSave={toSave}
          updateList={updateList}
          updateCheck={updateCheck}
          workingList={workingList}
          createList={createList} />
      })
      }
      <div className='button'>
        <Button onClick={() => alert("click")}>Hello</Button>
      </div>
      <FileInput className='row' handlefile={handlefile} />

    </div>
  );
}

export default App;
