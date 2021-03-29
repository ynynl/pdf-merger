import { Document, Page, pdfjs } from "react-pdf";

import React, { useState } from 'react';
import { ReactSortable } from "react-sortablejs";
import { Sortable, MultiDrag, Swap } from "sortablejs"
// import { GridList, GridListTile, Paper } from '@material-ui/core';
// https://www.npmjs.com/package/re-resizable#props
import { Resizable } from "re-resizable";
import styles from './style.scss'


Sortable.mount(new MultiDrag());

var _ = require('lodash');

const PdfView = ({ list, setList, savePages }) => {
  // const [numPages, setNumPages] = useState(null);
  // eslint-disable-next-line
  // const [pageNumber, setPageNumber] = useState(1);
  // const [list, setList] = useState(file)
  const [width, setWidth] = useState(200)

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const style = {
    display: "flex",
    // overflowY: 'scroll',

    // border: "solid 1px #ddd",
  };
  console.log('list', list);

  // if (!file) {
  //   return (
  //     <div>
  //       No file
  //     </div>
  //   )
  // }

  return (
    <div className='doc'>


      <Resizable
        style={style}
        defaultSize={{ width: '500', height: '100vh' }}
        // onResizeStop={(e, direction, ref, d) => {
        //   setWidth(width + d.width);
        // }}
        // size={{ width: width + 50, height: '100vh' }}
        handleClasses={{ right: 'handle' }}
        enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
      >
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
          >
            {list.map((item) => (
              <div key={item.page} className='page-card'
              >
                <img src={item.thumbnail} width={'100%'} />
              </div>
            ))}
          </ReactSortable>
        </div>
      </Resizable>
    </div>
  )
}

const Handle = () => {
  return (
    <div><div className='handle'></div></div>
  )
}

export default PdfView