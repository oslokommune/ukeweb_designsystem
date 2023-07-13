export function OsgCheckbox1() {
  // const checkboxCheckmark = document.querySelector(".osg-checkbox__checkmark");
  let inputs = document.querySelectorAll(".osg-checkbox__input");
  let mouseFocus = false;

  // for (let i = 0; i < checkboxCheckmark.length; i++) {
  //     let checkbox = checkboxCheckmark[i];

  //   checkboxCheckmark.addEventListener("mousedown", (event) => {
  //     console.log("focus:true mousedown");
  //     mouseFocus = true;
  //   });
  // }

  for (let i = 0; i < inputs.length; i++) {    
    let input = inputs[i];
    let siblingCheckbox = input.nextElementSibling;

    if (siblingCheckbox && input.type === "checkbox") {
      siblingCheckbox.addEventListener("mousedown", (event) => {
        console.log("focus:true mouseup");
        event.stopImmediatePropagation();
        event.preventDefault();
        mouseFocus = true;
      });
    }

    input.addEventListener("blur", (event) => {
      mouseFocus = false;
      console.log("removed!", input);
      input.classList.remove("osg-checkbox__focused");
    });

    input.addEventListener("keyup", (event) => {
      if (!mouseFocus) {
        if (event.keyCode == 9 || event.keyCode == 32) { 
            console.log("bobbi go!", input);
            input.classList.add("osg-checkbox__focused");   
        }
      }
    });
  }
}
