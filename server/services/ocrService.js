const { createWorker } = require("tesseract.js");

const doOCR = async (imagePath) => {
  const worker = await createWorker("eng");

  const {
    data: { text },
  } = await worker.recognize(imagePath);
  await worker.terminate();
  return text;
};

module.exports = {
  doOCR,
};
