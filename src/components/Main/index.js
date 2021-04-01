import Topbar from "../Topbar/index"
import './style.scss'

import * as React from 'react';

import FileInput from "../FileInput";
import { Button } from "baseui/button";

import githubIcon from '../../GitHub-Mark-64px.png'
import icon from '../../icon.svg'

export default function Main({ handlefile, handleSave, loaded, isLoading, isSaving, pageCount }) {
  // startProgress is only illustrative. Use the progress info returned
  // from your upload endpoint. This example shows how the file-uploader operates
  // if there is no progress info available.
  return (
    <div className='container'>
      {/* <Topbar>
      </Topbar> */}
      <div className='github'>
        <a href='https://github.com/ynynl/severless-pdf-merge'>
          <img src={githubIcon} width={24} alt=''></img>
        </a>
      </div>
      <div className='content'>

        <img src={icon} width={100} alt=''></img>

        <p>no server. fully pravite.</p>

        <h1>
          PDF Arrange and Combine
        </h1>

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