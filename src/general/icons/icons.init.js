const uiIconsList = [
  '24h',
  'ambulance',
  'attachment',
  'automat',
  'backpack',
  'bike',
  'briefcase',
  'bullseye',
  'bus',
  'cafe',
  'calendar',
  'camera',
  'check',
  'check-big',
  'check-circle',
  'clock',
  'close',
  'coin-stacks',
  'corona',
  'crane',
  'cross',
  'cross-circle',
  'data',
  'directions',
  'district',
  'document',
  'download',
  'edit',
  'elcar',
  'email',
  'exclamation-mark-circle',
  'exclamation-mark-square',
  'exit',
  'expand',
  'eye',
  'factory-fill',
  'feedback',
  'filter',
  'fire-emblem',
  'graph',
  'grid',
  'handicap',
  'heart',
  'heart-plus',
  'home',
  'house-heart',
  'information',
  'invoice',
  'language',
  'list',
  'location-pin',
  'location-pin-filled',
  'magnifying-glass-big',
  'magnifying-glass-small',
  'map',
  'map-layer',
  'menu',
  'message',
  'minimize',
  'mobile',
  'museum',
  'new-window',
  'obstacle',
  'organization',
  'paint-bucket',
  'paper-plane',
  'park',
  'parking',
  'picture',
  'print',
  'question',
  'recycling',
  'save',
  'share',
  'share-outline',
  'signing',
  'sky',
  'sound-off',
  'sound-on',
  'swingset',
  'table',
  'target',
  'tickets',
  'tool',
  'trail',
  'tram',
  'trash',
  'treatment',
  'user',
  'water-faucet',
  'wifi',
  'error-hexa',
  'success-square',
  'warning-triangle',
  'lock-locked',
  'adjust',
  'apple',
  'archive',
  'arrow-circle',
  'character-exclamation-mark',
  'character-information',
  'cogwheel',
  'computer',
  'copy',
  'document-code',
  'document-pdf',
  'document-plain',
  'document-table',
  'document-text',
  'folder',
  'law-paragraph',
  'lock-unlocked',
  'qr-code',
  'ruler',
  'link',
];

uiIconsList.sort();

document.addEventListener('DOMContentLoaded', () => {
  const uiIconsElement = document.getElementById('ui-icons');
  if (uiIconsElement) {
    const uiIcons = uiIconsList.map((icon) => {
      const column = document.createElement('div');
      column.classList.add('ods-grid__column--3');

      const panel = document.createElement('div');
      panel.classList.add('ods-color-bg-gray-light', 'ods-text--align-center', 'ods-padding-3');

      const iconName = document.createElement('p');
      iconName.classList.add('ods-padding-bottom-3');
      iconName.textContent = icon;

      const iconElement = document.createElement('span');
      iconElement.classList.add('ods-icon', 'ods-icon--standalone', 'ods-icon--size-golf', `ods-icon--${icon}`);
      iconElement.setAttribute('aria-hidden', 'true');

      panel.append(iconName, iconElement);
      column.append(panel);

      return column;
    });

    uiIconsElement.append(...uiIcons);
  }
});
