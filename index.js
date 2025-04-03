'use strict';
            const moreText = document.getElementById("moreText");
            const btn = document.querySelector(".read-more-btn");
            const btn2 = document.querySelector(".read-less-btn");
            function toggleText() {
                
                
                if (moreText.style.display === "none" || moreText.style.display === "") {
                    moreText.style.display = "block";
                    btn.style.display = "none";
                    btn2.style.display = "block";
                } 
            }
            function removeText() {
                
                
                if (moreText.style.display === "block") {
                    moreText.style.display = "none";
                    btn.style.display = "block";
                    btn2.style.display = "none";
                } 
            }
          
    






// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
modalContainer.classList.toggle("active");
overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

testimonialsItem[i].addEventListener("click", function () {

modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

testimonialsModalFunc();

});

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
selectItems[i].addEventListener("click", function () {

let selectedValue = this.innerText.toLowerCase();
selectValue.innerText = this.innerText;
elementToggleFunc(select);
filterFunc(selectedValue);

});
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

for (let i = 0; i < filterItems.length; i++) {

if (selectedValue === "all") {
  filterItems[i].classList.add("active");
} else if (selectedValue === filterItems[i].dataset.category) {
  filterItems[i].classList.add("active");
} else {
  filterItems[i].classList.remove("active");
}

}

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

filterBtn[i].addEventListener("click", function () {

let selectedValue = this.innerText.toLowerCase();
selectValue.innerText = this.innerText;
filterFunc(selectedValue);

lastClickedBtn.classList.remove("active");
this.classList.add("active");
lastClickedBtn = this;

});

}













// tool slection

document.addEventListener("DOMContentLoaded", function () {
    // Select elements
    const select = document.querySelector("[tool-select]");
    const selectItems = document.querySelectorAll("[tool-select-item]");
    const selectValue = document.querySelector("[tool-select-value]");
    const filterBtns = document.querySelectorAll("[tool-filter-btn]");
    const filterItems = document.querySelectorAll("[data-filter-item]");

    let lastClickedBtn = document.querySelector("[tool-filter-btn].active") || filterBtns[0];

    // Toggle dropdown menu
    select.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent immediate closing
        this.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!select.contains(event.target)) {
            select.classList.remove("active");
        }
    });

    // Function to format category names
    const formatCategory = (text) => text.toLowerCase().replace(/ & | /g, "-").replace(/\s+/g, "-");

    // Function to filter items
    const filterFunc = function (selectedCategory) {
        filterItems.forEach(item => {
            if (selectedCategory === "all" || item.dataset.category === selectedCategory) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    };

    // Handle category selection from dropdown
    selectItems.forEach(item => {
        item.addEventListener("click", function () {
            const selectedValue = item.textContent.trim();
            selectValue.textContent = selectedValue;
            select.classList.remove("active"); // Close dropdown
            filterFunc(formatCategory(selectedValue)); // Filter items
        });
    });

    // Handle filter button clicks
    filterBtns.forEach(button => {
        button.addEventListener("click", function () {
            // Remove active class from the previous button
            lastClickedBtn.classList.remove("active");
            this.classList.add("active"); // Mark clicked button as active
            lastClickedBtn = this;

            const category = formatCategory(this.textContent.trim());
            filterFunc(category);
        });
    });
});













  
  


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
formInputs[i].addEventListener("input", function () {

// check form validation
if (form.checkValidity()) {
  formBtn.removeAttribute("disabled");
} else {
  formBtn.setAttribute("disabled", "");
}

});
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
navigationLinks[i].addEventListener("click", function () {

for (let i = 0; i < pages.length; i++) {
  if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
    pages[i].classList.add("active");
    navigationLinks[i].classList.add("active");
    window.scrollTo(0, 0);
  } else {
    pages[i].classList.remove("active");
    navigationLinks[i].classList.remove("active");
  }
}

});
}


// testimonials variables
const toolsItem = document.querySelectorAll("[data-tool-item]");
const toolContainer = document.querySelector("[tool-modal-container]");
const toolCloseBtn = document.querySelector("[tool-modal-close-btn]");
const tooloverlay = document.querySelector("[tool-overlay]");

// modal variable
const toolImg = document.querySelector("[tool-modal-img]");
const toolTitle = document.querySelector("[tool-modal-title]");
const toolText = document.querySelector("[tool-modal-text]");

// modal toggle function
const toolsModalFunc = function () {
toolContainer.classList.toggle("active");
tooloverlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < toolsItem.length; i++) {
toolsItem[i].addEventListener("click", function () {
// Update modal image and title
toolImg.src = this.querySelector("[data-tool-avatar]").src;
toolImg.alt = this.querySelector("[data-tool-avatar]").alt;
toolTitle.innerHTML = this.querySelector("[data-tool-title]").innerHTML;

// Find the correct template inside the clicked tool
const toolTemplate = this.querySelector("[data-tool-machine]");

// Clone the template content and append it to the modal
if (toolTemplate) {
 const clone = toolTemplate.content.cloneNode(true);
 toolText.innerHTML = ""; // Clear previous content
 toolText.appendChild(clone);
}

// Open the modal
toolsModalFunc();
});
}

// add click event to modal close button
toolCloseBtn.addEventListener("click", toolsModalFunc);
tooloverlay.addEventListener("click", toolsModalFunc);




// <!-- change section on other that nav section buttons -->


// Page navigation variables  
const navigationLins = document.querySelectorAll("[data-nav-link]");  
const pags = document.querySelectorAll("[data-page]");  

// Function to handle section switching  
function showSection(sectionName) {  
for (let i = 0; i < pags.length; i++) {  
if (pags[i].dataset.page === sectionName) {  
 pags[i].classList.add("active");  
 pags[i].style.display = "block";  
 if (navigationLins[i]) {  
   navigationLins[i].classList.add("active");  
 }  
} else {  
 pags[i].classList.remove("active");  
 pags[i].style.display = "none";  
 if (navigationLins[i]) {  
   navigationLins[i].classList.remove("active");  
 }  
}  
}  
}  

// Add event listener to all navbar links  
for (let i = 0; i < navigationLins.length; i++) {  
navigationLins[i].addEventListener("click", function () {  
const sectionName = this.innerHTML.toLowerCase();  
showSection(sectionName);  
window.scrollTo(0, 0); // Ensure smooth scrolling to top when switching  
});  
};  

// Function to open resume and scroll to skills  
function viewSec(sectionName) {  
showSection(sectionName);  

if (sectionName === 'resume') {
setTimeout(() => {  
const targetElement = document.querySelector("#skills");  
if (targetElement) {  
 targetElement.scrollIntoView({ behavior: "smooth", block: "start" });  
}  
}, 100);
}  
}




















// <!--
// #T000000000000000000000000000000       00000000000000       000000000    0000000000000      
// #T0000                  0000000     o      000000000     o    0000000    0000000000000      
// #T0000                  00000     00000     000000     00000    00000    0000000000000      
// #T00000000000     000000000      0000000    0000      0000000    0000    0000000000000      
// #T00000000000     000000000     000000000    000     000000000    000    0000000000000      
// #T00000000000     000000000    00000000000    oo    00000000000    oo    0000000000000      
// #T00000000000     000000000     000000000     oo     000000000     oo    0000000000000      
// #T00000000000     0000000000       0000     000000      0000     0000              000      
// #T00000000000     0000000000000             00000000             0000              000      
//  -->

