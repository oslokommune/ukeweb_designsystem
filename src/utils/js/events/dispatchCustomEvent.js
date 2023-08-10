/**
 * Common functions
 */
function dispatchCustomEvent(eventName, eventDetail, element) {
  const event = new CustomEvent(eventName, {
    detail: eventDetail,
  });

  element.dispatchEvent(event);
}

export default dispatchCustomEvent;
