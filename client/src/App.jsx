import { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const BASE_URL = "http://localhost:8080/api";

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleExtract = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.result) {
        setImageUrl(`data:image/jpeg;base64,${response.data.result.image}`);
        setExtractedText(response.data.result.text);
      } else {
        alert("No result found in the response");
      }
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Text Extractor - Image(OCR)</h1>
      <div style={{ margin: "2rem 7rem" }}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleExtract}>Extract</button>
      </div>

      {imageUrl && (
        <div>
          <div
            style={{
              border: "2px solid red",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
          </div>
          <div>
            <h2>Extracted Text:</h2>
            <p style={{ backgroundColor: "light-gray" }}>{extractedText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
