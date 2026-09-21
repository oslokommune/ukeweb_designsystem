import OdsCurrency from './currency';

document.addEventListener('DOMContentLoaded', () => {
  const testCasesElement = document.getElementById('testcases-currency');
  if (testCasesElement) {
    const testCases = [
      { result: OdsCurrency.format(1234.56), code: 'OdsCurrency.format(1234.56)' },
      { result: OdsCurrency.format(1234.56, { decimals: 2 }), code: 'OdsCurrency.format(1234.56, { decimals: 2 })' },
      { result: OdsCurrency.format(1500000, { unit: 'kr' }), code: "OdsCurrency.format(1500000, { unit: 'kr' })" },
      { result: OdsCurrency.format(1500, { unit: '', prefix: 'kr ' }), code: "OdsCurrency.format(1500, { unit: '', prefix: 'kr ' })" },
      { result: OdsCurrency.format('2 500,75'), code: "OdsCurrency.format('2 500,75')" },
      { result: OdsCurrency.format(-99.6), code: 'OdsCurrency.format(-99.6)' },
    ];

    testCases.forEach((testCase) => {
      const testCaseElement = document.createElement('div');
      testCaseElement.classList.add('ods-margin-bottom-8');
      testCaseElement.innerHTML = `<div>${testCase.result}</div>`;
      testCaseElement.innerHTML += `<code class="ods-code ods-block ods-margin-top-10">${testCase.code}</code>`;
      testCasesElement.appendChild(testCaseElement);
    });
  }
});
