export function OsgTextArea() {
  const textarea = document.getElementsByClassName("osg-textarea");

  if (textarea.length > 0) {
    for (var i = 0; i < textarea.length; i++) {
      console.log(textarea[i]);
      textarea[i].addEventListener("keypress", charcountupdate.bind(textarea[i]));
    }
  }

  function charcountupdate(str) {
    let textValue = str.target.getElementsByClassName("osg-textarea__textarea")[0];
    console.log(this.value);

    //console.log(textValue);

    str.target.getElementsByClassName("osg-textarea__countdown-characters")[0].innerHTML = "/500";
  }
}

// const key = str.keyCode || str.charCode;
// if (key == 8 || key == 46) {
//   total--;
// } else {
//   total++;
// }
//console.log(total);
