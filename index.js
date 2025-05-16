function setClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let hrValue = (hours * 30) + (minutes * 6) / 12;
  let minValue = minutes * 6;
  let secValue = seconds * 6;

  document.querySelector(".hr-hand").style.transform = "rotate(" + hrValue + "deg)";
  document.querySelector(".min-hand").style.transform = "rotate(" + minValue + "deg)";
  document.querySelector(".sec-hand").style.transform = "rotate(" + secValue + "deg)";
}

setInterval(setClock, 1000);


// counter
let label = document.querySelector(".label");
let count = parseInt(label.textContent);
const Increment = () => {
  count = count + 1;
  label.textContent = count;
}

const Decrement = () => {
  if (count <= 0) {
    count = 0
  }
  else {
    count = count - 1;
  }
  label.textContent = count;
}



// table
const getLocalStorageData = ()=>{
  const data = JSON.parse(localStorage.getItem('counterTable')) || [];
  data.forEach(row => addRowToTable(row));
}



const addNewCounter = () => {
  if (count == 0) return;

  const now = new Date();
  const data = {
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    passengerCount: count
  };
  
     // Add to table
      addRowToTable(data);

       // Save to localStorage
      const dataInLocalStorage = JSON.parse(localStorage.getItem('counterTable')) || [];
      dataInLocalStorage.push(data);
      localStorage.setItem('counterTable', JSON.stringify(dataInLocalStorage));

      // Reset count
      count = 0;
      label.textContent = count;
}



const addRowToTable = (data) =>{
const row = document.querySelector("tbody");
row.innerHTML += `<tr>
                     <td>${data.date}</td>
                     <td>${data.time}</td>
                     <td>${data.passengerCount}</td>
                  </tr>`;
}

const clearTable = ()=>{
 localStorage.removeItem('counterTable');
 document.querySelector("tbody").innerHTML = ""; // امسح محتوى الجدول من الصفحة
}

window.addEventListener("DOMContentLoaded", () => {
  getLocalStorageData();

  document.querySelector(".save-button").addEventListener("click", addNewCounter);
  document.querySelector(".incButton").addEventListener("click", Increment);
  document.querySelector(".decButton").addEventListener("click", Decrement);
  document.querySelector(".clear").addEventListener("click", clearTable)
});