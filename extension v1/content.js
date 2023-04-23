chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'runExtension') {
    let result = processActiveInput();
    if (result) {
      sendResponse({ textToSend: result });
    }
  } else if (request.action === 'updateInput') {
    updateActiveInput(request.result);
  }
});

function processActiveInput() {
  let activeElement = document.activeElement;
  if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
    let inputText = activeElement.value;
    let pattern = /\/\/copi (.*)/;

    if (pattern.test(inputText)) {
      return inputText.match(pattern)[1];
    }
  }
  return null;
}

function updateActiveInput(result) {
  let activeElement = document.activeElement;
  if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
    let inputText = activeElement.value;
    let pattern = /\/\/copi .*/;
    activeElement.value = inputText.replace(pattern, result);
  }
}
