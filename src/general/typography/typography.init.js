document.addEventListener("DOMContentLoaded", function () {
  /* Generate markup for sizes */
  const typesPlaceholder = document.getElementById("types-placeholder");
  const types = [
    {
      title: "54-Alfa",
      name: "alfa",
      size: "3.375rem (54px)",
      lineHeight: "5.125rem (82px)",
      letterSpacing: "-0.4px",
    },
    {
      title: "40-Bravo",
      name: "bravo",
      size: "2.5rem (40px)",
      lineHeight: "3.75rem (60px)",
      letterSpacing: "-0.2px",
    },
    {
      title: "36-Charlie",
      name: "charlie",
      size: "2.25rem (36px)",
      lineHeight: "3.375rem (54px)",
      letterSpacing: "-0.2px",
    },
    {
      title: "30-Delta",
      name: "delta",
      size: "1.875rem (30px)",
      lineHeight: "2.75rem (44px)",
      letterSpacing: "-0.2px",
    },
    {
      title: "28-Echo",
      name: "echo",
      size: "1.75rem (28px)",
      lineHeight: "2.625rem (42px)",
      letterSpacing: "-0.2px",
    },
    {
      title: "26-Foxtrot",
      name: "foxtrot",
      size: "1.625rem (26px)",
      lineHeight: "2.5rem (40px)",
      letterSpacing: "-0.2px",
    },
    {
      title: "24-Golf",
      name: "golf",
      size: "1.5rem (24px)",
      lineHeight: "2.25rem (36px)",
      letterSpacing: "-0.2px",
    },
    {
      title: "22-Hotel",
      name: "hotel",
      size: "1.375rem (22px)",
      lineHeight: "2.125rem (34px)",
      letterSpacing: "-0.2px",
    },
    {
      title: "20-India",
      name: "india",
      size: "1.25rem (20px)",
      lineHeight: "2rem (32px)",
      letterSpacing: "-0.2px",
    },
    {
      title: "18-Juliett",
      name: "juliett",
      size: "1.125rem (18px)",
      lineHeight: "1.75rem (28px)",
      letterSpacing: "-0.2px",
    },
    {
      title: "16-Kilo",
      name: "kilo",
      size: "1rem (16px)",
      lineHeight: "1.5rem (24px)",
      letterSpacing: "-0.2px",
    },
    {
      title: "14-Lima",
      name: "lima",
      size: "0.875rem (14px)",
      lineHeight: "1.375rem (22px)",
      letterSpacing: "-0.2px",
    },
  ];

  if (typesPlaceholder) {
    types.forEach((type) => {
      const typeElement = document.createElement("div");
      typeElement.classList.add("osg-grid__column--12");
      typeElement.innerHTML = `<div class="osg-text-size-${type.name} osg-margin-bottom-3" data-size="true">${type.title}</div>`;
      typesPlaceholder.appendChild(typeElement);

      const typeMetaElement = document.createElement("div");
      typeMetaElement.classList.add("osg-grid__column--12");
      typeMetaElement.innerHTML = `<div class="osg-grid osg-text-size-kilo"><div class="osg-grid__column--3"><span class="osg-text-weight-medium">Size</span> ${type.size}</div><div class="osg-grid__column--3"><span class="osg-text-weight-medium">Line-height</span> ${type.lineHeight}</div><div class="osg-grid__column--3"><span class="osg-text-weight-medium">Letter-spacing</span> ${type.letterSpacing}</div><div class="osg-grid__column--3"><span class="osg-text-weight-medium">Class</span> .osg-text-size-${type.name}</div></div>`;
      typesPlaceholder.appendChild(typeMetaElement);

      const typeDividerElement = document.createElement("div");
      typeDividerElement.classList.add("osg-grid__column--12");
      typeDividerElement.classList.add("osg-margin-vertical-4");
      typeDividerElement.innerHTML = `<div class="osg-divider"></div>`;
      typesPlaceholder.appendChild(typeDividerElement);
    });
  }

  /* Add events to toggle buttons */
  const typeButtons = document.querySelectorAll("#type-buttons button");
  if (typeButtons && typesPlaceholder) {
    const typeElements = typesPlaceholder.querySelectorAll("[data-size]");
    typeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        if (button.getAttribute("data-type") === "weight") {
          typeElements.forEach((element) => {
            element.classList.remove("osg-text-weight-light");
            element.classList.remove("osg-text-weight-medium");
            element.classList.remove("osg-text-weight-bold");
          });

          document.querySelectorAll("#type-buttons button[data-type='weight']").forEach((el) => {
            el.classList.add("osg-button--outline");
          });
        } else if (button.getAttribute("data-type") === "style") {
          typeElements.forEach((element) => {
            element.classList.remove("osg-text-style-italic");
          });

          document.querySelectorAll("#type-buttons button[data-type='style']").forEach((el) => {
            el.classList.add("osg-button--outline");
          });
        }
        if (button.getAttribute("data-class")) {
          typeElements.forEach((element) => {
            element.classList.add(button.getAttribute("data-class"));
          });
        }

        button.classList.remove("osg-button--outline");
      });
    });
  }
});
