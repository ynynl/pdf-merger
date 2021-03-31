import Topbar from "../Topbar"
import './style.scss'
// const FileInput = ({ handlefile }) => {
//     return (
//         <div>
//             <Topbar></Topbar>
//             <div className='input'>
//                 <input type="file" accept="image/*,.pdf" onChange={handlefile} />
//             </div>
//         </div>
//     )
// }

import * as React from 'react';
import { FileUploader } from 'baseui/file-uploader';
export default function FileInput({ handlefile }) {
  const [isUploading, setIsUploading] = React.useState(false);
  const timeoutId = React.useRef(null);
  function reset() {
    setIsUploading(false);
    clearTimeout(timeoutId.current);
  }
  // startProgress is only illustrative. Use the progress info returned
  // from your upload endpoint. This example shows how the file-uploader operates
  // if there is no progress info available.
  function startProgress() {
    setIsUploading(true);
    timeoutId.current = setTimeout(reset, 4000);
  }
  return (
    <>
    <Topbar></Topbar>
    <FileUploader
      multiple
      accept='application/pdf'
      onCancel={reset}
      onDrop={(acceptedFiles, rejectedFiles) => {
        // handle file upload...
        // startProgress();
        handlefile(acceptedFiles)
      }}
      progressMessage={
        isUploading ? `Uploading... hang tight.` : ''
      }
    />
    </>
  );
}