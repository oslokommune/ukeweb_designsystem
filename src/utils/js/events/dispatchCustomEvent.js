/**
 * Custom dispatch event function. Call this instead of new CustomEvent.
 */
function dispatchCustomEvent(eventName, eventDetail, eventObject) {
  if (typeof eventObject.dispatchEvent !== 'function') {
    throw new Error('invalid event target');
  }

  const event = new CustomEvent(eventName, {
    detail: eventDetail,
  });

  eventObject.dispatchEvent(event);
}

export default dispatchCustomEvent;
