## General

Can be placed side by side with another component/element on breakpoint medium and up.

After the opening hours, you can add as many `<div class="osg-opening-hours__extra">...</div>` as you need to add other relevant content / components.
## Navigation

The use of `osg-opening-hours__navigation` + `osg-opening-hours__week` is optional.

If you use navigation and week/date indicators, you also *must*:
- Apply the `osg-opening-hours__day--today` modifier to today.
- Apply the `osg-opening-hours__day--past` modifier to days in the past.
- If you have the data - add `<span class="osg-opening-hours__exception-indicator">*</span>` if the day has an exception from normal hours. Also add a `<div class="osg-opening-hours__extra"><span class="osg-text-7">* Explanation</span></div>` below the hours.

## Accessibility

When the user navigates to the previous and next week, the table content will change, therefore we need to notify the screen reader with aria-alert="polite" and link the table caption and the links with aria-controls.
The caption is only available to screen readers and the heading is hidden to screen readers so they don't read duplicate information.
