import Topbar from "../Topbar/index"
import './style.scss'

import * as React from 'react';

import FileInput from "../FileInput";
import { Button } from "baseui/button";
import { H1, H2, H3, H4, H5, H6 } from 'baseui/typography';


export default function Right({ handlefile, handleSave, loaded }) {
  // startProgress is only illustrative. Use the progress info returned
  // from your upload endpoint. This example shows how the file-uploader operates
  // if there is no progress info available.
  return (
    <div className='container'>
      <Topbar></Topbar>
      <div className='input'>

        <H5>
          Arrange & Combine PDF (severless)
        </H5>
        
        <div>
          <FileInput handlefile={handlefile} />
          {/* <Controller /> */}
        </div>
        {loaded &&
          <div className='button'>
            <Button onClick={handleSave}>SAVE</Button>
          </div>
        }
      </div>
    </div>
  );
}