// import { Document, Page, pdfjs } from "react-pdf";

import React, { useState, useEffect } from 'react';
import { ReactSortable } from "react-sortablejs";
import { Sortable, MultiDrag } from "sortablejs"
// import { GridList, GridListTile, Paper } from '@material-ui/core';
// https://www.npmjs.com/package/re-resizable#props
import { Resizable } from "re-resizable";
import './style.scss'

import Thumbnail from './Thumbnail/index'
import Topbar from '../Topbar';


Sortable.mount(new MultiDrag());

// var _ = require('lodash');

const PdfView = ({ file, savePages, fileIdx }) => {
  // const [numPages, setNumPages] = useState(null);
  // eslint-disable-next-line
  // const [pageNumber, setPageNumber] = useState(1);
  const [list, setList] = useState([])
  // const [width, setWidth] = useState(200)

  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


  useEffect(() => {
    setList(file.map(f => {
      return {
        ...f,
        id: `${fileIdx}-${f.page - 1}`,
        file: fileIdx
      }
    }))
  }, [file, fileIdx])

  const style = {
    display: "flex",
  };

  console.log(fileIdx);
  console.log('list', list);

  return (
    <div className='doc'>
      <Resizable
        style={style}
        defaultSize={{ width: '200', height: '100vh' }}
        maxWidth='600'
        minWidth='150'
        handleClasses={{ right: 'handle' }}
        enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
      >
        <Topbar>
          <button onClick={() => savePages(list.map(l => { return { from: l.file, page: l.page - 1 } }))}>save</button>
        </Topbar>

        <div className='pages'>
          <ReactSortable
            multiDrag
            list={list}
            setList={setList}
            group="groupName"
            animation={200}
            delayOnTouchStart={true}
            delay={2}
            selectedClass='selected'
            ghostClass='selected'
            swapThreshold={0.5}
            className='grid-container'
            // onChoose={}
          >
            {list.map((item) => (
              <Thumbnail key={item.id} imgsrc={item.thumbnail} />
            ))}
          </ReactSortable>
        </div>
      </Resizable>
    </div>
  )
}

export default PdfView