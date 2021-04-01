import './style.scss'

import * as React from 'react';
import { FileUploader } from 'baseui/file-uploader';


export default function FileInput({ handlefile, processing }) {
    // function reset() {
    //     setIsUploading(false);
    //     clearTimeout(timeoutId.current);
    // }
    // startProgress is only illustrative. Use the progress info returned
    // from your upload endpoint. This example shows how the file-uploader operates
    // if there is no progress info available.
    return (
        <div className='input'>
            <div >
                <FileUploader
                    className='uploader'
                    multiple
                    accept='application/pdf'
                    // onCancel={reset}
                    onDrop={(acceptedFiles, rejectedFiles) => {
                        handlefile(acceptedFiles)
                    }}
                    progressMessage={
                        processing ? `Loading... hang tight.` : ''
                    }
                />
            </div>
        </div>
    );
}