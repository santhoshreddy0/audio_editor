import React from "react";
import UploadAudio from "../components/UploadAudio";
import RecordAudio from "../components/RecordAudio";

const HomePage = ({ history }) => {
  return (
    <div>
      <RecordAudio history={history} />
      <UploadAudio history={history} />
    </div>
  );
};

export default HomePage;
