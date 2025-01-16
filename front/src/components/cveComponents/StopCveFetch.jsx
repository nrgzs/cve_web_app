import React, { useState } from "react";
import Button from "../../utils/button.jsx";
import { useStopInitializeFetchServiceMutation } from "../../api/cveApi.js";

const StopCveFetch = () => {
  const [stopInitializeFetch] = useStopInitializeFetchServiceMutation();

  const handleFetch = async () => {
    try {
        stopInitializeFetch();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Button onClick={handleFetch} label={"stop cve service"} />
    </div>
  );
};

export default StopCveFetch;
