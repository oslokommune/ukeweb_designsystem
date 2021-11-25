const monthNames = {
  no: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

function zeroPad(number) {
  return number < 10 ? "0" + number : number;
}

function dateAsText(date, iso) {
  const day = date.getDate();
  const month = monthNames[iso][date.getMonth()];
  const year = date.getFullYear();

  switch (iso) {
    case "no":
      return `${day}. ${month} ${year}`;
    case "en":
      return `${zeroPad(day)} ${month} ${year}`;
  }
}

function dateAsNumbers(date, iso) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  switch (iso) {
    case "no":
      return `${day}.${month}.${year}`;
    case "en":
      return `${zeroPad(day)}.${zeroPad(month)}.${year}`;
  }
}

function dateToString(date, text, iso) {
  return text ? dateAsText(date, iso) : dateAsNumbers(date, iso);
}

export const OsgDateTime = {
  formatDate(date, text = false, iso = "no") {
    if (date instanceof Date && !isNaN(date)) {
      switch (iso) {
        case "no":
        case "en":
          return dateToString(date, text, iso);
        default:
          console.error("OsgDate.format: iso is unsupported");
      }
    }
    console.error("OsgDate.format: date is not a Date object");
  },

  formatTime(date) {
    if (date instanceof Date && !isNaN(date)) {
      const hours = date.getHours();
      const minutes = date.getMinutes();

      return `${zeroPad(hours)}:${zeroPad(minutes)}`;
    }
    console.error("OsgDate.format: date is not a Date object");
  },

  formatDateTime(date, text = false, iso = "no") {
    return `${this.formatDate(date, text, iso)} ${this.formatTime(date)}`;
  },
};
