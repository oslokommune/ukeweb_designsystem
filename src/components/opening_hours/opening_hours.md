## General

Can be placed side by side with another component/element on breakpoint medium.

After the opening hours, you can add as many `<div class="osg-opening-hours__extra">...</div>` as you need to add other relevant content / components.
## Navigation

The use of `osg-opening-hours__navigation` + `osg-opening-hours__week` is optional.

If you use navigation and week/date indicators, you also *must*:
- Apply the `osg-opening-hours__day--today` modifier to today.
- Apply the `osg-opening-hours__day--past` modifier to days in the past.
- If you have the data - add `<span class="osg-opening-hours__exception-indicator">*</span>` if the day has an exception from normal hours. Also add a `<div class="osg-opening-hours__extra">* Explanation</div>` below the hours.
