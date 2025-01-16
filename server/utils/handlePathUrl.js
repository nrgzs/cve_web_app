function handlePathUrl(path, app) {
    let parameters = [];
  
    path.parameters.map((param) => {
      let paramWithValue = "";
  
      if (
        param.value === "product" ||
        param.value === "vendor" ||
        param.value === "version"
      ) {
        paramWithValue = `${param.name}=${app[param.value]}&`;
      } else {
        paramWithValue = `${param.name}=${param.value}&`;
      }
      parameters.push(paramWithValue);
    });
  
    let pathurl = `${path.url}${parameters}`;
  
    return pathurl;
    // returns the url that needed for crawl
  }

  export default handlePathUrl