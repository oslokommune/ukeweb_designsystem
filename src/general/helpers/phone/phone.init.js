import OdsPhone from './phone';

document.addEventListener('DOMContentLoaded', () => {
  const testCasesElement = document.getElementById('testcases-phone');
  if (testCasesElement) {
    const testCases = [
      { result: OdsPhone.format('22334455'), code: "OdsPhone.format('22334455')" },
      { result: OdsPhone.format('98765432'), code: "OdsPhone.format('98765432')" },
      { result: OdsPhone.format('+47 987 65 432'), code: "OdsPhone.format('+47 987 65 432')" },
      { result: OdsPhone.format('004722334455'), code: "OdsPhone.format('004722334455')" },
      { result: OdsPhone.format('80033333'), code: "OdsPhone.format('80033333')" },
      { result: OdsPhone.format('02180'), code: "OdsPhone.format('02180')" },
      { result: OdsPhone.format('116117'), code: "OdsPhone.format('116117')" },
      { result: OdsPhone.format(112), code: 'OdsPhone.format(112)' },
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
