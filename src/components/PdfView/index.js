// import { Document, Page, pdfjs } from "react-pdf";

import React, { useState, useEffect } from 'react';
import { ReactSortable } from "react-sortablejs";
import { Sortable, MultiDrag } from "sortablejs"
// import { GridList, GridListTile, Paper } from '@material-ui/core';
// https://www.npmjs.com/package/re-resizable#props
import { Resizable } from "re-resizable";
import './style.scss'

import Thumbnail from '../Thumbnail/index'
import Topbar from '../Topbar';

import {
  Checkbox,
  LABEL_PLACEMENT
} from "baseui/checkbox";
import { update } from 'lodash';


Sortable.mount(new MultiDrag());

// var _ = require('lodash');

const PdfView = ({ file, savePages, fileId, toSave, workingList, updateList, createList, updateCheck }) => {
  // const [numPages, setNumPages] = useState(null);
  // eslint-disable-next-line
  // const [pageNumber, setPageNumber] = useState(1);
  const [list, setList] = useState([])
  const [checked, setChecked] = useState(true);

  // const [width, setWidth] = useState(200)

  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


  useEffect(() => {
    const initList = file.map(f => {
      return {
        ...f,
        id: `${fileId}-${f.page - 1}`,
        file: fileId
      }
    })
    setList(initList)


  }, [file, fileId])

  // useEffect(() => {
  //   toSave(checked, { id: fileId, pages: list.map(l => { return { from: l.file, page: l.page - 1 } }) })
  // }, [list, fileId])

  const style = {
    display: "flex",
  };

  // console.log(fileId);
  // console.log('list', list);

  const handleCheck = (e) => {
    setChecked(e.target.checked)
    updateCheck(fileId)
    // toSave(e.target.checked, { id: fileId, pages: list.map(l => { return { from: l.file, page: l.page - 1 } }) })
  }

  const handleUpdate = () => {
    // toSave(checked, { id: fileId, pages: list.map(l => { return { from: l.file, page: l.page - 1 } }) })
    updateList({ id: fileId, pages: list.map(l => { return { from: l.file, page: l.page - 1 } }), checked: checked }, fileId)
  }

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
          {/* <button onClick={() => savePages(list.map(l => { return { from: l.file, page: l.page - 1, id: fileId } }))}>save</button> */}
          <Checkbox
            checked={checked}
            onChange={handleCheck}
            labelPlacement={LABEL_PLACEMENT.right}
          />
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
            onSort={handleUpdate}
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



// const CheckboxInput = () => {
//   const [checked, setChecked] = React.useState(false);
//   return (
//     <Checkbox
//       checked={checked}
//       onChange={e => setChecked(e.target.checked)}
//       labelPlacement={LABEL_PLACEMENT.right}
//     />
//   );
// }



export default PdfView