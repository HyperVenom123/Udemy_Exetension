chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "runBatchFile") {
      // Send a request to the local server (the helper application)
      fetch('http://localhost:3000/run-batch', { method: 'POST' })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
  }
});
