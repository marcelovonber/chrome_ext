chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let text = request.text;
  let api_key = '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';
  let model = 'text-davinci-002';

  fetch('https://api.openai.com/v1/engines/' + model + '/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + api_key
    },
    body: JSON.stringify({
      prompt: text,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.7,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      let result = data.choices[0].text.trim();
      sendResponse({ result: result });
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  return true;
});
