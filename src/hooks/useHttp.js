import { useCallback, useEffect, useState } from "react";

async function sendHtttpRequest(url, config) {
  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(response.message || "Failed to send request");
  }
  const resData = await response.json();
  return resData;
}

const useHttp = (url, config, initialData) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const responseData = await sendHtttpRequest(url, {...config, body:data});
        setData(responseData);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
      setIsLoading(false);
    },
    [url, config],
  );

  const clearData = ()=>{
    setData(initialData)
  }

  useEffect(() => {
    if((config && (config.method === 'GET' || !config.method)) || !config){
    sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
};

export default useHttp;
