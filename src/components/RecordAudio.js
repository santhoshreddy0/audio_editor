import React, { useContext, useEffect, useState } from "react";
import RecordRTC from "recordrtc";
import { FileContext } from "../contexts/fileContext";

function RecordAudio({ history }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const { fileURL, setFileURL } = useContext(FileContext);
  const [file, setFile] = useState(null);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recordRTC = new RecordRTC(stream, { type: "audio" });
      recordRTC.startRecording();
      setRecorder(recordRTC);
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone", error);
    }
  };

  useEffect(() => {
    if (file) {
      setFileURL(file);
      history.push("/edit");
    }
  }, [file, setFileURL, history]);

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const url = URL.createObjectURL(blob);
        setFile(url);
        setIsRecording(false);
      });
    }
  };

  return (
    <>
      <h1>Audio Recorder</h1>
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
    </>
  );
}

export default RecordAudio;
