<h2 class="osg-heading-3">Use</h2>
<p>Ideally, place the modal in the DOM before the body tag.</p>
<p>The modal should contain a parent container with the class name <strong> .osg-parent-modal </strong> to help place the modal in the center of the page.</p>

<h2 class="osg-heading-3">Accessibility</h2>
<ul>
  <li>The keyboard focus should be moved inside de modal when opened and restored to the previous activeElement when the modal was closed.</li>
  <li>The keyboard focus should be trapped within the modal.</li>
  <li>Set aria-hidden="false" when the dialog is open.</li>
  <li>The content behind the modal should have aria-hidden="true" and toggle it to "false" when the modal is closed.</li>
</ul>
