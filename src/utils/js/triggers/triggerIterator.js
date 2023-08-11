// Reusable triggerIterator, takes in a selector as an arugment to make it reusable

function triggerIterator(selector, callback) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((item) => {
    callback(item);
  });
}

export default triggerIterator;
