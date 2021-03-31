import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

/**
 * @param  {Object} page
 * @param  {Number} size
 * @return {String}
 */
const makeThumbnail = (page, size) => {
  // draw page to fit into input size canvas
  const desiredWidth = size;
  const viewPort = page.getViewport({ scale: 1 });

  const scale = desiredWidth / viewPort.width;
  const scaledViewport = page.getViewport({ scale: scale });

  const canvas = document.createElement("canvas");
  canvas.height = scaledViewport.height;
  canvas.width = scaledViewport.width;

  return page
    .render({
      canvasContext: canvas.getContext("2d"),
      viewport: scaledViewport,
    })
    .promise.then(function () {
      return canvas.toDataURL();
    })
    .catch(error => console.error(error));
};

/**
 * @param  {String} source
 * @param  {Number} size
 * @return {Array}
 */
export const generatePdfThumbnails = async (source, size) => {

  try {
    const pdfDocument = await pdfjsLib.getDocument({ url: source, }).promise

    console.log('PDF loaded');

    const pageNum = Array.from({ length: pdfDocument.numPages }, (x, i) => i + 1);

    return Promise.all(
      pageNum.map((num) =>
        pdfDocument
          .getPage(num)
          .then((page) => makeThumbnail(page, size))
          .then((thumbnail) => ({
            page: num,
            thumbnail,
          }))
      )
    );

  } catch (error) {
    console.error(error);
  }
}



export default generatePdfThumbnails;