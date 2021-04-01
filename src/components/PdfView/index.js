// import { Document, Page, pdfjs } from "react-pdf";

import React, { useState, useEffect } from 'react';
import { ReactSortable } from "react-sortablejs";
import { Sortable, MultiDrag } from "sortablejs"
// https://www.npmjs.com/package/re-resizable#props
import { Resizable } from "re-resizable";
import './style.scss'

import Thumbnail from '../Thumbnail/index'
import Topbar from '../Topbar';

import {
  Checkbox,
  LABEL_PLACEMENT
} from "baseui/checkbox";

Sortable.mount(new MultiDrag());

const PdfView = ({ file, fileId, updateList, updateCheck }) => {
  const [list, setList] = useState([])
  const [checked, setChecked] = useState(true);

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

  const handleCheck = (e) => {
    setChecked(e.target.checked)
    updateCheck(fileId)
  }

  const handleUpdate = () => {
    updateList({ id: fileId, pages: list.map(l => { return { from: l.file, page: l.page - 1 } }), checked: checked }, fileId)
  }

  const handleDelete = (id) => {
    const updatedList = list.filter(l => l.id !== id)
    setList(updatedList)
    updateList({ id: fileId, pages: updatedList.map(l => { return { from: l.file, page: l.page - 1 } }), checked: checked }, fileId)
  }

  return (
    <div className='doc'>
      <Resizable
        style={{ display: "flex" }}
        defaultSize={{ width: '200', height: '100vh' }}
        maxWidth='600'
        minWidth='150'
        handleClasses={{ right: 'handle' }}
        enable={{ top: false, right: true, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
      >
        <Topbar>
          <div className='checkbox'>
            <Checkbox
              checked={checked}
              onChange={handleCheck}
              labelPlacement={LABEL_PLACEMENT.right}
            />
          </div>
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
          >
            {list.map((item) => (
              <Thumbnail
                key={item.id}
                imgsrc={item.thumbnail}
                pageId={item.id}
                handleDelete={handleDelete}
              />
            ))}
          </ReactSortable>
        </div>
      </Resizable>
    </div>
  )
}

export default PdfView