## General

Can be placed side by side with another component/element on breakpoint medium.

After the opening hours, you can add as many `<div class="osg-opening-hours__extra">...</div>` as you need to add other relevant content / components.
## Navigation

The use of `osg-opening-hours__navigation` + `osg-opening-hours__week` is optional.

If you use navigation and week/date indicators, you also *must*:
- Apply the `osg-opening-hours__day--today` modifier
- Apply the `osg-opening-hours__day--past` modifier to days in the past
- Add `<span class="osg-opening-hours__exception-indicator">*</span>` if the day has an exception from normal hours.
