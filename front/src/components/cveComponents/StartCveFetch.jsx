import React, { useState } from "react";
import { useInitializeFetchMutation } from "../../api/cveApi.js";
import Button from "../../utils/button.jsx";

const StartCveFetch = () => {
  const [initializeFetch] = useInitializeFetchMutation();

  const handleFetch = async () => {
    try {
      initializeFetch();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Button onClick={handleFetch} label={"start cve service"} />
    </div>
  );
};

export default StartCveFetch;
