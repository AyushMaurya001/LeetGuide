
export const getCurrentTabUrl = async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  let pageUrl = tabs[0].url;
  // console.log(pageUrl, "content-script pageUrl");
  return pageUrl;
};

export const letExperiment = async () => {

  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log('tab', tab);

  const ele = document.querySelector('#root');
  console.log('element -->', ele);

  const statusEle = document.querySelector("#ide-top-btns > div:nth-child(1) > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(3) > div:nth-child(3)")
  console.log('data', statusEle);
  //*[@id="ide-top-btns"]/div[1]/div/div/div[2]/div/div[2]/div/div[3]/div[3]
  
  const xpath = "*[@id='ide-top-btns']/div[1]/div/div/div[2]/div/div[2]/div/div[3]/div[3]";
  // const xpath = "/html/body/div[1]/div[2]/div/div/div[3]/div/div/div[1]/div/div/div[2]/div/div[2]/div/div[3]/div[3]";

  const submitBtn = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  console.log('submitBtn', submitBtn);

  // content.js
  const observer = new MutationObserver((mutations) => {
    console.log(mutations);
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        
        // function getElementByXPath(xpath) {
        //   return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        // }
        
        // const statusElement = getElementByXPath('/html/body/div[1]/div[2]/div/div/div[3]/div/div/div[1]/div/div/div[2]/div/div[2]/div/div[3]/div[3]/div/button');
        const statusElement = document.querySelector("#ide-top-btns > div:nth-child(1) > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(3) > div:nth-child(3)")
        console.log('s', mutation);
        
        // if (statusElement) {
        //   console.log('Status element found:', statusElement.innerText);
        // }
        
        
        // const statusElement = document.querySelector('.result-title'); // Example selector
        // if (statusElement && statusElement.innerText.includes('Accepted')) {
        //   const codeElement = document.querySelector('.ace_content'); // Selector for the code area
        //   const acceptedCode = codeElement ? codeElement.innerText : '';
        //   if (acceptedCode) {
        //     chrome.storage.local.set({ acceptedCode }, () => {
        //       console.log('Accepted code stored locally.');
        //       // Optionally, send the code to the background script for further processing
        //       chrome.runtime.sendMessage({ action: 'codeAccepted', code: acceptedCode });
        //     });
        //   }
        // }
      }
    });
  });

  observer.observe(ele, { childList: true, subtree: true });

}

export const alertWhenProblemRuns = async () => {
  // data-e2e-locator="console-run-button"
  // submitbutton = document.querySelector("div [data-e2e-locator=console-submit-button]");
  console.log(document.querySelector('#root'));
  console.log(document.getElementById('newBtn'));
}

const saveCodeToBackend = () => {
  console.log('function to select dom element that has code or select code from local storage');

  // check whether the code is submitted successfully or not, using leetcode api
  // if yes then, handle select dom element

  setTimeout(() => {
    const submittedCode = document.querySelector('code [style="color: rgb(212, 212, 212); font-size: 13px; text-shadow: none; font-family: Menlo, Monaco, Consolas, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, &quot;Courier New&quot;, monospace; direction: ltr; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; line-height: 1.5; tab-size: 4; hyphens: none;"]');
    console.log('submit section', submittedCode);
  }, 5000);
}

// this is for dev purpose and handles run button
setTimeout(() => {
  const runButtonCollection = document.getElementsByClassName("font-medium items-center whitespace-nowrap focus:outline-none inline-flex rounded-none py-1.5 px-3 bg-transparent dark:bg-transparent text-text-primary dark:text-text-primary");
  console.log(runButtonCollection);
  if (runButtonCollection.length > 0) {
    const runButton = runButtonCollection[0];
    console.log(runButton);
    runButton.addEventListener('click', function() {
      saveCodeToBackend();
    });
  } else {
    console.log('Run button not found!');
  }
}, 2000);

// this is for implementation and handles submit button
setTimeout(() => {
  const submitButtonCollection = document.getElementsByClassName("font-medium items-center whitespace-nowrap focus:outline-none inline-flex relative select-none rounded-none px-3 py-1.5 bg-transparent dark:bg-transparent text-green-60 dark:text-green-60");
  // console.log(submitButtonCollection);
  if (submitButtonCollection.length > 0) {
    const submitButton = submitButtonCollection[0];
    console.log(submitButton);
    submitButton.addEventListener('click', function() {
      saveCodeToBackend();
    });
  } else {
    console.log('Submit button not found!');
  }
}, 2000);

