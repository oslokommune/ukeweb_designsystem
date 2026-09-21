import OdsFileSize from './filesize';

document.addEventListener('DOMContentLoaded', () => {
  const testCasesElement = document.getElementById('testcases-filesize');
  if (testCasesElement) {
    const testCases = [
      { result: OdsFileSize.format(1), code: 'OdsFileSize.format(1)' },
      { result: OdsFileSize.format(300), code: 'OdsFileSize.format(300)' },
      { result: OdsFileSize.format(150000), code: 'OdsFileSize.format(150000)' },
      { result: OdsFileSize.format(1000000), code: 'OdsFileSize.format(1000000)' },
      { result: OdsFileSize.format(200000000), code: 'OdsFileSize.format(200000000)' },
      { result: OdsFileSize.format(800000000), code: 'OdsFileSize.format(800000000)' },
      { result: OdsFileSize.format(80000000000), code: 'OdsFileSize.format(80000000000)' },
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
