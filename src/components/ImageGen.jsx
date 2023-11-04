import React, { useState } from "react";

const API_TOKEN = "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";

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [history, setHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [hueRotate, setHueRotate] = useState(0);
  const [blur, setBlur] = useState(0);
  const [grayscale, setGrayscale] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    setInputText(input);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
    setShowMessage(true);
  };

  const handleDownload = () => {
    if (output) {
      const a = document.createElement("a");
      a.href = output;
      a.download = "generated_image.png";
      a.click();
    }
  };

  const handleViewHistory = () => {
    const newEntry = { input: inputText, output };
    setHistory([...history, newEntry]);
  };

  const handleClearText = () => {
    setInputText("");
    setShowMessage(false);
  };

  return (
    <div className="container al-c mt-3">
      <h1>
        AI <span>ARTIST🌍</span>
      </h1>
      <h2>Text-to-image🧩</h2>

      <form className="gen-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          placeholder="type your prompt here..."
          className={`input-text ${showMessage ? "history-output" : ""}`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">Generate</button>

        <div className="controls">
          <div className="slider">
            <label className="white-bold-label">
              Brightness:
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={brightness}
                onChange={(e) => setBrightness(e.target.value)}
              />
            </label>
          </div>

          <div className="slider">
            <label className="white-bold-label">
              Opacity:
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => setOpacity(e.target.value)}
              />
            </label>
          </div>

          <div className="slider">
            <label className="white-bold-label">
              Contrast:
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={contrast}
                onChange={(e) => setContrast(e.target.value)}
              />
            </label>
          </div>

          <div className="slider">
            <label className="white-bold-label">
              Saturation:
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={saturation}
                onChange={(e) => setSaturation(e.target.value)}
              />
            </label>
          </div>

          <div className="slider">
            <label className="white-bold-label">
              Hue Rotate:
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={hueRotate}
                onChange={(e) => setHueRotate(e.target.value)}
              />
            </label>
          </div>

          <div className="slider">
            <label className="white-bold-label">
              Blur:
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={blur}
                onChange={(e) => setBlur(e.target.value)}
              />
            </label>
          </div>

          <div className="slider">
            <label className="white-bold-label">
              Grayscale:
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={grayscale}
                onChange={(e) => setGrayscale(e.target.value)}
              />
            </label>
          </div>
        </div>
      </form>

      <div>
        {loading && <div className="loading">Loading...</div>}
        {!loading && output && (
          <div className="result-image">
            {showMessage && (
              <p className="history-output">Congratulations! You got an output.</p>
            )}
            <img
              src={output}
              alt="art"
              style={{
                width: "50%",
                height: "auto",
                filter: `
                  brightness(${brightness}) 
                  contrast(${contrast}) 
                  saturate(${saturation}) 
                  hue-rotate(${hueRotate}deg) 
                  blur(${blur}px) 
                  grayscale(${grayscale})`,
                opacity: `${opacity}`,
              }}
            />
            <button className="download-button" onClick={handleDownload}>
              Download Image
            </button>
            <button className="history-button" onClick={handleViewHistory} style={{ marginTop: "10px" }}>
              View History
            </button>
          </div>
        )}
      </div>

      <div className="history">
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              <div className="history-output">
                <strong>Input:</strong> {entry.input}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ImageGenerationForm;
