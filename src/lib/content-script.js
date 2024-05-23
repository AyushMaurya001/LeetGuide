
export const getCurrentTabUrl = async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  let pageUrl = tabs[0].url;
  // console.log(pageUrl, "content-script pageUrl");
  return pageUrl;
};