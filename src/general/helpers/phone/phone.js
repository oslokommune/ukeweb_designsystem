function groupDigits(digits, groups, separator) {
  const parts = [];
  let index = 0;
  groups.forEach((size) => {
    parts.push(digits.slice(index, index + size));
    index += size;
  });

  return parts.join(separator);
}

const OdsPhone = {
  // Groups phone numbers according to Språkrådet (https://www.sprakradet.no/sprakhjelp/Skriveregler/Dato/#tlf):
  // eight digit numbers in pairs (22 33 44 55), 800-numbers as 3-2-3 (800 33 333), five digit numbers without spaces (02180)
  format(number, options = {}) {
    const settings = {
      // Hard space so the number is not wrapped across lines
      separator: '\u00a0',
      ...options,
    };

    if (number === null || typeof number === 'undefined') {
      return '';
    }

    // Strips everything except digits and "+" (e.g. spaces, hyphens, parentheses), see https://regex101.com/r/BiEcKV/1
    let digits = String(number).replace(/[^+\d]/g, '');
    let countryCode = '';

    if (digits.startsWith('+47') || digits.startsWith('0047')) {
      countryCode = `+47${settings.separator}`;
      // Strips a leading Norwegian country code ("+47" or "0047"), see https://regex101.com/r/IwJDvw/1
      digits = digits.replace(/^(\+47|0047)/, '');
    } else if (digits.startsWith('+') || digits.startsWith('00')) {
      // Non-Norwegian country code, return the number cleaned but ungrouped
      return digits;
    }

    let formatted = digits;

    if (digits.length === 8 && digits.startsWith('8')) {
      formatted = groupDigits(digits, [3, 2, 3], settings.separator);
    } else if (digits.length === 8) {
      formatted = groupDigits(digits, [2, 2, 2, 2], settings.separator);
    } else if (digits.length === 6 && digits.startsWith('116')) {
      // Six digit harmonized numbers like 116 117 (legevakt)
      formatted = groupDigits(digits, [3, 3], settings.separator);
    }

    return countryCode + formatted;
  },
};

export default OdsPhone;
