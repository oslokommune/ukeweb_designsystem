/**
 * custom dispatch event function. Call this instead of new CustomEvent.
 */
function dispatchCustomEvent(eventName, eventDetail, element) {
  const event = new CustomEvent(eventName, {
    detail: eventDetail,
  });

  element.dispatchEvent(event);
}

export default dispatchCustomEvent;
