document.getElementById('runExtension').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ['content.js'],
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'runExtension' }, (response) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
            } else {
              chrome.runtime.sendMessage({ action: 'callOpenAI', text: response.textToSend }, (response) => {
                if (response && response.result) {
                  chrome.tabs.sendMessage(tabs[0].id, { action: 'updateInput', result: response.result });
                }
              });
            }
          });
        }
      }
    );
  });
});
