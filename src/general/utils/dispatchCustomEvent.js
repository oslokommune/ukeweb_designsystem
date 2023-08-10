// custom event dispatcher
function dispatchCustomEvent(eventName, eventDetail, element) {
  const event = new CustomEvent(eventName, {
    detail: eventDetail,
  });
  element.dispatchCustomEvent(event);
}

export default dispatchCustomEvent;