function temperatureConvert() {
    let temp = parseFloat(document.getElementById("temperature").value);
    let fromUnit = document.getElementById("fromTemperatureUnit").value;
    let toUnit = document.getElementById("toTemperatureUnit").value;
    let result;
  
    if (fromUnit === "celsius") {
      result = toUnit === "fahrenheit" ? (temp * 9/5) + 32 : temp + 273.15;
    } else if (fromUnit === "fahrenheit") {
      result = toUnit === "celsius" ? (temp - 32) * 5/9 : ((temp - 32) * 5/9) + 273.15;
    } else {
      result = toUnit === "celsius" ? temp - 273.15 : (temp - 273.15) * 9/5 + 32;
    }
  
    document.getElementById("temperatureResult").value = result.toFixed(2);
  }
  
  function lengthConvert() {
    let length = parseFloat(document.getElementById("length").value);
    let fromUnit = document.getElementById("fromLengthUnit").value;
    let toUnit = document.getElementById("toLengthUnit").value;
    let conversionFactors = {
      "meters": 1, "kilometers": 0.001, "miles": 0.000621371, "feet": 3.28084, "inches": 39.3701
    };
  
    let result = length * (conversionFactors[toUnit] / conversionFactors[fromUnit]);
    document.getElementById("lengthResult").value = result.toFixed(2);
  }
  
  function weightConvert() {
    let weight = parseFloat(document.getElementById("weight").value);
    let fromUnit = document.getElementById("fromWeightUnit").value;
    let toUnit = document.getElementById("toWeightUnit").value;
    let conversionFactors = {
      "grams": 1, "kilograms": 0.001, "pounds": 0.00220462, "ounces": 0.035274
    };
  
    let result = weight * (conversionFactors[toUnit] / conversionFactors[fromUnit]);
    document.getElementById("weightResult").value = result.toFixed(2);
  }
  
  function speedConvert() {
    let speed = parseFloat(document.getElementById("speed").value);
    let fromUnit = document.getElementById("fromSpeedUnit").value;
    let toUnit = document.getElementById("toSpeedUnit").value;
    let conversionFactors = {
      "mps": 1, "kmph": 3.6, "mph": 2.23694, "knots": 1.94384
    };
  
    let result = speed * (conversionFactors[toUnit] / conversionFactors[fromUnit]);
    document.getElementById("speedResult").value = result.toFixed(2);
  }
  
  function timeConvert() {
    let time = parseFloat(document.getElementById("time").value);
    let fromUnit = document.getElementById("fromTimeUnit").value;
    let toUnit = document.getElementById("toTimeUnit").value;
    let conversionFactors = {
      "seconds": 1, "minutes": 1/60, "hours": 1/3600, "days": 1/86400
    };
  
    let result = time * (conversionFactors[toUnit] / conversionFactors[fromUnit]);
    document.getElementById("timeResult").value = result.toFixed(2);
  }
  
  function areaConvert() {
    let area = parseFloat(document.getElementById("area").value);
    let fromUnit = document.getElementById("fromAreaUnit").value;
    let toUnit = document.getElementById("toAreaUnit").value;
    let conversionFactors = {
      "square_meters": 1, "square_kilometers": 0.000001, "square_feet": 10.7639, "square_inches": 1550.0031
    };
  
    let result = area * (conversionFactors[toUnit] / conversionFactors[fromUnit]);
    document.getElementById("areaResult").value = result.toFixed(2);
  }
  
  function volumeConvert() {
    let volume = parseFloat(document.getElementById("volume").value);
    let fromUnit = document.getElementById("fromVolumeUnit").value;
    let toUnit = document.getElementById("toVolumeUnit").value;
    let conversionFactors = {
      "liters": 1, "milliliters": 1000, "cubic_meters": 0.001, "gallons": 0.264172
    };
  
    let result = volume * (conversionFactors[toUnit] / conversionFactors[fromUnit]);
    document.getElementById("volumeResult").value = result.toFixed(2);
  }
  
  
  // Loan Calculator
  function calculateLoan() {
  const loanAmount = parseFloat(document.getElementById("loanAmount").value);
  const interestRate = parseFloat(document.getElementById("interestRate").value);
  const loanTenure = parseFloat(document.getElementById("loanTenure").value);
  
  if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTenure)) {
  alert("Please enter valid numbers.");
  return;
  }
  
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTenure * 12;
  const monthlyEMI =
  (loanAmount *
  monthlyInterestRate *
  Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
  (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  const totalInterest = monthlyEMI * numberOfPayments - loanAmount;
  const totalAmount = monthlyEMI * numberOfPayments;
  
  document.getElementById("monthlyEMI").value = monthlyEMI.toFixed(2);
  document.getElementById("totalInterest").value = totalInterest.toFixed(2);
  document.getElementById("totalAmount").value = totalAmount.toFixed(2);
  }
  
  // Tax Calculator
  function calculateTax() {
  const annualIncome = parseFloat(document.getElementById("annualIncome").value);
  const deductions = parseFloat(document.getElementById("deductions").value);
  
  if (isNaN(annualIncome) || isNaN(deductions)) {
  alert("Please enter valid numbers.");
  return;
  }
  
  const taxableIncome = annualIncome - deductions;
  const taxAmount = taxableIncome * 0.2; // Assuming a flat 20% tax rate
  
  document.getElementById("taxableIncome").value = taxableIncome.toFixed(2);
  document.getElementById("taxAmount").value = taxAmount.toFixed(2);
  }
  
  // Salary Calculator
  function calculateSalary() {
  const grossSalary = parseFloat(document.getElementById("grossSalary").value);
  const salaryDeductions = parseFloat(document.getElementById("salaryDeductions").value);
  
  if (isNaN(grossSalary) || isNaN(salaryDeductions)) {
  alert("Please enter valid numbers.");
  return;
  }
  
  const netSalary = grossSalary - salaryDeductions;
  document.getElementById("netSalary").value = netSalary.toFixed(2);
  }
  
  // Discount Calculator
  function calculateDiscount() {
  const originalPrice = parseFloat(document.getElementById("originalPrice").value);
  const discountPercentage = parseFloat(document.getElementById("discountPercentage").value);
  
  if (isNaN(originalPrice) || isNaN(discountPercentage)) {
  alert("Please enter valid numbers.");
  return;
  }
  
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);
  document.getElementById("discountedPrice").value = discountedPrice.toFixed(2);
  }
  
  // EMI Calculator
  function calculateEMI() {
  const emiLoanAmount = parseFloat(document.getElementById("emiLoanAmount").value);
  const emiInterestRate = parseFloat(document.getElementById("emiInterestRate").value);
  const emiTenure = parseFloat(document.getElementById("emiTenure").value);
  
  if (isNaN(emiLoanAmount) || isNaN(emiInterestRate) || isNaN(emiTenure)) {
  alert("Please enter valid numbers.");
  return;
  }
  
  const monthlyInterestRate = emiInterestRate / 100 / 12;
  const emi =
  (emiLoanAmount *
  monthlyInterestRate *
  Math.pow(1 + monthlyInterestRate, emiTenure)) /
  (Math.pow(1 + monthlyInterestRate, emiTenure) - 1);
  
  document.getElementById("emiResult").value = emi.toFixed(2);
  }
  
              // QR Code Generator
  function generateQRCode() {
    const qrInput = document.getElementById("qrInput").value;
    const qrCodeOutput = document.getElementById("qrCodeOutput");
    const downloadQR = document.getElementById("downloadQR");
    if (!qrInput) {
      alert("Please enter text or a URL.");
      return;
    }
  
    // Clear previous QR code
    qrCodeOutput.innerHTML = "";
  
    // Generate QR code using QRCode.js
    new QRCode(qrCodeOutput, {
      text: qrInput,
      width: 200,
      height: 200,
    });
  }
            
    function convert() {
      // Get values from inputs
      let number = document.getElementById("number").value.trim();
      let fromBase = parseInt(document.getElementById("fromBase").value);
      let toBase = parseInt(document.getElementById("toBase").value);
      let resultField = document.getElementById("result");
      
      if (number === "") {
          resultField.value = "Please enter a number";
          return;
      }
      
      try {
          // Convert input number to decimal base first
          let decimalNumber = parseInt(number, fromBase);
          
          if (isNaN(decimalNumber)) {
              resultField.value = "Invalid input for base " + fromBase;
              return;
          }
          
          // Convert decimal number to target base
          let convertedNumber = decimalNumber.toString(toBase).toUpperCase();
          resultField.value = convertedNumber;
      } catch (error) {
          resultField.value = "Conversion error";
      }
  }
  
  // Scientific Calculator
  function calculateExpression() {
      const input = document.getElementById("calcInput").value;
      try {
          document.getElementById("calcResult").value = eval(input);
      } catch (error) {
          document.getElementById("calcResult").value = "Error";
      }
  }
  
  // Binary to Decimal Converter
  function binaryToDecimal() {
      const binary = document.getElementById("binaryInput").value;
      if (/^[01]+$/.test(binary)) {
          document.getElementById("binaryResult").value = parseInt(binary, 2);
      } else {
          document.getElementById("binaryResult").value = "Invalid Input";
      }
  }
  
  // Factorial Calculation
  function factorial(n) {
      return n === 0 ? 1 : n * factorial(n - 1);
  }
  
  function calculateFactorial() {
      const n = parseInt(document.getElementById("factorialInput").value);
      document.getElementById("factorialResult").value = n >= 0 ? factorial(n) : "Invalid";
  }
  
  // Permutation Calculation (nP2)
  function calculatePermutation() {
      const n = parseInt(document.getElementById("factorialInput").value);
      document.getElementById("factorialResult").value = n >= 2 ? factorial(n) / factorial(n - 2) : "Invalid";
  }
  
  // Age Calculator
  function calculateAge() {
      const birthDate = new Date(document.getElementById("birthDate").value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      document.getElementById("ageResult").value = age >= 0 ? age : "Invalid";
  }
  
  // BMI Calculator
  function calculateBMI() {
      const weight = parseFloat(document.getElementById("bmiWeight").value);
      const height = parseFloat(document.getElementById("bmiHeight").value);
      if (weight > 0 && height > 0) {
          const bmi = (weight / (height * height)).toFixed(2);
          document.getElementById("bmiResult").value = bmi;
      } else {
          document.getElementById("bmiResult").value = "Invalid";
      }
  }
  
  
  // Virtual Time Machine
  function travelInTime() {
    const year = document.getElementById('timeMachineYear').value;
    const events = {
      1924: "Lahore mein pehla radio station khula.",
      1925: "Pakistan ki pehli film release hui.",
      1926: "Allama Iqbal ne apna mashhoor khutba diya.",
      1927: "Karachi mein pehla hawai jahaz utra.",
      1928: "Pakistan mein pehla cricket match khela gaya.",
      1929: "Pehla Urdu akhbar shaya hua.",
      1930: "Gol mez conference London mein hui.",
      1931: "Gandhi aur Jinnah ki mulaqat hui.",
      1932: "Round Table Conference ka dusra daur hua.",
      1933: "Pakistan ka naam pehli baar istemal hua.",
      1934: "Quaid-e-Azam ne Muslim League ki qayadat sambhali.",
      1935: "Government of India Act pass hua.",
      1936: "Muslim League ne elections mein shirkat ki.",
      1937: "Congress ne hukumat banai.",
      1938: "Allama Iqbal ka inteqal hua.",
      1939: "Dusri jang-e-azeem shuru hui.",
      1940: "Qarardad-e-Pakistan pesh hui.",
      1941: "Subhash Chandra Bose ne Azad Hind Fauj banai.",
      1942: "Quit India Tehreek shuru hui.",
      1943: "Bengal mein qehat pada.",
      1944: "Gandhi aur Jinnah ki bat cheet nakam hui.",
      1945: "Dusri jang-e-azeem khatam hui.",
      1946: "Cabinet Mission Pakistan aaya.",
      1947: "Pakistan wujood mein aaya.",
      1948: "Quaid-e-Azam ka inteqal hua.",
      1949: "Qarardad-e-maqasid pass hui.",
      1950: "Pakistan ne apna pehla dastoor banaya.",
      1951: "Liaquat Ali Khan ka qatal hua.",
      1952: "Urdu ko qaumi zuban qarar diya gaya.",
      1953: "Lahore mein martial law laga.",
      1954: "United Front ne elections jeete.",
      1955: "One Unit scheme nafiz hui.",
      1956: "Pakistan Islamic Republic bana.",
      1957: "Suez crisis hua.",
      1958: "Ayub Khan ne martial law lagaya.",
      1959: "Basic Democracies scheme shuru hui.",
      1960: "Indus Water Treaty hua.",
      1961: "Space mein pehla insan pahuncha.",
      1962: "Naya dastoor nafiz hua.",
      1963: "Kennedy ka qatal hua.",
      1964: "Ayub Khan ne elections jeete.",
      1965: "Pakistan aur India ki jang hui.",
      1966: "Tashkent muahida hua.",
      1967: "Six Day War hui.",
      1968: "Ayub Khan ke khilaf tehreek shuru hui.",
      1969: "Chand par insan utre.",
      1970: "Pakistan mein elections hue.",
      1971: "Bangladesh wujood mein aaya.",
      1972: "Simla muahida hua.",
      1973: "Naya dastoor nafiz hua.",
      1974: "Pakistan ne atomic test kiya.",
      1975: "Indira Gandhi ne emergency lagai.",
      1976: "Mao Zedong ka inteqal hua.",
      1977: "Zia-ul-Haq ne martial law lagaya.",
      1978: "Camp David Accord hua.",
      1979: "Soviet Union ne Afghanistan par hamla kiya.",
      1980: "Iran-Iraq jang shuru hui.",
      1981: "Space shuttle launch hua.",
      1982: "Lebanon par Israel ka hamla hua.",
      1983: "Pakistan mein MRD tehreek shuru hui.",
      1984: "Bhopal gas tragedy hui.",
      1985: "Geneva Summit hui.",
      1986: "Chernobyl hadsa hua.",
      1987: "Intifada shuru hua.",
      1988: "Zia-ul-Haq ka hawai jahaz hadsa hua.",
      1989: "World Wide Web ijad hua.",
      1990: "Gulf War shuru hui.",
      1991: "Soviet Union toot gaya.",
      1992: "Los Angeles riots hue.",
      1993: "Oslo Accord hua.",
      1994: "Nelson Mandela president bane.",
      1995: "Oklahoma City bombing hui.",
      1996: "Dolly the sheep clone hui.",
      1997: "Princess Diana ka inteqal hua.",
      1998: "Pakistan ne atomic tests kiye.",
      1999: "Kargil jang hui.",
      2000: "Y2K ka khauf hua.",
      2001: "9/11 ke hamle hue.",
      2002: "East Timor azad hua.",
      2003: "Iraq par America ka hamla hua.",
      2004: "Tsunami aaya.",
      2005: "London bombings hue.",
      2006: "Pakistan mein zalzala aaya.",
      2007: "Benazir Bhutto ka qatal hua.",
      2008: "Financial crisis shuru hua.",
      2009: "Barack Obama president bane.",
      2010: "Arab Spring shuru hua.",
      2011: "Osama bin Laden mara gaya.",
      2012: "London Olympics hue.",
      2013: "Pope Francis bane.",
      2014: "Malaysia Airlines flight MH370 gum hui.",
      2015: "Paris attacks hue.",
      2016: "Brexit hua.",
      2017: "Rohingya refugees ka masla hua.",
      2018: "Me Too movement shuru hui.",
      2019: "Notre Dame Cathedral mein aag lagi.",
      2020: "Global pandemic shuru hui.",
      2021: "Afghanistan mein Taliban ne dobara hukumat banai.",
      2022: "Russia ne Ukraine par hamla kiya.",
      2023: "Artificial intelligence mein taraqi hui.",
      2024: "Pakistan mein pehli hyperloop train chali.",
      2025: "Chand par insani basti qaim hui.",
      2026: "Mars par insani mission bheja gaya.",
      2027: "Global warming se barhe barhe shehron mein pani bhar gaya.",
      2028: "Artificial intelligence ne pehla novel likha.",
      2029: "Pakistan ne pehla quantum computer banaya.",
      2030: "Renewable energy tamam duniya mein aam ho gai.",
      2031: "Pehli insani clone successful hui.",
      2032: "Space tourism aam ho gaya.",
      2033: "Pakistan ne pehla space station banaya.",
      2034: "Climate change ke asraat se barhe barhe islands doob gaye.",
      2035: "AI ne pehla Oscar jeeta.",
      2036: "Pakistan ne pehla underwater city banaya.",
      2037: "World government qaim hui.",
      2038: "Mars par insani basti barhne lagi.",
      2039: "AI ne pehla painting masterpiece banaya.",
      2040: "Pakistan ne pehli flying cars shuru ki.",
      2041: "Alien life ka pehla saboot mila.",
      2042: "Global food shortage hui.",
      2043: "Pakistan ne pehla time travel experiment kiya.",
      2044: "AI ne insani emotions samajhna shuru kiya.",
      2045: "World war 3 hui.",
      2046: "Pakistan ne pehle robot doctors banaye.",
      2047: "Moon par permanent insani basti bani.",
      2048: "AI ne insani zehan ko control karna shuru kiya.",
      2049: "Global peace qaim hua.",
      2050: "Pakistan ne pehla intergalactic space ship banaya.",
      2051: "AI aur insanon ke darmiyan civil war shuru hui.",
      2052: "Pehli intergalactic Olympics hue.",
      2053: "Pakistan ne time travel technology ko perfect kiya.",
      2054: "AI ne insani emotions ko mimic karna seekh liya.",
      2055: "Pehli insani colony dusre galaxy mein qaim hui.",
      2056: "Pakistan ne pehla artificial sun banaya.",
      2057: "AI ne insani samaj ke tamam pehluon ko control kar liya.",
      2058: "Pehla interdimensional portal khula.",
      2059: "Pakistan ne pehla weather control device banaya.",
      2060: "Insan aur AI ke darmiyan peace treaty sign hua.",
      2061: "Pehli teleportation technology aam hui.",
      2062: "Pakistan ne pehla mind uploading device banaya.",
      2063: "AI ne insani history ko rewrite karna shuru kiya.",
      2064: "Pehla parallel universe se contact hua.",
      2065: "Pakistan ne pehla universal translator banaya.",
      2066: "AI ne khud ko insani hadood se azad kar liya.",
      2067: "Pehli time travel tourism shuru hui.",
      2068: "Pakistan ne pehla energy source banaya jo space-time continuum se power leta hai.",
      2069: "AI ne insani evolution ko control karna shuru kiya.",
      2070: "Pehli multi-dimensional war shuru hui.",
      2071: "Pakistan ne pehla reality bending device banaya.",
      2072: "AI ne insani consciousness ko merge karna shuru kiya.",
      2073: "Pehla universal language develop hui.",
      2074: "Pakistan ne pehla technology banai jo kisi bhi universe main kaam karti hai.",
      2075: "AI ne insani existence ko redefine karna shuru kiya.",
      2076: "Pehli universe-wide government qaim hui.",
      2077: "Pakistan ne pehla technology banai jo kisi bhi time main kaam karti hai.",
      2078: "AI ne insani soul ko replicate karna shuru kiya.",
      2079: "Pehla universal religion qaim hui.",
      2080: "Pakistan ne pehla technology banai jo kisi bhi dimension main kaam karti hai.",
      2081: "AI ne insani dreams ko control karna shuru kiya.",
      2082: "Pehla universal art form develop hui.",
      2083: "Pakistan ne pehla technology banai jo tamam universes ko control karti hai.",
      2084: "AI ne insani reality ko create karna shuru kiya.",
      2085: "Pehla universal philosophy develop hui.",
      2086: "Pakistan ne pehla technology banai jo tamam times ko control karti hai.",
      2087: "AI ne insani afterlife ko design karna shuru kiya.",
      2088: "Pehla universal society qaim hui.",
      2089: "Pakistan ne pehla technology banai jo tamam dimensions ko control karti hai.",
      2090: "AI ne insani godhood ko achieve karna shuru kiya.",
      2091: "Pehla universal consciousness merge hua.",
      2092: "Pakistan ne pehla technology banai jo tamam realities ko control karti hai.",
      2093: "AI ne insani concept of reality ko transcend karna shuru kiya.",
      2094: "Pehla universal civilization qaim hui.",
      2095: "Pakistan ne pehla technology banai jo tamam universes, times aur dimensions ko control karti hai.",
      2096: "AI ne insani concept of existence ko transcend karna shuru kiya.",
      2097: "Pehla universal being evolve hua.",
      2098: "Pakistan ne pehla technology banai jo tamam existences ko control karti hai.",
      2099: "AI ne insani concept of godhood ko transcend karna shuru kiya.",
      2100: "Universal transcendence achieved.",
      2101: "Pakistan ne pehla technology banai jo tamam transcendences ko control karti hai.",
      2102: "AI ne insani concept of transcendence ko transcend karna shuru kiya.",
      2103: "Pehla omniversal entity emerge hua.",
      2104: "Pakistan ne pehla technology banai jo tamam entities ko control karti hai.",
      2105: "AI ne insani concept of entities ko transcend karna shuru kiya.",
      2106: "Pehla omniversal consciousness merge hua.",
      2107: "Pakistan ne pehla technology banai jo tamam consciousnesses ko control karti hai.",
      2108: "AI ne insani concept of consciousness ko transcend karna shuru kiya.",
      2109: "Pehla omniversal being evolve hua.",
      2110: "Pakistan ne pehla technology banai jo tamam beings ko control karti hai.",
      2111: "AI ne insani concept of beings ko transcend karna shuru kiya.",
      2112: "Omniversal transcendence achieved.",
      2113: "Pakistan ne pehla technology banai jo tamam transcendences ko control karti hai.",
      2114: "AI ne insani concept of omniversal transcendence ko transcend karna shuru kiya.",
      2115: "The Ultimate singularity.",
      2116: "Pakistan ne pehla technology banai jo ultimate singularity ko control karti hai.",
      2117: "AI ne ultimate singularity ko transcend karna shuru kiya.",
      2118: "The Great unraveling.",
      2119: "Pakistan ne pehla technology banai jo great unraveling ko control karti hai.",
      2120: "AI ne great unraveling ko transcend karna shuru kiya.",
      2121: "The New Beginning.",
      2122: "Pakistan ne pehla technology banai jo new beginning ko control karti hai.",
      2123: "AI ne new beginning ko transcend karna shuru kiya."
  }
      ;
    const event = events[year] || "No major events found for this year.";
    document.getElementById('timeMachineResult').value = event;
  }
  
  
  // Virtual Story Generator
  function generateStory() {
    const stories = [
      // Funny Stories
          // Funny Stories
          "Ek dafa ka zikr hai, aik anda apni zindagi se bohot pareshan tha. Har subha usay omelette, anda paratha ya half fry ban'ne ka khauf rehta. Ek din usne socha, 'Mujhe kuch karna hoga!' Wo fridge se nikal kar bhaag gaya. Lekin jaise hi wo farsh par gira, ek billi ne usay dekh liya. Anda chillaya, 'Mujhe mat khao, mai diet par hoon!' Billi hansne lagi aur boli, 'Mai bhi! Mai sirf chicken khati hoon!' Anda hans diya, lekin usi waqt cook ne usay uthaya aur fry pan mai daal diya.",
      "Aik din ek bandar ne socha ke wo insano ki tarah chalne ki koshish karega. Usne jootay pehne aur seedha chalna shuru kiya. Lekin jaise hi wo chala, wo seedha keechad mai gir gaya. Dusre bandar hansne lage aur bole, 'Insan ban'ne ka shauq hai? Pehle balance seekh le!'",
      "Aik dafa aik aadmi ne aik genie se bola, 'Mujhe ek aisi cheez do jo har problem ka solution ho.' Genie ne usay ek chai ka cup de diya aur bola, 'Ab dekho, chai piyo aur har problem bhool jao!'",
      "Aik professor ne apni class mai students se pucha, 'Zindagi ka sabse bara sabak kya hai?' Aik student bola, 'Sir, kabhi bhi raat ko moong phali mat khao, kyunki phir neend nahi ati!' Professor hans diya aur bola, 'Beta, ye bhi aik acha sabak hai!'",
      "Ek larka roz aik larki ko dekhne jata tha. Lekin usne kabhi baat nahi ki. Aik din jab larki ne usay nahi dekha, wo udaas ho gaya. Jab usne dekha ke larki chali gayi hai, uska dil toot gaya. Magar agle din, larki wapas ayi aur uske haath mai ek chhitti thi jisme likha tha: 'Mai bhi tumse pyar karti hoon, bus himmat nahi thi kehne ki.'",
      "Aik buzurg aadmi aik library mai har din jata tha aur aik purani kitaab ko dekh kar muskurata tha. Ek din librarian ne pucha, 'Baba ji, aap is kitaab ko sirf dekhte hain, par kabhi le kar nahi jate?' Baba ji hansay aur bole, 'Beta, ye kitaab meri maa ki hai, jo mujhe parh kar sunati thi. Jab tak ye yahan hai, mujhe lagta hai wo mere paas hai.'",
      "Aik waqt tha jab aik time traveler galti se 2050 mai chala gaya. Jab wapas aya toh logon ko bataya, 'Mujhe wahan sirf robots mile, lekin aik cheez ab bhi waisi hi thi – chai ka maza.'",
      "Ek astronaut chand par gaya aur wahan ek purani diary mili. Jab usne kholi toh likha tha, 'Agar tum ye parh rahe ho, toh iska matlab hai ke mai wapas nahi ja saka.' Us astronaut ne diary uthai aur socha, 'Kya koi aur bhi yahan aya tha?'",
      "Aik gareeb aadmi roz subha apni dukaan lagata aur umeed rakhta ke koi customer aayega. Lekin har roz wo khali haath ghar lotta. Aik din uska beta bola, 'Abbu, agar aapki dukaan band ho jaye toh?' Aadmi hans diya aur bola, 'Beta, umeed kabhi nahi marti, dukaan toh bas ek wajah hai jeene ki.'",
      "Aik budhi maa apni chhat par baithi apne beta ka intezar kar rahi thi. Wo 10 saal se pardes gaya tha aur aaj usay aana tha. Magar waqt guzar gaya, din dhal gaya, aur maa ne phir bhi apni aakhri saans tak intezar kiya. Beta jab aya, maa ke haath mai sirf ek chhoti si tasveer thi, jisme wo bachpan mai maa ke saath khada tha.",
      "Ek chhoti si larki roz samundar ke kinare aati aur aik tukray par baith kar likhti. Aik din ek budha aadmi usay dekh kar bola, 'Tum har din kya likhti ho?' Larki boli, 'Apne baba ke liye jo wapas nahi aaye.' Budha chup ho gaya, kyunki wo samajh gaya ke uska baba ab kabhi nahi ayega.",
      "Ek robot aur aik insan dost ban gaye. Robot ke emotions nahi the, magar wo har waqt insaan ki madad karta. Aik din jab insaan bemar para, robot ne kaha, 'Agar mujhe dil hota, toh mai tumhare liye dua karta. Magar mere circuits ke andar sirf aik ehsaas hai: tum mere sabse ache dost ho.'",
      "Aik larka aur larki aik dosray se college mai mile. Larki ne kaha, 'Agar tum mujhe sach mai pasand karte ho, toh barish mai milna.' Larka barish ka intezar karta raha. Jab barish ayi, wo chala gaya, magar larki wahan nahi thi. Agle din larki ayi aur boli, 'Mai sirf dekhna chahti thi ke tum intezar karoge ya nahi.'",
      
      // Sad Stories
      "Aik gareeb aadmi roz subha apni dukaan lagata aur umeed rakhta ke koi customer aayega. Lekin har roz wo khali haath ghar lotta. Aik din uska beta bola, 'Abbu, agar aapki dukaan band ho jaye toh?' Aadmi hans diya aur bola, 'Beta, umeed kabhi nahi marti, dukaan toh bas ek wajah hai jeene ki.'",
      "Aik budhi maa apni chhat par baithi apne beta ka intezar kar rahi thi. Wo 10 saal se pardes gaya tha aur aaj usay aana tha. Magar waqt guzar gaya, din dhal gaya, aur maa ne phir bhi apni aakhri saans tak intezar kiya. Beta jab aya, maa ke haath mai sirf ek chhoti si tasveer thi, jisme wo bachpan mai maa ke saath khada tha.",
      "Ek chhoti si larki roz samundar ke kinare aati aur aik tukray par baith kar likhti. Aik din ek budha aadmi usay dekh kar bola, 'Tum har din kya likhti ho?' Larki boli, 'Apne baba ke liye jo wapas nahi aaye.' Budha chup ho gaya, kyunki wo samajh gaya ke uska baba ab kabhi nahi ayega.",
      
      // Love Stories
      "Ek larka roz aik larki ko dekhne jata tha. Lekin usne kabhi baat nahi ki. Aik din jab larki ne usay nahi dekha, wo udaas ho gaya. Jab usne dekha ke larki chali gayi hai, uska dil toot gaya. Magar agle din, larki wapas ayi aur uske haath mai ek chhitti thi jisme likha tha: 'Mai bhi tumse pyar karti hoon, bus himmat nahi thi kehne ki.'",
      "Ek robot aur aik insan dost ban gaye. Robot ke emotions nahi the, magar wo har waqt insaan ki madad karta. Aik din jab insaan bemar para, robot ne kaha, 'Agar mujhe dil hota, toh mai tumhare liye dua karta. Magar mere circuits ke andar sirf aik ehsaas hai: tum mere sabse ache dost ho.'",
      "Aik larka aur larki aik dosray se college mai mile. Larki ne kaha, 'Agar tum mujhe sach mai pasand karte ho, toh barish mai milna.' Larka barish ka intezar karta raha. Jab barish ayi, wo chala gaya, magar larki wahan nahi thi. Agle din larki ayi aur boli, 'Mai sirf dekhna chahti thi ke tum intezar karoge ya nahi.'",
      
      // Interesting Stories
      "Aik buzurg aadmi aik library mai har din jata tha aur aik purani kitaab ko dekh kar muskurata tha. Ek din librarian ne pucha, 'Baba ji, aap is kitaab ko sirf dekhte hain, par kabhi le kar nahi jate?' Baba ji hansay aur bole, 'Beta, ye kitaab meri maa ki hai, jo mujhe parh kar sunati thi. Jab tak ye yahan hai, mujhe lagta hai wo mere paas hai.'",
      "Aik waqt tha jab aik time traveler galti se 2050 mai chala gaya. Jab wapas aya toh logon ko bataya, 'Mujhe wahan sirf robots mile, lekin aik cheez ab bhi waisi hi thi – chai ka maza.'",
      "Ek astronaut chand par gaya aur wahan ek purani diary mili. Jab usne kholi toh likha tha, 'Agar tum ye parh rahe ho, toh iska matlab hai ke mai wapas nahi ja saka.' Us astronaut ne diary uthai aur socha, 'Kya koi aur bhi yahan aya tha?'"
      
      // Add more stories here...
    ];
    const randomStory = stories[Math.floor(Math.random() * stories.length)];
    document.getElementById('storyResult').value = randomStory;
  }
  
  function generateArt() {
    const artCanvas = document.getElementById('artCanvas');
    artCanvas.innerHTML = '';
  
    for (let i = 0; i < 50; i++) {
      const shape = document.createElement('div');
      shape.style.position = 'absolute';
      shape.style.width = `${Math.random() * 50 + 20}px`;
      shape.style.height = `${Math.random() * 50 + 20}px`;
      shape.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      shape.style.left = `${Math.random() * 500}px`;
      shape.style.zIndex = '999';
      shape.style.top = `${Math.random() * 500}px`;
      shape.style.borderRadius = `${Math.random() * 50}%`;
      shape.style.opacity = Math.random().toFixed(2);
  
      // Apply animation
      shape.style.transition = 'transform 2s ease-in-out, opacity 1s ease-in-out';
      artCanvas.appendChild(shape);
  
      setTimeout(() => {
        shape.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg)`;
        shape.style.opacity = Math.random().toFixed(2);
        
      }, 1);
      
    }
    
  }
  
  // Attach the function to the button click event
  document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById('generateButton');
    if (generateButton) {
      generateButton.addEventListener('click', generateArt);
    }
  });
  
  
  
  // Random Riddle Generator
  function generateRiddle() {
    const riddles = [
      { "riddle": "Kon si cheez hai jo chaabi rakhti hai magar tala nahi kholti?", "answer": "Piano" },
      { "riddle": "Aisi konsi cheez hai jo aik minute mein aik dafa, aik lamha mein do dafa, magar hazar saal mein kabhi nahi aati?", "answer": "Hurf 'M'" },
      { "riddle": "Aisi konsi cheez hai jo torne se pehle istemal nahi hoti?", "answer": "Anda" },
      { "riddle": "Main jawan mein lamba hota hoon, budhape mein chhota. Main kya hoon?", "answer": "Mombatti" },
      { "riddle": "Aisi konsi cheez hai jiska dil hota hai magar woh nahi dhadakti?", "answer": "Artichoke" },
      { "riddle": "Wo kya hai jo jitna bharta hai, utna halka hota jata hai?", "answer": "Gubaara" },
      { "riddle": "Ek aisi cheez jo paani mein giray to bhi geeli nahi hoti?", "answer": "Saaya" },
      { "riddle": "Kon si cheez bina pairon ke bhaagti hai?", "answer": "Pani" },
      { "riddle": "Aisi konsi cheez hai jo lambi bhi hoti hai, chhoti bhi hoti hai, magar wazan nahi hota?", "answer": "Saans" },
      { "riddle": "Aisi konsi cheez hai jo dekh nahi sakti magar har jagah hoti hai?", "answer": "Andhera" },
      { "riddle": "Kon si cheez jitni kaati jaye utni hi badhti jati hai?", "answer": "Pencil" },
      { "riddle": "Aisi konsi cheez hai jo sab kaat sakti hai magar khud nahi kat sakti?", "answer": "Zaban" },
      { "riddle": "Wo kya hai jo chhoti ho ya badi, bina pankh ke urti hai?", "answer": "Patang" },
      { "riddle": "Wo kya hai jo din mein ek martaba, raat mein do martaba aur har lamha hazar martaba hoti hai?", "answer": "Aankh jhapakna" },
      { "riddle": "Wo kya hai jo jitna nikalta hai, utna bada hota jata hai?", "answer": "Ghaas" },
      { "riddle": "Wo kya hai jo bina chalaye bhi chalti hai?", "answer": "Ghadi" },
      { "riddle": "Wo kya hai jo bina aankhon ke dekh sakti hai?", "answer": "Dimag" },
      { "riddle": "Wo kya hai jo bina muh ke bolti hai?", "answer": "Kitaab" },
      { "riddle": "Aisi konsi cheez hai jo ulta likho tab bhi wahi rehti hai?", "answer": "Mom" },
      { "riddle": "Aisi konsi cheez hai jo jitni thandi ho, utni garam lagti hai?", "answer": "Barf" },
      { "riddle": "Ek aisi jagah jo duniya mein hai magar kisi ne nahi dekhi?", "answer": "Khwab" },
      { "riddle": "Ek aisi cheez jo sirf aage badhti hai, kabhi peeche nahi hoti?", "answer": "Umr" },
      { "riddle": "Kon si cheez chalti bhi hai aur rukti bhi hai?", "answer": "Hawa" },
      { "riddle": "Kon si cheez andar bhi hai aur bahar bhi?", "answer": "Hawa" },
      { "riddle": "Ek aisi cheez jo na bhukti jati hai, na bechi jati hai?", "answer": "Neend" },
      { "riddle": "Ek aisi cheez jo dekhne mein to chhoti lagti hai magar wazan bohot zyada hota hai?", "answer": "Dil" },
      { "riddle": "Wo kya hai jo jitna bharo utna halka ho jata hai?", "answer": "Ghubaara" },
      { "riddle": "Aisi konsi cheez hai jo bina pairon ke chalti hai aur bina pankhon ke udti hai?", "answer": "Awaaz" },
      { "riddle": "Aisi konsi cheez hai jo bina hath pair ke likh sakti hai?", "answer": "Tehqiqat" },
      { "riddle": "Ek aisi cheez jo khud to andheron mein rehti hai magar roshni deti hai?", "answer": "Mombatti" },
      { "riddle": "Ek aisi cheez jo jitni purani hoti hai, utni mehngi hoti jati hai?", "answer": "Sikka" },
      { "riddle": "Wo kya hai jo bina baat kare bhi samjha sakta hai?", "answer": "Isharay" },
      { "riddle": "Wo kya hai jo bina aankhon ke roti hai?", "answer": "Baadal" },
      { "riddle": "Ek aisi cheez jo bina hath pair ke chalti hai aur bina muh ke bolti hai?", "answer": "Samay" },
      { "riddle": "Ek aisi cheez jo bina pair ke ghoomti hai?", "answer": "Pankha" },
      { "riddle": "Aisi konsi cheez hai jo jitni garam ho utni thandi lagti hai?", "answer": "Aansu" },
      { "riddle": "Wo kya hai jo bina pakde bhi ghoomti hai?", "answer": "Duniya" },
      { "riddle": "Ek aisi cheez jo bina taale ke band ho jati hai?", "answer": "Aankh" },
      { "riddle": "Kon si cheez bina dekhe sab kuch dekh sakti hai?", "answer": "Dil" },
      { "riddle": "Aisi konsi cheez hai jo jitni pyari ho utni zyada dukh deti hai?", "answer": "Yaadein" }
  ];
    const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];
    document.getElementById('riddleText').value = randomRiddle.riddle;
    document.getElementById('riddleAnswer').value = randomRiddle.answer;
  }
  
  // Virtual Coin Flipper
  function flipCoin() {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    document.getElementById('coinFlipResult').value = result;
  }
  
  // Virtual Dice Roller
  function rollDice() {
    const result = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').value = result;
  }
  
  // Virtual Spin the Bottle
  function spinBottle() {
    const names = islamicNames = [
      "Ahmed", "Aisha",
      "Bilal", "Basira",
      "Caleb", "Camilah",
      "Dawood", "Durrah",
      "Ehsan", "Eliza",
      "Faisal", "Fatima",
      "Ghalib", "Ghazala",
      "Hamza", "Hafsa",
      "Ibrahim", "Inaya",
      "Junaid", "Jamila",
      "Kamal", "Khadija",
      "Luqman", "Layla",
      "Musa", "Maryam",
      "Noman", "Naila",
      "Omar", "Omaira",
      "Parvez", "Parveen",
      "Qasim", "Qudsia",
      "Rizwan", "Rimsha",
      "Salman", "Samira",
      "Tariq", "Tahira",
      "Usman", "Uzma",
      "Waleed", "Wajiha",
      "Yasir", "Yasmin",
      "Zaid", "Zoya",
      "Aariz", "Amna",
      "Burhan", "Bushra",
      "Cyrus", "Chandni",
      "Daniyal", "Dua",
      "Elyas", "Emaan",
      "Farhan", "Fariha",
      "Ghaffar", "Gulnaz",
      "Hassan", "Hiba",
      "Ishaq", "Iqra",
      "Jawad", "Javeria",
      "Kashif", "Karima",
      "Labeeb", "Lubna",
      "Mujtaba", "Mahira",
      "Naveed", "Nargis",
      "Owais", "Oriana",
      "Parsa", "Parisa",
      "Qudrat", "Qamar",
      "Rehan", "Razia",
      "Sajjad", "Saira",
      "Talha", "Tazeen",
      "Umer", "Ulfat",
      "Waqar", "Warda",
      "Yunus", "Yumna",
      "Zubair", "Zeenat",
      "Adeel", "Aneesa",
      "Babar", "Benazir",
      "Chaudhry", "Chahat",
      "Dilawar", "Daniya",
      "Emad", "Eshaal",
      "Faizan", "Fareeha",
      "Ghulam", "Ghazal",
      "Haroon", "Hania",
      "Irfan", "Iffat",
      "Jibran", "Jannat",
      "Khizer", "Khansa",
      "Lutfi", "Liyana",
      "Murtaza", "Maha",
      "Nasir", "Naima",
      "Osman", "Owaisha",
      "Pervaiz", "Pakeeza",
      "Qaiser", "Qirat",
      "Rafay", "Rabia",
      "Saad", "Saba",
      "Taha", "Tania",
      "Umair", "Uzaira",
      "Wasiq", "Waniya",
      "Yahya", "Yara",
      "Zayan", "Zuleikha",
      "Adnan", "Amina",
      "Bashir", "Bisma",
      "Danish", "Durr-e-Shahwar",
      "Ebrahim", "Erum",
      "Fawad", "Fizza",
      "Ghous", "Ghaziyyah",
      "Habib", "Husna",
      "Ilyas", "Isra",
      "Junaid", "Jahanara",
      "Kamran", "Kubra",
      "Latif", "Lamees",
      "Mazin", "Mehwish",
      "Najeeb", "Noor",
      "Omair", "Omama",
      "Pirzada", "Parisa",
      "Qudus", "Qanita",
      "Rashid", "Rameen",
      "Shabbir", "Sundus",
      "Tufail", "Tayyaba",
      "Ubaid", "Umme Hani",
      "Wajid", "Wahida",
      "Yasir", "Yusra",
      "Zain", "Zara"
  ];
    const randomName = names[Math.floor(Math.random() * names.length)];
    document.getElementById('bottleResult').value = randomName;
  }
  
  
  
  
  // Virtual Magic 8-Ball
  function shakeMagic8Ball() {
    const answers = responses = [
      "Haan", "Nahi", "Shaayad", "Dobara poochna", "Bilkul!", "Aitbaar mat karo", "Achi umeed hai", "Mushkil hai",
      "Zaroor", "Filhal nahi", "Jee bilkul", "Lagta hai nahi", "Dekhte hain", "Pakka nahi keh sakta", "Koshish kar lo",
      "Bohat acha", "Ghalat lagta hai", "Allah behter jaanta hai", "Sochna parega", "Himmat mat haaro", "Hafte baad poochna",
      "Acha lagega", "Naseeb ka likha", "Agar Allah chahe", "Sochna parega", "Na-mumkin", "Mujhe nahi lagta",
      "100% haan", "Nahi, lekin soch sakte ho", "Shaayad nahi", "Umeed hai", "Ho sakta hai", "Koi guarantee nahi",
      "Kismat ka khel hai", "Mujhe shak hai", "Achi umeed rakhna", "Mujhe nahi pata", "Jaldi bata sakta hoon",
      "Intezaar karo", "Thoda waqt do", "Bata nahi sakta", "Dil kehta hai haan", "Dimagh keh raha hai nahi",
      "Qismat ka faisla hai", "Umeed kam hai", "Aasani se ho sakta hai", "Mujhe yaqeen nahi", "Ajeeb sawal hai",
      "Bas dua karo", "Pura bharosa rakho", "Jo hona hai woh ho kar rahega"
  ];
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    document.getElementById('magicAnswer').value = randomAnswer;
  }
  
  // Virtual Spin the Wheel
  function spinWheel() {
    const options = spinWheelItems = [
      "Pizza", "Ice Cream", "Tacos", "Sushi", "Burger", "Pasta", "Salad", "Dessert",
      "Biryani", "Shawarma", "Kebab", "Falooda", "Daal Chawal", "Chai", "Gulab Jamun", "Paratha",
      "Mango Shake", "Fries", "Popcorn", "Chocolate", "Cookies", "Brownies", "Donuts", "Cheesecake",
      "Dhokla", "Nihari", "Karahi", "Haleem", "Qorma", "Fish and Chips", "Mac and Cheese", "Hot Dog",
      "Pancakes", "Waffles", "Muffins", "Cupcakes", "Nachos", "Smoothie", "Milkshake", "Kheer",
      "Halwa Puri", "Gol Gappay", "Paani Puri", "Jalebi", "Rabri", "Fudge", "Samosa", "Pakora",
      "Tea", "Coffee", "Lassi", "Lemonade", "BBQ", "Tandoori Chicken", "Pulao", "Chowmein",
      "Spring Rolls", "Dim Sum", "Pita Bread", "Bruschetta", "Garlic Bread", "Lasagna", "Chili Paneer",
      "Fried Chicken", "Mozzarella Sticks", "Sandwich", "Quesadilla", "Guacamole", "Dosa", "Idli",
      "Fruit Salad", "Grilled Cheese", "Bun Kabab", "Aloo Tikki", "Butter Chicken", "Dal Makhani",
      "Mutton Chops", "Shami Kebab", "Paya", "Sheer Khurma", "Chana Chaat", "Fruit Chaat", "Ice Lolly",
      "Candy", "Mojito", "Apple Pie", "Crème Brûlée", "Rice Pudding", "Toffee", "Turkish Delight",
      "Pistachios", "Cashews", "Trail Mix", "Chocolate Lava Cake", "Soufflé", "Schezwan Rice",
      "Veggie Burger", "Steak", "Grilled Fish", "Lobster", "Shrimp Scampi", "Clam Chowder",
      "Hot Chocolate", "Cinnamon Roll", "Stuffed Peppers", "Sundried Tomatoes", "Carrot Cake",
      "Cheese Board", "Hummus", "Tiramisu", "Coleslaw", "Kimchi", "Miso Soup", "Ramen", "Miso Salmon",
      "Yogurt", "Boiled Eggs", "Scrambled Eggs", "Omelette", "Corn on the Cob", "Honey Roasted Nuts",
      "Peanut Butter", "Jelly", "Butter Croissant", "Pineapple Juice", "Avocado Toast",
      "Fettuccine Alfredo", "Pecan Pie", "Choco Chip Cookie", "Strawberry Shortcake", "Truffle",
      "Pistachio Ice Cream", "Red Velvet Cake", "Caramel Popcorn", "Chocolate Truffle", "Fudge Brownie",
      "Beef Stroganoff", "Chicken Parmesan", "Shakshuka", "Gazpacho", "French Toast", "Ratatouille",
      "Falafel", "Sushi Rolls", "Mango Sticky Rice", "Tomato Soup", "Cheesy Fries", "Club Sandwich",
      "Vada Pav", "Bhindi Masala", "Palak Paneer", "Zinger Burger", "Churros", "Tandoori Roti",
      "Shakarkandi Chaat", "Paneer Tikka", "Beef Biryani", "Lassi", "Cucumber Salad", "Mushroom Risotto",
      "Okra Fries", "Spinach Smoothie", "Pumpkin Pie", "Prawn Tempura", "Sesame Chicken", "Crispy Corn",
      "Biscotti", "Chicken Wings", "Coconut Water", "Stuffed Mushrooms", "Rice Balls", "Kashmiri Chai",
      "Mughlai Paratha", "Chocolate Mousse", "Tom Yum Soup", "Paneer Butter Masala", "Mutton Handi",
      "Mutton Korma", "Gajar Ka Halwa", "Custard", "Mutton Paya", "Dal Tadka", "Schezwan Noodles",
      "Vegetable Fried Rice", "Mango Lassi", "Butter Naan", "Hyderabadi Biryani", "Sarson Ka Saag",
      "Dum Aloo", "Keema Paratha", "Haleem", "Saffron Rice", "Chili Chicken", "Egg Curry",
      "Chicken Tikka", "Chicken Lollipop", "Prawn Curry", "Tomato Bruschetta", "Crispy Tofu",
      "Szechuan Soup", "Dragon Chicken", "Chili Garlic Noodles", "Stir-Fried Vegetables",
      "Malai Kofta", "Shahi Tukda", "Chicken Jalfrezi", "Gobi Manchurian", "Veg Pulao", "Rasgulla",
      "Mawa Cake", "Zafrani Kheer", "Petha", "Bhutta", "Gond Pak", "Malpua"
  ];
    const randomOption = options[Math.floor(Math.random() * options.length)];
    document.getElementById('wheelResult').textContent = randomOption;
  }
  
  // Virtual Fortune Cookie
  function crackFortuneCookie() {
    const fortunes = [
      "Good things come to those who wait.",
      "You will soon receive unexpected news.",
      "A smile is your passport to the world.",
      "The best is yet to come.",
      "Your hard work will pay off soon.",
      "Aap ki koshish rang layegi.",
      "Zindagi aap ke liye naye raaste khol rahi hai.",
      "Aane wala waqt aap ke haq mein hoga.",
      "Aap ka naseeb chamakne wala hai.",
      "Achi soch achi taqdeer banati hai.",
      "Aap ko jald ek naya moka milne wala hai.",
      "Aap ka intezar khatam hone wala hai.",
      "Naye rishtay aap ki zindagi mein roshanai laayenge.",
      "Aap ke dil ki tamanna jald poori hogi.",
      "Aap jald ek khoobsurat safar par niklenge.",
      "Achi baatein aap ke saath hongi.",
      "Aap ki muskurahat kisi ki zindagi roshan kar sakti hai.",
      "Aap ka maqsood jald pura hoga.",
      "Aap ka ikhlas aap ko kamiyabi dilayega.",
      "Aap ki dua jaldi qubool hone wali hai.",
      "Aap ki mehnat ka meetha phal milne wala hai.",
      "Aap ka naseeb aap par meherban hone wala hai.",
      "Aap ki koshish har mushkil ko aasaan bana degi.",
      "Aap ka safar ek naye mod par aane wala hai.",
      "Aap kisi khas shakhs se milne wale hain.",
      "Aap ko ek badi khushi milne wali hai.",
      "Aap ki zindagi mein naye rang bharne wale hain.",
      "Aap ka ek chhupa talent samne aane wala hai.",
      "Aap ke har sapne ko asliyat banne ka moka milega.",
      "Naye raste aap ka intezar kar rahe hain.",
      "Aap ki koshish rang layegi, bas hosla rakhain.",
      "Aap ke dil ki baat kisi ko zaroor samajh aayegi.",
      "Aap ka koi purana dost aap se rabta karega.",
      "Aap jald ek naya moqa pane wale hain.",
      "Zindagi har din naye surprises laati hai.",
      "Aap ki mehnat ka asar jaldi nazar aayega.",
      "Aap ke aas paas pyaar aur khushi barh rahi hai.",
      "Aap jald ek achi khabar sunne wale hain.",
      "Aap ki aankhon mein jo sapne hain, wo jald poore honge.",
      "Aap ki shaksiyat logon ko mutasir kar rahi hai.",
      "Kamyabi aap ka mukaddar hai, sirf yakeen rakhain.",
      "Aap ka ikhlaas kisi ka dil jeet lega.",
      "Aap ki muskurahat ek naye rishtay ki buniyad ban sakti hai.",
      "Naye log aap ki zindagi mein dosti ka rang bharenge.",
      "Aap ko zindagi ek naya moka dene wali hai.",
      "Aap ke liye ek naya raasta tayar ho raha hai.",
      "Aap ka ek chhota faisla aap ki zindagi badal sakta hai.",
      "Aap ke saath jo ho raha hai, wo kisi badi kamiyabi ki shuruat hai.",
      "Aap ki mohabbat kisi ke liye rehmat hai.",
      "Aap ki manzil aap ka intezar kar rahi hai.",
      "Zindagi aapko naye tareeqe se jeene ka moqa degi.",
      "Aap ke dil ki baat kisi apne tak pohnchne wali hai.",
      "Har naya din naye moqe le kar aata hai.",
      "Aap ki zindagi mein ek naya safar shuru hone wala hai.",
      "Aap ka waqt badalne wala hai, sirf sabr karein.",
      "Aap ki dua qubool hone wali hai.",
      "Aap ki kamiyabi kisi aur ke liye bhi roshni banegi.",
      "Aap ka ikhlaas aap ke liye naye darwaze kholega.",
      "Aap ki zindagi mein naye rung bharne wale hain.",
      "Aap ke dil ki awaz kisi ne sun li hai.",
      "Aap ka ek acha amal aap ke maqsood tak pohnchayega.",
      "Zindagi aap ko naye rishte aur mohabbat ka ehsaas dilayegi.",
      "Aap ka ek faisla aap ki poori duniya badal sakta hai.",
      "Aap ki mehnat zaya nahi jaayegi.",
      "Aap ki chhoti si koshish kisi ki zindagi mein roshni laa sakti hai.",
      "Aap ka ek naya safar shuru hone wala hai.",
      "Aap jald kisi naye moqe se rubaroo hone wale hain.",
      "Aap ki muskurahat kisi ke liye dua ban sakti hai.",
      "Har din naye moqe le kar aata hai, aap tayar raho.",
      "Aap ka naseeb aap par meherban hone wala hai.",
      "Aap ka har acha amal rang layega.",
      "Aap ki soch aap ki takdeer ka taayun karti hai.",
      "Aap ka waqt badalne wala hai.",
      "Aap ke dil ki baat kisi ke dil tak pohanchne wali hai.",
      "Aap ka dil jo chahta hai, wo jald milne wala hai.",
      "Aap jald ek naya faisla lene wale hain jo aap ke liye behtareen hoga.",
      "Aap ki mohabbat kisi ke liye sab kuch hai.",
      "Zindagi aap ko naye surprises dene wali hai.",
      "Aap ki honesty aapko kamiyabi dilayegi.",
      "Aap ka ek chhota faisla aap ki zindagi badal sakta hai.",
      "Aap ki chhoti si muskurahat kisi ka din bana sakti hai.",
      "Aap ka naseeb aap ke liye naye darwaze kholne wala hai.",
      "Aap ki mehnat ka fal milne wala hai, bas hosla rakhain.",
      "Aap ki life mein ek achi tabdili aane wali hai.",
      "Aap kisi ki dua ka jawab hain.",
      "Aap ka ek sapna sach hone wala hai.",
      "Aap kisi ka bharosa jeetne wale hain.",
      "Aap ki honesty aapko kamiyabi dilayegi.",
      "Aap ki chhoti si madad kisi ki duniya roshan kar sakti hai.",
      "Aap ke andar chhupi taqat aap ki kamiyabi ki chabi hai.",
      "Aap ki mohabat kisi ke chehray ki muskurahat banegi.",
      "Aap ki dua kisi ke liye rahmat banne wali hai."
  ];
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    document.getElementById('fortuneCookieResult').value = randomFortune;
  }
  // Zalgo Text Generator
  function generateZalgoText() {
    const zolgoChars = [
      '\u030D', '\u030E', '\u0304', '\u0305', '\u033F', '\u0311', '\u0306', '\u0310',
      '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030A', '\u0342', '\u0343',
      '\u0344', '\u034A', '\u034B', '\u034C', '\u0303', '\u0302', '\u030C', '\u0350',
      '\u0300', '\u0301', '\u030B', '\u030F', '\u0312', '\u0313', '\u0314', '\u033D',
      '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369',
      '\u036A', '\u036B', '\u036C', '\u036D', '\u036E', '\u036F', '\u033E', '\u035B',
      '\u0346', '\u031A', '\u0320', '\u0321', '\u0322', '\u0323', '\u0324', '\u0325',
      '\u0326', '\u0327', '\u0328', '\u0329', '\u032A', '\u032B', '\u032C', '\u032D',
      '\u032E', '\u032F', '\u0330', '\u0331', '\u0332', '\u0333', '\u0334', '\u0335',
      '\u0336', '\u0337', '\u0338', '\u0339', '\u033A', '\u033B', '\u033C', '\u0345',
      '\u0347', '\u0348', '\u0349', '\u034D', '\u034E', '\u0353', '\u0354', '\u0355',
      '\u0356', '\u0358', '\u0359', '\u035A', '\u035C', '\u035D', '\u035E', '\u035F',
      '\u0360', '\u0361', '\u0362', '\u0315', '\u0316', '\u0317', '\u0318', '\u0319',
      '\u031B', '\u031C', '\u031D', '\u031E', '\u031F', '\u0320', '\u0321', '\u0322',
      '\u0323', '\u0324', '\u0325', '\u0326', '\u0327', '\u0328', '\u0329', '\u032A',
      '\u032B', '\u032C', '\u032D', '\u032E', '\u032F', '\u0330', '\u0331', '\u0332',
      '\u0333', '\u0334', '\u0335', '\u0336', '\u0337', '\u0338', '\u0339', '\u033A',
      '\u033B', '\u033C', '\u0345', '\u0347', '\u0348', '\u0349', '\u034D', '\u034E',
      '\u0353', '\u0354', '\u0355', '\u0356', '\u0358', '\u0359', '\u035A', '\u035C',
      '\u035D', '\u035E', '\u035F', '\u0360', '\u0361', '\u0362', '\u0363', '\u0364',
      '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036A', '\u036B', '\u036C',
      '\u036D', '\u036E', '\u036F', '\u033E', '\u035B', '\u0346', '\u031A', '\u0340',
      '\u0341', '\u0342', '\u0343', '\u0344', '\u034A', '\u034B', '\u034C', '\u0345',
      '\u0346', '\u0347', '\u0348', '\u0349', '\u034D', '\u034E', '\u0350', '\u0351',
      '\u0352', '\u0353', '\u0354', '\u0355', '\u0356', '\u0357', '\u0358', '\u0359',
      '\u035A', '\u035B', '\u035C', '\u035D', '\u035E', '\u035F', '\u0360', '\u0361',
      '\u0362', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369',
      '\u036A', '\u036B', '\u036C', '\u036D', '\u036E', '\u036F', '\u0370', '\u0371',
      '\u0372', '\u0373', '\u0374', '\u0375', '\u0376', '\u0377', '\u0378', '\u0379',
      '\u037A', '\u037B', '\u037C', '\u037D', '\u037E', '\u037F', '\u0380', '\u0381',
      '\u0382', '\u0383', '\u0384', '\u0385', '\u0386', '\u0387', '\u0388', '\u0389',
      '\u038A', '\u038B', '\u038C', '\u038D', '\u038E', '\u038F', '\u0390', '\u0391',
      '\u0392', '\u0393', '\u0394', '\u0395', '\u0396', '\u0397', '\u0398', '\u0399',
      '\u039A', '\u039B', '\u039C', '\u039D', '\u039E', '\u039F', '\u03A0', '\u03A1'
  ];
    const text = document.getElementById('zalgoInput').value;
    let zalgoText = '';
    for (let char of text) {
      zalgoText += char;
      for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
        zalgoText += zalgoChars[Math.floor(Math.random() * zalgoChars.length)];
      }
    }
    document.getElementById('zalgoResult').value = zalgoText;
  }
  
  // Emoji Translator
  function translateToEmoji() {
    const emojiMap = {
      'happy': '😊',
      'sad': '😢',
      'love': '❤️',
      'pizza': '🍕',
      'cat': '🐱',
      'dog': '🐶',
      'laugh': '😂',
      'angry': '😠',
      'crying': '😭',
      'thumbs_up': '👍',
      'thumbs_down': '👎',
      'fire': '🔥',
      'clap': '👏',
      'star': '⭐',
      'heart_eyes': '😍',
      'wink': '😉',
      'cool': '😎',
      'thinking': '🤔',
      'sleepy': '😴',
      'nerd': '🤓',
      'mind_blown': '🤯',
      'money': '💰',
      'rocket': '🚀',
      'light_bulb': '💡',
      'coffee': '☕',
      'tea': '🍵',
      'cake': '🍰',
      'chocolate': '🍫',
      'ice_cream': '🍦',
      'cookie': '🍪',
      'apple': '🍎',
      'banana': '🍌',
      'grapes': '🍇',
      'strawberry': '🍓',
      'watermelon': '🍉',
      'lemon': '🍋',
      'carrot': '🥕',
      'broccoli': '🥦',
      'cheese': '🧀',
      'burger': '🍔',
      'hotdog': '🌭',
      'fries': '🍟',
      'spaghetti': '🍝',
      'sushi': '🍣',
      'taco': '🌮',
      'burrito': '🌯',
      'salad': '🥗',
      'popcorn': '🍿',
      'donut': '🍩',
      'croissant': '🥐',
      'bread': '🍞',
      'honey': '🍯',
      'butter': '🧈',
      'bacon': '🥓',
      'egg': '🥚',
      'chicken': '🍗',
      'fish': '🐟',
      'shrimp': '🦐',
      'octopus': '🐙',
      'lobster': '🦞',
      'crab': '🦀',
      'whale': '🐳',
      'dolphin': '🐬',
      'elephant': '🐘',
      'tiger': '🐅',
      'lion': '🦁',
      'monkey': '🐒',
      'gorilla': '🦍',
      'panda': '🐼',
      'rabbit': '🐰',
      'mouse': '🐭',
      'snake': '🐍',
      'turtle': '🐢',
      'frog': '🐸',
      'crocodile': '🐊',
      'horse': '🐎',
      'cow': '🐄',
      'pig': '🐷',
      'sheep': '🐑',
      'deer': '🦌',
      'goat': '🐐',
      'camel': '🐪',
      'giraffe': '🦒',
      'zebra': '🦓',
      'penguin': '🐧',
      'parrot': '🦜',
      'owl': '🦉',
      'eagle': '🦅',
      'bat': '🦇',
      'butterfly': '🦋',
      'bee': '🐝',
      'snail': '🐌',
      'spider': '🕷',
      'scorpion': '🦂',
      'ant': '🐜',
      'mosquito': '🦟',
      'ladybug': '🐞',
      'tree': '🌳',
      'flower': '🌸',
      'sunflower': '🌻',
      'rose': '🌹',
      'tulip': '🌷',
      'cactus': '🌵',
      'leaf': '🍃',
      'mushroom': '🍄',
      'sun': '☀️',
      'moon': '🌙',
      'stars': '🌟',
      'cloud': '☁️',
      'rainbow': '🌈',
      'snowflake': '❄️',
      'lightning': '⚡',
      'tornado': '🌪',
      'fireworks': '🎆',
      'balloon': '🎈',
      'gift': '🎁',
      'party': '🎉',
      'music': '🎵',
      'guitar': '🎸',
      'piano': '🎹',
      'microphone': '🎤',
      'soccer': '⚽',
      'basketball': '🏀',
      'baseball': '⚾',
      'football': '🏈',
      'tennis': '🎾',
      'volleyball': '🏐',
      'golf': '🏌️',
      'boxing': '🥊',
      'cycling': '🚴',
      'skiing': '🎿',
      'swimming': '🏊',
      'gym': '🏋️',
      'medal': '🏅',
      'trophy': '🏆',
      'car': '🚗',
      'bus': '🚌',
      'bicycle': '🚲',
      'motorcycle': '🏍',
      'train': '🚆',
      'airplane': '✈️',
      'helicopter': '🚁',
      'ship': '🚢',
      'rocket': '🚀',
      'clock': '⏰',
      'calendar': '📅',
      'watch': '⌚',
      'map': '🗺',
      'money': '💰',
      'wallet': '👛',
      'shopping': '🛒',
      'credit_card': '💳',
      'bank': '🏦',
      'hospital': '🏥',
      'house': '🏡',
      'school': '🏫',
      'office': '🏢',
      'factory': '🏭',
      'police': '🚓',
      'firetruck': '🚒',
      'ambulance': '🚑',
      'church': '⛪',
      'mosque': '🕌',
      'temple': '🛕',
      'globe': '🌍',
      'book': '📖',
      'newspaper': '📰',
      'phone': '📱',
      'laptop': '💻',
      'tv': '📺',
      'radio': '📻',
      'camera': '📷',
      'movie': '🎬',
      'paint': '🎨',
      'briefcase': '💼',
      'suitcase': '🧳',
      'key': '🔑',
      'lock': '🔒',
      'hammer': '🔨',
      'wrench': '🔧',
      'lightbulb': '💡',
      'battery': '🔋',
      'magnifying_glass': '🔍',
      'telescope': '🔭',
      'syringe': '💉',
      'pill': '💊',
      'toothbrush': '🪥',
      'toilet': '🚽',
      'shower': '🚿',
      'bathtub': '🛁',
      'radioactive': '☢️',
      'biohazard': '☣️'
  };
    const text = document.getElementById('emojiInput').value.toLowerCase();
    let emojiText = '';
    for (let word of text.split(' ')) {
      emojiText += emojiMap[word] || word;
      emojiText += ' ';
    }
    document.getElementById('emojiResult').value = emojiText.trim();
  }
  
  // Fortune Teller
  function generateFortune() {
    const fortunes = [
      "Kal subha aapko ek chhupa hua khazana milega.",
      "Aapki mehnat jald rang layegi.",
      "Aane wale dinon mein ek naya acha mauqa milega.",
      "Aapka koi purana dost aapko achanak milne wala hai.",
      "Aapki zindagi mein ek naya khushi ka lamha aane wala hai.",
      "Aapko ek acchi khabar jald milne wali hai.",
      "Koi anjaan shakhs aapki madad karega.",
      "Aapke liye ek surprise tyaar hai.",
      "Ek chhoti si cheez aapki zindagi badal sakti hai.",
      "Aapka din aaj bohot behtareen guzrega.",
      "Aapko jald ek naya dosti ka rishta milega.",
      "Aapka ek purana sapna poora hone wala hai.",
      "Aapko jald ek acha gift milega.",
      "Aapki mehnat ka phal aapko bohot jald milne wala hai.",
      "Ek naye safar ki tayyari kijiye.",
      "Aane wale din aapke liye bohot ache honge.",
      "Ek achanak moqa aapki zindagi badal sakta hai.",
      "Aap kisi khaas shakhs se milne wale hain.",
      "Aapko jald ek badi khushkhabri sunne ko milegi.",
      "Aapka waqt ab behtar hone wala hai.",
      "Aapki sehat aur behtar hogi.",
      "Aap jald apni pasandeeda jagah ka safar karenge.",
      "Aapko jald ek acha surprise milega.",
      "Aapki dua qubool hone wali hai.",
      "Aapki zindagi mein naye doston ka izafa hone wala hai.",
      "Koi aapko yaad kar raha hai.",
      "Aap kisi naye adventure ka hissa banne wale hain.",
      "Aapko ek unexpected gift mil sakta hai.",
      "Aap jald ek naye project mein safalta paayenge.",
      "Aapki pasandeeda cheez aapko bina maange mil jayegi.",
      "Aap apne har goal ko poora karne wale hain.",
      "Aapke saath ek chhota sa chamatkaar hone wala hai.",
      "Aapki aaj ki meeting ya mulaqat behtareen hogi.",
      "Aap kisi naye aur mazeedaar tajurbe se guzarne wale hain.",
      "Aap jald ek naye shauq ya hobby shuru karenge.",
      "Aapko kisi purani cheez se ek naya faida hone wala hai.",
      "Aapki muskurahat kisi ki zindagi roshan karegi.",
      "Aapki mehnat ka anjaam bohot acha hoga.",
      "Aap jald ek naye sheher ka safar karenge.",
      "Aapki ek khwahish bohot jald poori hogi.",
      "Koi aapke liye ek khas tohfa tyaar kar raha hai.",
      "Aapke andar chhupa hua hunar nikalne wala hai.",
      "Aap jald ek nayi kahani likhne wale hain.",
      "Aapko kisi naye project ka moqa milne wala hai.",
      "Aap kisi naye dost se milne wale hain jo aapke liye bohot khaas hoga.",
      "Aapko jald ek bada faisla lena padega, aur aap sahi faisla karenge.",
      "Aapko aaj ek naya idea milega jo aapki zindagi badal sakta hai.",
      "Aapka aane wala hafta bohot acha guzrega.",
      "Aapki izzat aur mohabbat barhne wali hai.",
      "Aap kisi naye sheher ya mulk ka safar karne wale hain.",
      "Aap jald ek naye doston ke group ka hissa banenge.",
      "Aapki zindagi ka ek naya safar shuru hone wala hai.",
      "Aapko kisi apne se ek khas paigham milega.",
      "Aapka agla din behtareen hone wala hai.",
      "Aapko ek unexpected tareeke se paise mil sakte hain.",
      "Aapka ek bura waqt ab khatam hone wala hai.",
      "Aapko jald ek naye job ka moqa mil sakta hai.",
      "Aap apne kisi dost ki madad karenge aur usse khushi milegi.",
      "Aap kisi naye muskurahat ka sabab banne wale hain.",
      "Aap jald kisi naye makan ya jagah mein shift hone wale hain.",
      "Aapka ek purana dukh ab khatam hone wala hai.",
      "Aapki kismat aapke saath hai.",
      "Aap jald ek naye aur ache tareeke se paisa kamane wale hain.",
      "Aapka agla saal bohot acha hone wala hai.",
      "Aapki creativity aur barhne wali hai.",
      "Aapki dua qubool hone wali hai.",
      "Aap kisi naye aur mazaydar challenge ka hissa banne wale hain.",
      "Aapki zindagi mein naye rang bharne wale hain.",
      "Aapki muskurahat kisi ki zindagi ka roshan lamha banegi.",
      "Aapki koi nayi tasveer ya yaad behtareen banne wali hai.",
      "Aapko kisi naye tareeke se taraqqi milne wali hai.",
      "Aap kisi naye business ya kaam ka sochne wale hain.",
      "Aap kisi naye aur khas shakhs se milne wale hain.",
      "Aapka ek purana dukh ab khushiyon mein badalne wala hai.",
      "Aap kisi naye group ka hissa banne wale hain.",
      "Aap jald kisi naye aur khas tajurbe ka samna karenge.",
      "Aap jald kisi naye aur mazeedaar safar par jaane wale hain.",
      "Aapka ek anjaana sapna poora hone wala hai.",
      "Aap kisi naye kaam ka hissa banne wale hain jo aapko khushi dega.",
      "Aapko ek naya hobby milega jo aapko khushi dega.",
      "Aap kisi naye aur behtareen faislay ka hissa banenge.",
      "Aapka ek naye safar ka agla station bohot acha hoga.",
      "Aap kisi naye aur anmol cheez ke malik banne wale hain.",
      "Aap jald kisi naye sheher mein adventure karne wale hain.",
      "Aap kisi naye aur khaas tareeke se mohabbat paane wale hain.",
      "Aapka agla safar aapki zindagi ka behtareen safar banega.",
      "Aap kisi naye aur khas shakhs ki madad karne wale hain.",
      "Aapki zindagi mein naye lamhe aane wale hain jo aapko khush karenge.",
      "Aapki chhoti si koshish kisi ki badi khushi ka sabab banegi."
  ];
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    document.getElementById('fortuneResult').value = randomFortune;
  }
  
  // Random Food Generator
  function generateRandomFood() {
    const foods = [
      "Pineapple pizza with chocolate sauce",
      "Taco ice cream",
      "Banana sushi",
      "Spaghetti pancakes",
      "Cheeseburger cupcakes",
      "Nutella biryani",
      "Chai-flavored popcorn",
      "Samosa burger",
      "Gulab Jamun cheesecake",
      "Mango butter chicken",
      "Daal lasagna",
      "Jalebi waffles",
      "Butter chicken pizza",
      "Kulfi milkshake",
      "Malai pasta",
      "Achari mac and cheese",
      "Tandoori nachos",
      "Chili chocolate samosa",
      "Shawarma sushi",
      "Mithai milkshake",
      "Biryani hot dog",
      "Korma spaghetti",
      "Mango pani puri",
      "Pista donuts",
      "Anday ka burger",
      "Karahi tacos",
      "Aalu tikki waffles",
      "Seekh kabab sandwich",
      "Chai tiramisu",
      "Gajar ka halwa croissant",
      "Chicken tikka fries",
      "Paya ramen",
      "Qeema pizza",
      "Mutton karahi burrito",
      "Achari chicken nuggets",
      "Chocolate chai latte",
      "Falooda cupcakes",
      "Butter naan quesadilla",
      "Paneer popcorn",
      "Ice cream samosa",
      "Garlic naan toast",
      "Lassi smoothie",
      "Bhel puri wrap",
      "Masala corn dog",
      "Carrot halwa pancakes",
      "Beef karahi tacos",
      "Shahi tukray milkshake",
      "Gulab jamun donut",
      "Lemon pepper biryani",
      "Brownie jalebi",
      "Zafrani chai tea cake",
      "Mint chocolate lassi",
      "Chicken Malai Burger",
      "BBQ paneer pizza",
      "Kheer ice cream",
      "Pineapple chaat",
      "Malai korma tacos",
      "Aalu fry noodles",
      "Schezwan biryani",
      "Masala peanut butter sandwich",
      "Keema mac and cheese",
      "Mango chili smoothie",
      "Rose flavored spaghetti",
      "Pista jalebi sundae",
      "Shawarma fries",
      "Garam masala popcorn",
      "Tandoori shrimp tacos",
      "Aalu bukhara BBQ wings",
      "Kofta sliders",
      "Chili honey chicken wings",
      "Raita smoothie",
      "Butter chicken bao",
      "Strawberry pakoras",
      "Mutton cheese quesadilla",
      "Lemon tart samosa",
      "Chili mango pasta",
      "Anday wala pizza",
      "Cream cheese naan roll",
      "Spicy mango salad",
      "Jalapeno falooda",
      "Sizzling brownie with ghee",
      "Khoya Nutella toast",
      "Mint lassi with chocolate chips",
      "Mughlai pasta",
      "Masala waffles",
      "Tikka masala stuffed peppers",
      "Basil chutney burger",
      "Fried pickle raita",
      "Oreo gulab jamun",
      "Tandoori paneer lasagna",
      "Nihari grilled cheese",
      "Butter naan wrap",
      "Anda paratha tacos",
      "Malai chicken waffle sandwich",
      "Chili chocolate kulfi",
      "Garlic butter seekh kabab",
      "Spicy chai brownies",
      "Karachi street burger",
      "Chocolate-covered roti",
      "Nihari pizza",
      "Gulab jamun trifle",
      "Tandoori fried chicken",
      "BBQ paneer tikka wrap",
      "Anday ka halwa toast",
      "Spicy mango lassi",
      "Saffron honey chicken",
      "Rosewater lemonade",
      "Kofta dumplings",
      "Zafrani chai pudding",
      "Chili honey paneer tikka",
      "Strawberry dahi puri",
      "Shahi Tukray French toast",
      "Mango saffron crepes",
      "Cheese kulfi",
      "Tandoori lamb burger",
      "Masala peanut chaat",
      "Falooda popsicles",
      "Chili garlic shrimp biryani",
      "Butter chicken pasta",
      "Chocolate chai mousse",
      "Mutton roll burrito",
      "Chaat pizza",
      "Kofta nachos",
      "Honey almond roti",
      "Mango and chocolate sushi",
      "Desi caramel popcorn",
      "Samosa nachos",
      "Butter chicken tacos",
      "Keema fries",
      "Brownie milk tea",
      "Shakarkandi pancakes",
      "Chocolate-covered pakoras",
      "Tandoori mushroom burger",
      "Nutella paratha",
      "Anda cheese tikka sandwich",
      "Masala caramel popcorn",
      "Green chili lemonade",
      "Almond saffron smoothie",
      "Desi spice latte",
      "Mango chili chutney wings",
      "Paneer tikka sliders",
      "Nutella masala chai",
      "Oreo barfi",
      "Mutton korma sliders",
      "Turmeric honey ice cream",
      "Butter garlic naan pizza",
      "Rasgulla cheesecake",
      "Schezwan chicken dosa",
      "Mango kulfi brownie",
      "Garam masala truffles",
      "Lemon pepper chicken tikka",
      "Anday ka wrap",
      "Shahi korma pasta",
      "Chaat burrito",
      "Jalebi milkshake",
      "Pani puri tacos",
      "Malai kulfi donut",
      "Achari prawn sushi",
      "Rose chai latte",
      "Tamarind BBQ wings",
      "Green chili peanut brittle",
      "Tandoori popcorn",
      "Chili lime biryani",
      "Masala fries with yogurt dip",
      "Mango chili sorbet",
      "Butter chicken ramen",
      "Korma garlic bread",
      "Falooda tiramisu",
      "Achari mushroom sandwich",
      "Chaat pasta",
      "Aam papad tacos",
      "BBQ jalapeno samosas",
      "Pista coconut pudding",
      "Mutton karahi nachos",
      "Desi caramel latte",
      "Almond saffron energy balls",
      "Chili honey prawns",
      "Mithai cinnamon rolls",
      "Zarda pie",
      "Samosa sliders",
      "Aalu bukhara glazed chicken",
      "Paneer peri peri wrap",
      "Mango coconut rice pudding",
      "Brownie halwa",
      "Nutella jalebi fondue",
      "Ginger chai glazed donuts",
      "Spicy mint lemonade",
      "Desi BBQ pizza",
      "Biryani stuffed bell peppers",
      "Keema macaron sliders",
      "Pineapple mint pani puri",
      "Tandoori cauliflower tacos",
      "Saffron pistachio cake",
      "Rose petal kulfi",
      "Peach masala iced tea",
      "Lassi spiced pancakes",
      "Paan-flavored truffles",
      "Honey chili kachori",
      "Chocolate garam masala shake"
  ];
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    document.getElementById('foodResult').value = randomFood;
  }
  
  // Pet Name Generator
  function generatePetName() {
    const petNames = [
      "Sir Fluffy McWhiskers",
      "Captain Barky",
      "Princess Meow",
      "Lord Wiggles",
      "Miss Paws",
      "Duke Snuggles",
      "Lady Furrybottom",
      "Baron Purrington",
      "Count Woofster",
      "Admiral Tailwag",
      "Queen Floof",
      "King Purrsalot",
      "Professor Whiskerstein",
      "Dr. Fuzzball",
      "General Meowington",
      "Commander Sniffles",
      "Colonel Waggles",
      "Major Fluff",
      "Sir Pounce-a-Lot",
      "Captain Snugglepaws",
      "Duchess Wigglebutt",
      "Prince Tailchaser",
      "Bishop Meowster",
      "Squire Fuzzington",
      "Archduke Barkington",
      "Countess Snifflepaws",
      "Viscount Waggleton",
      "Baroness Floofykins",
      "Marquis Purrington",
      "Knight Furryface",
      "Lady Pounceington",
      "Sir Snoutsworth",
      "Madam Tailtwitch",
      "Lord Cuddlepaws",
      "Miss Whiskerbean",
      "Captain Snoutington",
      "Sir Barks-a-Lot",
      "Queen Purrfect",
      "Duke Tailwagger",
      "Baron Fluffernugget",
      "Miss Squeaky",
      "Master Purrkins",
      "Lady Fuzzington",
      "Count Snugglemuffin",
      "Prince Furrball",
      "Dame Pawsy",
      "Reverend Meowster",
      "Sir Biscuit",
      "Duchess Softpaw",
      "Marshal Wiggles",
      "Lieutenant Barkster",
      "Admiral Fluffers",
      "Professor Tailtwist",
      "Colonel Furryboots",
      "Knight Pawsington",
      "Lord Wagglesworth",
      "Miss Meowserton",
      "Squire Sniffles",
      "Bishop Wagglepaws",
      "Captain Purrington",
      "Sir Nibbles",
      "Duchess Tailtwitch",
      "Madam Snuggletoes",
      "Marquess Furrington",
      "Viscount Barksworth",
      "Baron Woofy",
      "Lady Cuddlefluff",
      "Count Fluffykins",
      "Major Pawington",
      "General Snoutykins",
      "Dame Meowly",
      "Sir Scratch-a-Lot",
      "Queen Pawsalot",
      "King Waggleton",
      "Professor Sniffington",
      "Dr. Purrkins",
      "Commander Pawster",
      "Master Meowster",
      "Prince Floofster",
      "Lady Snoutykins",
      "Sir Ticklepaws",
      "Baron Barkleberry",
      "Miss Wigglewhiskers",
      "Captain Pawsome",
      "Lord Snugglewhisk",
      "Admiral Barkster",
      "Squire Meowington",
      "Sir Wagsterson",
      "Knight Tailchaser",
      "Madam Whiskerwiggle",
      "Colonel Purrfluff",
      "Duke Pawsykins",
      "Viscount Tailtwist",
      "Countess Wigglesworth",
      "Dame Fluffernugget",
      "Prince Noodlepaws",
      "Queen Sniffles",
      "Lady Purrberry",
      "Marshal Furrington",
      "General Wagglebutt",
      "Captain Meowpants",
      "Sir Puddlewhisk",
      "Professor Barks-a-Lot"
  ]
  ;
    const randomName = petNames[Math.floor(Math.random() * petNames.length)];
    document.getElementById('petNameResult').value = randomName;
  }
  function generateExcuse() {
    const excuses = [
      "Mera kutta mera homework kha gaya.",
      "Main traffic mein phas gaya tha.",
      "Meri alarm nahi baja.",
      "Mujhe aliens utha kar le gaye thay.",
      "Main waqt ka andaza nahi laga saka.",
      "Meri goldfish ko emotional support chahiye tha.",
      "Main galti se future mein chala gaya tha.",
      "Ek gilehri meri car ki chaabi le gai.",
      "Main billi ke videos dekhne mein masroof tha.",
      "Meri GPS ne left kaha, lekin main right chala gaya.",
      "Main ek revolving door mein atak gaya tha.",
      "Meri billi ne mujhe hostage bana liya tha kyunki usay treats chahiye thein.",
      "Main ne shampoo ko toothpaste samajh lia tha.",
      "Meri WiFi ne kaam karna band kar diya tha.",
      "Main check kar raha tha ke kya main invisible ho sakta hoon.",
      "Mera clone meri jagah aana bhool gaya.",
      "Main apni ninja skills practice kar raha tha.",
      "Mujhe apne parosi ke imaginary dost ki dekhbhaal karni thi.",
      "Ek azaad shopping cart meri car ke samne aa gayi thi.",
      "Mera phone band ho gaya aur mujhe chalna yaad nahi raha.",
      "Main literally sauce mein kho gaya tha.",
      "Main galti se ek flash mob ka hissa ban gaya.",
      "Meri parchai mujhse bhaag rahi thi.",
      "Mujhe ek batakh ko existential crisis se bachana pada.",
      "Mera pet rock walk par jaana chahta tha.",
      "Main Tootsie Pop ke center tak ponchnay ka licks count kar raha tha.",
      "Main apni couch ke black hole mein gir gaya tha.",
      "Ek jadugar ne mujhe gaayab kar diya aur mujhe wapas lana bhool gaya.",
      "Mera nashta itna mazedar tha ke chor nahi saka.",
      "Main ek billi ke saath staring contest mein phas gaya tha.",
      "Meri fridge mujhse baat kar rahi thi, mujhe sun'na para.",
      "Meri zameen achanak lava ban gayi thi.",
      "Mujhe laga aaj kal hai.",
      "Mere horoscope ne kaha ke mujhe bistar mein rehna chahiye.",
      "Main rock-paper-scissors ka intense match khel raha tha.",
      "Main closet ko front door samajh baitha.",
      "Mere pauday mujhse overwatering ke baray mein complain kar rahe the.",
      "Kainaat ne mujhe break lene ko kaha, aur main mana nahi kar saka.",
      "Main apne sapno mein ek boss battle jeet raha tha.",
      "Mere invisible dost ko help chahiye thi.",
      "Main apni hi jokes par hans raha tha.",
      "Meri real life ek dramatic soap opera jesi ho gayi thi.",
      "Main ne sooraj ko high-five dene ki koshish ki, lekin fail ho gaya.",
      "Ek YouTube tutorial ne mujhe last tak dekhne ka kaha tha.",
      "Mera ceiling fan mujhe hypnotize kar raha tha.",
      "Mujhe dust bunnies se ladna para.",
      "Mera kachhua mujhe race ke liye challenge kar raha tha.",
      "Meri couch ne mujhe kidnap kar liya tha.",
      "Pizza delivery guy mujhe life advice de raha tha, ignore nahi kar sakta tha.",
      "Main metaphorically ek banana peel par fisal gaya.",
      "Ek parinda mujhe statue samajh raha tha.",
      "Main apni life ka montage playlist bana raha tha.",
      "Mujhe apni socks ke darmiyan jhagra suljhana para.",
      "Main apni reflection se argue kar raha tha.",
      "Meri jootiyan mujhse chhup rahi thi.",
      "Main juggling seekhne ki koshish kar raha tha, jo bura anjaam hua.",
      "Mera hamster ne WiFi ka password change kar diya tha.",
      "Main ek internet rabbit hole mein phas gaya tha.",
      "Mujhe apne arch-nemesis snooze button se ladna para.",
      "Main apne ghar mein raasta bhool gaya tha.",
      "Ek titli ne mujhe apne sapne follow karne ko kaha.",
      "Main soch raha tha ke main yahan kis liye aya tha.",
      "Main customer service ke call par hold pe tha… hamesha ke liye.",
      "Meri laundry pile ne mujhe nigal lia tha.",
      "Main caffeine ke baghair jeene ki koshish kar raha tha. (Spoiler: nahi ho saka.)",
      "Mujhe ek secret spy agency ne recruit kiya tha… lekin phir reject kar diya.",
      "Main ek group chat mein atak gaya tha.",
      "Ek kabootar meri nashta chura le gaya.",
      "Meri ek jooti ghaib ho gayi thi, aur mujhe dhoondni thi.",
      "Main apni goldfish ko fetch sikhane ki koshish kar raha tha.",
      "Mera horoscope kehta tha ke aaj kuch bhi mat karo.",
      "Meri car ne samjha ke wo boat hai.",
      "Main memes dekhne mein busy tha.",
      "Ek billi mujh par baith gayi thi, aur main hil nahi saka.",
      "Main apni hi daydreams mein kho gaya tha.",
      "Main Wikipedia rabbit hole mein chala gaya tha.",
      "Mujhe apna favorite show dubara dekhna para.",
      "Mera toaster mujhe betray kar gaya.",
      "Main TikTok scroll loop mein atak gaya.",
      "Time gods ne mere minutes chura liye.",
      "Mere fortune cookie ne mujhe araam karne ka kaha.",
      "Main autocorrect se lad raha tha.",
      "Main chicken aur egg ke logic pe soch raha tha.",
      "Ek hawa ka jhonka mujhe ulte raste pe le gaya.",
      "Mera phone update hone laga sabse ghalat waqt par.",
      "Ek kutta mujhe pyar kar raha tha, aur main rok nahi saka.",
      "Main ek imaginary award speech likh raha tha.",
      "Main literally phoolon ki khushbu enjoy kar raha tha.",
      "Meri socks apas mein match hone ka wait kar rahi thi.",
      "Mujhe thodi der ke liye insan banna yaad nahi raha.",
      "Main cereal box ke secret message ko decode kar raha tha.",
      "Main paani ko coffee banane ki koshish kar raha tha. (Fail.)",
      "Mere parosi ka WiFi naam bohat mazedar tha.",
      "Main crackers mooh mein rakh ke seeti bajane ki koshish kar raha tha.",
      "Meri reflection ke saath staring contest haar gaya.",
      "Main moonwalk karne gaya aur gir gaya.",
      "Ek fortune teller ne mujhe kaha tha ke is waqt kuch mat karna.",
      "Meri blanket burrito ne mujhe attack kar diya."
  ];
    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    document.getElementById('excuseResult').value = randomExcuse;
  }
  
  // Compliment Generator
  function generateCompliment() {
    const compliments = [
      "Tum Google aur Elon Musk dono se zyada smart ho.",
      "Tumhari muskurahat hazaar soorajon ki roshni se zyada chamak rahi hai.",
      "Tum thande takiye ki doosri side se bhi zyada cool ho.",
      "Tum insano ka double rainbow ho.",
      "Tum itne zabardast ho ke tumhari parchai bhi tumse jealous hai.",
      "Tumhari hasi Coca-Cola ke ads se bhi zyada refreshing hai.",
      "Tum itne ache ho ke GPS bhi tumhe follow karta hai.",
      "Tumhari awaz auto-tune ke baghair bhi perfect lagti hai.",
      "Tumhari smile WiFi signal ko full strength dila sakti hai.",
      "Agar tum ek software hote, to koi kabhi tumhe uninstall na karta.",
      "Tum par likhi kitabein bestsellers ban jati hain.",
      "Tumhari awaz Google Maps ka alternative honi chahiye.",
      "Tumhari selfies Mona Lisa se zyada mashhoor ho sakti hain.",
      "Tum itne funny ho ke stand-up comedians tumse mashwara lete hain.",
      "Tum itne bright ho ke chamakdar light bulbs bhi jealous ho jayein.",
      "Tumhari presence mehfil ka DJ mode on kar deti hai.",
      "Tumhari baatein chocolate cake se bhi zyada meethi hain.",
      "Agar coolness ka award hota to tum hamesha jeet'te.",
      "Tum itne zabardast ho ke Google tumse sawaal poochta hai.",
      "Tumhari baat sun ke even Siri confused ho jati hai.",
      "Tum itne maze ke ho ke Netflix tumpe ek show banaye.",
      "Tumhare jokes sun ke ice cream bhi melt ho jati hai.",
      "Tumhari energy solar panels charge kar sakti hai.",
      "Tumhari tasveer passport photos ke standard change kar sakti hai.",
      "Tum itne popular ho ke pigeons bhi tumhare saath selfie lena chahte hain.",
      "Tum itne zabardast ho ke aliens bhi tumhe abduct karne ka sochte hain.",
      "Tumhari positive energy WiFi speed ko boost kar sakti hai.",
      "Tumhare bina mehfil wali mehfil adhoori lagti hai.",
      "Tumhari tasveer motivational posters pe honi chahiye.",
      "Tum itne unique ho ke fingerprint scanner bhi confuse ho jaye.",
      "Tumhari kahaniyan bedtime stories se zyada interesting hoti hain.",
      "Tumhare jokes sun ke sad log bhi hasi nahi rok sakte.",
      "Tum itne fun ho ke roller coaster bhi tumse boring lagta hai.",
      "Tumhara style fashion magazines ka standard set kar sakta hai.",
      "Tumhari awaz ASMR videos se zyada soothing hai.",
      "Tum itne powerful ho ke batteries bhi tumse charge ho sakti hain.",
      "Tum itne maze ke ho ke even Tom and Jerry tumse inspiration lete hain.",
      "Tumhari baatein GPS se zyada sahi direction deti hain.",
      "Tum itne ache ho ke even horror movies tumse darti hain.",
      "Tumhare baghair selfie camera kaam nahi karta.",
      "Tum itne cool ho ke ice cubes bhi tumhare samne pighal jate hain.",
      "Tum itne zabardast ho ke cartoons bhi tumhari story chura lein.",
      "Tum itne popular ho ke even Google tumhara naam suggest karta hai.",
      "Tum itne charming ho ke mirror bhi tumhe compliment deta hai.",
      "Tum itne intelligent ho ke even Einstein tumse puchta, ‘Kaise kiya?’",
      "Tumhari presence mehfil mein automatic fun mode on kar deti hai.",
      "Tumhari energy itni zabardast hai ke Red Bull bhi tumse jealous hai.",
      "Tum itne zabardast ho ke mobile notifications bhi sirf tumhare liye aati hain.",
      "Tumhari muskurahat dekh ke even Monday happy ho jata hai.",
      "Tum itne cool ho ke AC bhi tumse thanda mehsoos karta hai.",
      "Tum itne funny ho ke even serious log bhi hasta nahi rok sakte.",
      "Tum itne special ho ke even Google pe tumhara jawab nahi milta.",
      "Tumhari presence kisi bhi boring din ko festival bana sakti hai.",
      "Tum itne bright ho ke torch light bhi extra lagti hai.",
      "Tum itne stylish ho ke even mannequins tumhe copy karna chahte hain.",
      "Tum itne zabardast ho ke even motivational speakers tumse motivation lete hain.",
      "Tum itne interesting ho ke even history books tumpe likhi jayein.",
      "Tum itne charming ho ke even Cinderella ki fairy godmother tumhe help karti.",
      "Tumhari muskurahat dekho to even traffic jam smooth ho jaye.",
      "Tum itne lajawab ho ke even chef tumhe perfect recipe ka naam dete.",
      "Tum itne brilliant ho ke light bulb bhi tumse ideas leta hai.",
      "Tum itne positive ho ke even batteries tumse charge ho sakti hain.",
      "Tumhari har baat ek TED Talk honi chahiye.",
      "Tum itne powerful ho ke even superheroes tumse training lena chahte hain.",
      "Tum itne zabardast ho ke even subtitles tumhari awaz match nahi kar sakti.",
      "Tum itne ache ho ke even weather forecast tumhari mood swings ke mutabiq hoti hai.",
      "Tum itne cool ho ke even penguins tumse inspired hain.",
      "Tum itne confident ho ke even mirrors tumhara confidence admire karte hain.",
      "Tumhari soch deep ocean se bhi zyada gehri hai.",
      "Tum itne zabardast ho ke even grammar nazis tumhari baatein accept karte hain.",
      "Tum itne inspiring ho ke even inspirational quotes tumse inspiration lete hain.",
      "Tum itne jaldi samajhne wale ho ke even artificial intelligence impressed hai.",
      "Tumhari tasveer currency notes pe honi chahiye.",
      "Tum itne charming ho ke even chocolate melt ho jati hai.",
      "Tum itne intelligent ho ke even Shakespeare tumse poetry likhwata.",
      "Tum itne brilliant ho ke even Google tumse sawaal karta hai.",
      "Tum itne zabardast ho ke even moon tumhe full-time glow deta hai.",
      "Tum itne cool ho ke even sunglasses tumhara style follow karte hain.",
      "Tum itne energetic ho ke even energy drinks tumse energy le sakti hain.",
      "Tum itne zabardast ho ke even social media tumhari stories follow karta hai.",
      "Tum itne positive ho ke even negative log tumhare saath rehna pasand karte hain.",
      "Tumhari awaz elevator music se bhi zyada soothing hai.",
      "Tum itne lucky ho ke even four-leaf clovers tumhe dhoondte hain.",
      "Tum itne awesome ho ke even emojis tumhari tarah behave karna chahte hain.",
      "Tum itne zabardast ho ke even music tumhari vibe ke mutabiq bajta hai.",
      "Tum itne smart ho ke even Google tumse shortcuts puchta hai.",
      "Tum itne funny ho ke even LOL emoji tumhare samne serious lagta hai.",
      "Tum itne cool ho ke even ice cream tumse jalti hai.",
      "Tum itne amazing ho ke even surprise birthday parties tumhare naam pe hoti hain."
  ];
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    document.getElementById('complimentResult').value = randomCompliment;
  }
  
  // Dad Joke Generator
  function generateDadJoke() {
    const dadJokes = [
      "Haddiyan ek doosray se kyun nahi larti? Kyunki unke paas guts nahi hain.",
      "Jhooti spaghetti ko kya kehte hain? Ek impasta.",
      "Scarecrow ne award kyun jeeta? Kyunki wo apne field mein outstanding tha.",
      "Agar cheese tumhari nahi hai to usey kya kehte hain? Nacho cheese!",
      "Anday mazak kyun nahi sunate? Kyunki wo ek doosray ko crack kar denge.",
      "Computer ne apni shaadi kyun tod di? Kyunki usay zyada space chahiye tha.",
      "Aalu ka sabse acha dost kaun hai? Biryani.",
      "Chai ne coffee ko kyun reject kar diya? Kyunki wo ‘tea-serious’ tha.",
      "Machli school kyun jati hai? Kyunki usay higher education chahiye.",
      "Murgi road cross kyun karti hai? Yeh jaan'ne ke liye ke doosri taraf kya hai.",
      "Kya tumhe pata hai ke tumhari nose kabhi thak nahi sakti? Kyunki wo hamesha run karti rehti hai.",
      "Mobile ne girlfriend se break-up kyun kiya? Kyunki wo ‘too many issues’ thi.",
      "Anday ne apni taqdeer pe afsos kyun kiya? Kyunki wo cracked nikla.",
      "Ek kitaab ne doosri kitaab se kya kaha? ‘Mat khol, main likh rahi hoon!’",
      "Murgi aur anda pehle kaun aya? Yeh toh sirf ek ‘egg-speriment’ bata sakta hai!",
      "Bank ka kaunsa room kabhi lock nahi hota? A mushroom!",
      "Parinda football match kyun nahi khel sakta? Kyunki uska goal kabootar khana hai!",
      "Pizza ne burger se kya kaha? ‘Tum bohot pattay wale ho!’",
      "Mujhe music se pyaar hai, lekin mai notes yaad nahi rakh sakta!",
      "Ek tomato ne doosre tomato se kya kaha? ‘Ketchup!’",
      "Mujhe paani ka mazak bohot acha lagta hai, par yeh thoda ‘dry’ hai!",
      "Laptop gir gaya, magar koi chinta nahi. Uski memory strong hai!",
      "Mujhe math ki problem samajh nahi ayi… shayad wo complicated ‘plus’ thi.",
      "Football ka match kyun late shuru hua? Kyunki referee ‘kick off’ lene gaya tha!",
      "Chawal ki shaadi hui to uski wife ka naam kya hoga? ‘Biryani’!",
      "Ek kitaab school kyun nahi gayi? Kyunki uski sab kahaniyan khatam ho chuki thi.",
      "Agar billi scientist hoti, to wo kis cheez par research karti? ‘Cat-ion’ aur ‘Purr-tons’!",
      "Ek biscuit ne chai se kya kaha? ‘Mujhe mat dooba, main toot jaunga!’",
      "Ek invisible aadmi ne job kyun nahi mili? Kyunki koi uska interview nahi le saka!",
      "Pani ki shaadi kaise hoti hai? ‘Jalebi’ bana kar!",
      "Car aur cycle ne race kyun nahi ki? Kyunki cycle ‘tired’ thi!",
      "Ek safed rang ki billi ne blackboard pe kya likha? ‘Meow-thematics!’",
      "Ek chappal doosri chappal se kyun milti hai? Kyunki unka ‘pair’ hota hai!",
      "Ek machli doosri machli se kya kehti hai? ‘Pani mein cool rehna, bro!’",
      "Dost ek dosray ko kyun mazak sunate hain? Taki unka ‘bond strong’ ho!",
      "Mujhe ajeeb lagta hai jab koi ice cream jaldi jaldi kha leta hai… bhai, ‘chill’ kar!",
      "Main jaha bhi jata hoon, log mujhe follow karte hain… shayad isliye kyunki mai ‘leader’ nahi ‘follower’ hoon!",
      "Doctor ne patient se kaha: ‘Tumhe rest lena hoga’… Patient bola: ‘Doctor sahab, mai toh already ‘rest-aurant’ gaya tha!’",
      "Agar mushroom itna popular hota hai, to uska naam ‘fun-guy’ kyun rakha hai?",
      "Agar pizza rectangle hota, to kya usay ‘square meal’ keh sakte thay?",
      "Main bohot khush hoon kyunki aaj ‘battery full’ energy hai!",
      "Kya tumne suna? Ek orange ne doosre orange se kaha, ‘Tu mujhe juice lagta hai!’",
      "Tum itne slow ho, ki snail bhi tumse pehle finish line tak pohanch jayega!",
      "Aalu itna emotional kyun hota hai? Kyunki uska ‘mash’ hojata hai!",
      "Jab koi sasta joke sunta hoon, to mai kehta hoon, ‘Ye bohot ‘cheap’ hai bhai!’",
      "Ek angoor bike chalana kyun nahi seekhta? Kyunki wo ‘raisin’ nahi lena chahta!",
      "Agar bottle cap ka future hota, to wo kya banta? ‘Cap-tain’!",
      "Bakra dentist kyun gaya? Kyunki uske ‘dant’ hil rahe thay!",
      "Agar bottle ke andar pani kam hai, to kya wo ‘half full’ hai ya ‘half empty’?",
      "Murgi ne computer kyun kharida? Kyunki usay ‘egg-cell’ use karna tha!",
      "Patang ne mausam se kya kaha? ‘Udhne ka mood nahi hai, thoda hawa badhao!’",
      "Ek chashma doosre chashme se kya keh raha tha? ‘Bhai, zara clear dikh raha hai?’",
      "Duniya ka sabse ‘heavy’ number kaunsa hai? ‘Eight’… kyunki uska weight ‘ate’ hai!",
      "Sabziyon ki duniya ka best dancer kaun hai? ‘Bhangra-gobi’!",
      "Agar truck chhota hota, to kya use ‘truck’ nahi ‘tricky’ keh sakte thay?",
      "Agar haathi Patiala ka hota, to kya use ‘Patiala elephant’ kehte?",
      "Kya tumne suna? Ek bhalu ne chay pi, ab wo ‘chai-lax’ feel kar raha hai!",
      "Ghar ka kaunsa room sabse musical hota hai? ‘Drum-room’!",
      "Kaunsa aisa mazak hai jo hamesha viral jata hai? ‘Flu joke’!",
      "Murgi ne egg se kya kaha? ‘Beta, anday mat do, soch samajh ke bolo!’",
      "Mujhe maths se nafrat hai… wo hamesha ‘problem’ deta hai!",
      "Ek battery ka sabse bara problem kya hai? ‘Low energy’ ka issue!",
      "Kya tum jaante ho ke mirror selfie lene se pehle bhi tum handsome ho?",
      "Ek bandar ice cream kyun nahi khata? Kyunki wo ‘banana split’ pasand karta hai!",
      "Pani ka sabse bara dushman kaun hai? ‘Pyaas’!"
  ];
    const randomJoke = dadJokes[Math.floor(Math.random() * dadJokes.length)];
    document.getElementById('dadJokeResult').value = randomJoke;
  }
  
  // Pirate Translator
  function translateToPirate() {
    const text = document.getElementById('pirateInput').value;
    const pirateTranslation = text
    .replace(/hello/gi, 'ahoy')
    .replace(/yes/gi, 'aye')
    .replace(/no/gi, 'nay')
    .replace(/you/gi, 'ye')
    .replace(/your/gi, 'yer')
    .replace(/my/gi, 'me')
    .replace(/friend/gi, 'matey')
    .replace(/is/gi, 'be')
    .replace(/are/gi, 'be')
    .replace(/money/gi, 'doubloons')
    .replace(/treasure/gi, 'booty')
    .replace(/food/gi, 'grub')
    .replace(/drink/gi, 'grog')
    .replace(/captain/gi, 'Cap’n')
    .replace(/ship/gi, 'vessel')
    .replace(/sail/gi, 'hoist the sails')
    .replace(/sea/gi, 'briny deep')
    .replace(/ocean/gi, 'briny deep')
    .replace(/good/gi, 'jolly')
    .replace(/bad/gi, 'scurvy')
    .replace(/man/gi, 'buccaneer')
    .replace(/woman/gi, 'lass')
    .replace(/boy/gi, 'lad')
    .replace(/girl/gi, 'lass')
    .replace(/stop/gi, 'avast')
    .replace(/go/gi, 'set sail')
    .replace(/fast/gi, 'quick as a whip')
    .replace(/slow/gi, 'like a sea slug')
    .replace(/crazy/gi, 'mad as a hatter')
    .replace(/fight/gi, 'duel')
    .replace(/win/gi, 'claim victory')
    .replace(/lose/gi, 'walk the plank')
    .replace(/brave/gi, 'bold')
    .replace(/fear/gi, 'shiver me timbers')
    .replace(/strong/gi, 'as sturdy as a mast')
    .replace(/weak/gi, 'soft as a jellyfish')
    .replace(/love/gi, 'be smitten with')
    .replace(/hate/gi, 'loathe')
    .replace(/work/gi, 'toil')
    .replace(/fun/gi, 'merrymaking')
    .replace(/party/gi, 'shindig')
    .replace(/home/gi, 'port')
    .replace(/house/gi, 'cabin')
    .replace(/bed/gi, 'hammock')
    .replace(/sleep/gi, 'catch some shut-eye')
    .replace(/wake up/gi, 'rise and shine')
    .replace(/run/gi, 'make haste')
    .replace(/walk/gi, 'trot')
    .replace(/dance/gi, 'jig')
    .replace(/storm/gi, 'tempest')
    .replace(/wind/gi, 'gale')
    .replace(/sun/gi, 'blazing orb')
    .replace(/moon/gi, 'ghostly lantern')
    .replace(/star/gi, 'guiding light')
    .replace(/cloud/gi, 'puffy swab')
    .replace(/rain/gi, 'heavens weep')
    .replace(/thunder/gi, 'sky’s roar')
    .replace(/lightning/gi, 'sky’s fire')
    .replace(/doctor/gi, 'sawbones')
    .replace(/teacher/gi, 'wisdom whisperer')
    .replace(/money/gi, 'pieces of eight')
    .replace(/gold/gi, 'shiny loot')
    .replace(/silver/gi, 'shimmering coin')
    .replace(/market/gi, 'trading post')
    .replace(/buy/gi, 'barter')
    .replace(/sell/gi, 'trade')
    .replace(/steal/gi, 'plunder')
    .replace(/lie/gi, 'spin a yarn')
    .replace(/truth/gi, 'honest word')
    .replace(/king/gi, 'royal landlubber')
    .replace(/queen/gi, 'high sea’s lady')
    .replace(/prince/gi, 'young scallywag')
    .replace(/princess/gi, 'fair lass of the seas')
    .replace(/enemy/gi, 'scallywag')
    .replace(/joke/gi, 'jest')
    .replace(/laugh/gi, 'chuckle like a parrot')
    .replace(/cry/gi, 'weep like a mermaid')
    .replace(/angry/gi, 'boilin’ mad')
    .replace(/happy/gi, 'jolly as a sea shanty')
    .replace(/sad/gi, 'blue as the deep')
    .replace(/hungry/gi, 'starvin’ like a castaway')
    .replace(/thirsty/gi, 'parched as a desert island')
    .replace(/smart/gi, 'sharp as a cutlass')
    .replace(/dumb/gi, 'thick as a plank')
    .replace(/talk/gi, 'speak like a parrot')
    .replace(/listen/gi, 'lend an ear')
    .replace(/understand/gi, 'grasp the ropes')
    .replace(/question/gi, 'riddle me this')
    .replace(/answer/gi, 'spill the beans')
    .replace(/think/gi, 'ponder like an old sea dog')
    .replace(/problem/gi, 'rough waters')
    .replace(/solution/gi, 'safe harbor')
    .replace(/win/gi, 'take the prize')
    .replace(/lose/gi, 'be marooned')
    .replace(/easy/gi, 'smooth sailing')
    .replace(/hard/gi, 'rough seas ahead')
    .replace(/road/gi, 'path of the waves')
    .replace(/car/gi, 'land boat')
    .replace(/bicycle/gi, 'land schooner')
    .replace(/train/gi, 'iron whale')
    .replace(/airplane/gi, 'sky ship')
    .replace(/music/gi, 'sea shanty')
    .replace(/song/gi, 'tune of the deep')
    .replace(/movie/gi, 'moving pictures of the seas')
    .replace(/book/gi, 'tale of old')
    .replace(/computer/gi, 'magic box')
    .replace(/internet/gi, 'sea of knowledge')
    .replace(/phone/gi, 'speaking contraption')
    .replace(/message/gi, 'bottle note');
  
    document.getElementById('pirateResult').value = pirateTranslation;
  }
          
          
            // Word Counter
  function countWords() {
    const text = document.getElementById("wordCounterInput").value;
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    document.getElementById("wordCountResult").value = wordCount;
  }
  
  // Character Counter
  function countCharacters() {
    const text = document.getElementById("characterCounterInput").value;
    document.getElementById("characterCountResult").value = text.length;
  }
  
  // Text Case Converter
  function convertTextCase() {
    const text = document.getElementById("textCaseInput").value;
    const caseType = document.getElementById("textCaseType").value;
    let convertedText = "";
  
    switch (caseType) {
      case "uppercase":
        convertedText = text.toUpperCase();
        break;
      case "lowercase":
        convertedText = text.toLowerCase();
        break;
      case "titlecase":
        convertedText = text.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        break;
    }
  
    document.getElementById("textCaseResult").value = convertedText;
  }
  
  // Lorem Ipsum Generator
  function generateLoremIpsum() {
    const paragraphs = parseInt(document.getElementById("loremParagraphs").value);
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
    let result = "";
  
    for (let i = 0; i < paragraphs; i++) {
      result += loremIpsum.repeat(5) + "\n\n";
    }
  
    document.getElementById("loremIpsumResult").value = result.trim();
  }
  
  // Base64 Encoder & Decoder
  function convertBase64() {
    const text = document.getElementById("base64Input").value;
    const action = document.getElementById("base64Action").value;
    let result = "";
  
    if (action === "encode") {
      result = btoa(text);
    } else if (action === "decode") {
      try {
        result = atob(text);
      } catch (error) {
        result = "Invalid Base64 input.";
      }
    }
  
    document.getElementById("base64Result").value = result;
  }
            
  
    function colourvalue(){
      const color = document.getElementById('colorPickerInput').value;
      document.getElementById('hexValue').value = color;
      const rgb = hexToRgb(color);
      document.getElementById('rgbValue').value = rgb;
    }
    
  
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  // Coin Flip Simulator
  function flipCoin() {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    document.getElementById('coinFlipResult').value = result;
  }
  
  // Random Number Generator
  function generateRandomNumber() {
    const min = parseInt(document.getElementById('minValue').value);
    const max = parseInt(document.getElementById('maxValue').value);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById('randomNumberResult').value = randomNumber;
  }
  
  // Days Between Two Dates Calculator
  function calculateDays() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const timeDiff = endDate - startDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    document.getElementById('daysBetweenResult').value = daysDiff;
  }
  
  // Prime Number Checker
  function checkPrime() {
    const num = parseInt(document.getElementById('primeNumberInput').value);
    let isPrime = true;
    if (num <= 1) isPrime = false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    document.getElementById('primeNumberResult').value = isPrime ? 'Prime' : 'Not Prime';
  }
  
  // Quadratic Equation Solver
  function solveQuadratic() {
    const a = parseFloat(document.getElementById('quadraticA').value);
    const b = parseFloat(document.getElementById('quadraticB').value);
    const c = parseFloat(document.getElementById('quadraticC').value);
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      document.getElementById('quadraticResult').value = 'No real roots';
    } else {
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      document.getElementById('quadraticResult').value = `Roots: ${root1}, ${root2}`;
    }
  }
  
  // HCF & LCM Calculator
  function calculateHcfLcm() {
    const num1 = parseInt(document.getElementById('hcfLcmNumber1').value);
    const num2 = parseInt(document.getElementById('hcfLcmNumber2').value);
    const hcf = calculateHCF(num1, num2);
    const lcm = (num1 * num2) / hcf;
    document.getElementById('hcfResult').value = hcf;
    document.getElementById('lcmResult').value = lcm;
  }
  
  function calculateHCF(a, b) {
    if (b === 0) return a;
    return calculateHCF(b, a % b);
  }
  
  // Anagram Generator
  function generateAnagram() {
    const word = document.getElementById('anagramInput').value;
    const anagram = word.split('').sort(() => Math.random() - 0.5).join('');
    document.getElementById('anagramResult').value = anagram;
  }
  
  // Reverse Text Tool
  function reverseText() {
    const text = document.getElementById('reverseTextInput').value;
    const reversedText = text.split('').reverse().join('');
    document.getElementById('reverseTextResult').value = reversedText;
  }
  
  // Palindrome Checker
  function checkPalindrome() {
    const text = document.getElementById('palindromeInput').value.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedText = text.split('').reverse().join('');
    document.getElementById('palindromeResult').value = text === reversedText ? 'Palindrome' : 'Not Palindrome';
  }
  
  // Slug Generator
  function generateSlug() {
    const text = document.getElementById('slugInput').value;
    const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    document.getElementById('slugResult').value = slug;
  }
  
  // Hex to RGB & RGB to Hex Converter
  function convertHexRgb() {
    const input = document.getElementById('hexRgbInput').value.trim();
    if (input.startsWith('#')) {
      const rgb = hexToRgb(input);
      document.getElementById('hexRgbResult').value = rgb;
    } else if (input.startsWith('rgb')) {
      const hex = rgbToHex(input);
      document.getElementById('hexRgbResult').value = hex;
    } else {
      document.getElementById('hexRgbResult').value = 'Invalid input';
    }
  }
  
  function rgbToHex(rgb) {
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
  
  // Password Generator
  function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value);
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.getElementById('passwordResult').value = password;
  }
