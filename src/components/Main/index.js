import Topbar from "../Topbar/index"
import './style.scss'

import * as React from 'react';

import FileInput from "../FileInput";
import { Button } from "baseui/button";
import {H3} from 'baseui/typography';

import githubIcon from '../../GitHub-Mark-64px.png'

export default function Right({ handlefile, handleSave, loaded, isLoading, isSaving, pageCount }) {
  // startProgress is only illustrative. Use the progress info returned
  // from your upload endpoint. This example shows how the file-uploader operates
  // if there is no progress info available.
  return (
    <div className='container'>
      {/* <Topbar></Topbar> */}
      <div className='content'>

        <H3>
          Severless PDF Arrange & Combine
        </H3>

        <a href='https://github.com/ynynl/severless-pdf-merge'>
          <img src={githubIcon}></img>
        </a>

        <FileInput handlefile={handlefile} processing={isLoading} />
        {/* <Controller /> */}
        {loaded &&
          <div className='button'>
            <Button
              onClick={handleSave}
              isLoading={isSaving}
            >
              Combine and Save {pageCount} Pages
              </Button>
          </div>
        }
      </div>
    </div>
  );
}