
$(document).ready(function() {
$('.searchable').select2({
    placeholder: "Search and select a tool...",
    allowClear: true
});

$('.searchable').on('change', function() {
    var selectedToolId = this.value;
    var selectedToolElement = $("#" + selectedToolId).closest('.tools-item');
    var toolsList = selectedToolElement.closest('.tools-list');

    if (selectedToolElement.length && toolsList.length) {
        toolsList.find(".tools-item").removeClass("selected");
        selectedToolElement.addClass("selected");

        // Calculate horizontal scroll position correctly
        var scrollPositionHorizontal = selectedToolElement.position().left;
        toolsList.animate({
            scrollLeft: scrollPositionHorizontal
        }, 800, function() {
            setTimeout(function() {
                $('html, body').animate({
                    scrollTop: selectedToolElement.offset().top - 150
                }, 1000);
            }, 100);
        });

        toolsList.find('.tool-machine').hide();
        selectedToolElement.find('.tool-machine').show();
    }
});

$('.tool-machine').hide();
});
    
















   // Helper function to log messages
function logMessage(logContainer, message) {
  const logEntry = document.createElement('div');
  logEntry.className = 'log-entry';
  logEntry.textContent = message;
  logContainer.appendChild(logEntry);
  logContainer.scrollTop = logContainer.scrollHeight; // Auto-scroll
}

// Helper function to convert text case
function convertTextCase(text, caseType) {
  if (caseType === 'text-to-uppercase') {
    return text.toUpperCase();
  } else if (caseType === 'text-to-lowercase') {
    return text.toLowerCase();
  } else if (caseType === 'text-to-titlecase') {
    return text.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  }
  return text;
}

// File to PDF Converter
const fileInputPdf = document.getElementById('file-input-pdf');
const convertButtonPdf = document.getElementById('convert-button-pdf');
const downloadButtonPdf = document.getElementById('download-button-pdf');
const logContainerPdf = document.getElementById('log-container-pdf');
let convertedFilePdf = null;

convertButtonPdf.addEventListener('click', async () => {
  const selectedOption = document.getElementById('fromfiletoPdf').value;
  const file = fileInputPdf.files[0];

  if (!file) {
    logMessage(logContainerPdf, "Error: Please select a file.");
    return;
  }

  logMessage(logContainerPdf, `File selected: ${file.name}`);
  logMessage(logContainerPdf, `Conversion requested: ${selectedOption}`);

  try {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      if (selectedOption === 'txt-to-pdf') {
        doc.text(text, 10, 10);
      } else if (selectedOption === 'html-to-pdf') {
        await doc.html(text, { callback: () => {} });
      }
      const pdfBlob = doc.output('blob');
      convertedFilePdf = new File([pdfBlob], file.name.replace(/\.[^/.]+$/, '.pdf'), { type: 'application/pdf' });
      logMessage(logContainerPdf, "Conversion complete: File to PDF");
      downloadButtonPdf.disabled = false;
    };
    reader.readAsText(file);
  } catch (error) {
    logMessage(logContainerPdf, `Error: ${error.message}`);
  }
});

downloadButtonPdf.addEventListener('click', () => {
  if (convertedFilePdf) {
    saveAs(convertedFilePdf, convertedFilePdf.name);
    logMessage(logContainerPdf, `Downloaded: ${convertedFilePdf.name}`);
  } else {
    logMessage(logContainerPdf, "Error: No converted file available.");
  }
});

// CSV to JSON Converter
const fileInputCsv = document.getElementById('file-input-csv');
const convertButtonCsv = document.getElementById('convert-button-csv');
const downloadButtonCsv = document.getElementById('download-button-csv');
const logContainerCsv = document.getElementById('log-container-csv');
let convertedFileCsv = null;

convertButtonCsv.addEventListener('click', async () => {
  const file = fileInputCsv.files[0];

  if (!file) {
    logMessage(logContainerCsv, "Error: Please select a file.");
    return;
  }

  logMessage(logContainerCsv, `File selected: ${file.name}`);
  logMessage(logContainerCsv, "Conversion requested: CSV to JSON");

  try {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const csv = event.target.result;
      const json = await convertCSVToJSON(csv);
      convertedFileCsv = new File([json], file.name.replace('.csv', '.json'), { type: 'application/json' });
      logMessage(logContainerCsv, "Conversion complete: CSV to JSON");
      downloadButtonCsv.disabled = false;
    };
    reader.readAsText(file);
  } catch (error) {
    logMessage(logContainerCsv, `Error: ${error.message}`);
  }
});

downloadButtonCsv.addEventListener('click', () => {
  if (convertedFileCsv) {
    saveAs(convertedFileCsv, convertedFileCsv.name);
    logMessage(logContainerCsv, `Downloaded: ${convertedFileCsv.name}`);
  } else {
    logMessage(logContainerCsv, "Error: No converted file available.");
  }
});

// Text Case Converter
const fileInputText = document.getElementById('file-input-text');
const convertButtonText = document.getElementById('convert-button-text');
const downloadButtonText = document.getElementById('download-button-text');
const logContainerText = document.getElementById('log-container-text');
let convertedFileText = null;

convertButtonText.addEventListener('click', async () => {
  const selectedOption = document.getElementById('fromtexttocase').value;
  const file = fileInputText.files[0];

  if (!file) {
    logMessage(logContainerText, "Error: Please select a file.");
    return;
  }

  logMessage(logContainerText, `File selected: ${file.name}`);
  logMessage(logContainerText, `Conversion requested: ${selectedOption}`);

  try {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const convertedText = convertTextCase(text, selectedOption);
      convertedFileText = new File([convertedText], file.name.replace('.txt', `_${selectedOption}.txt`), { type: 'text/plain' });
      logMessage(logContainerText, `Conversion complete: ${selectedOption}`);
      downloadButtonText.disabled = false;
    };
    reader.readAsText(file);
  } catch (error) {
    logMessage(logContainerText, `Error: ${error.message}`);
  }
});

downloadButtonText.addEventListener('click', () => {
  if (convertedFileText) {
    saveAs(convertedFileText, convertedFileText.name);
    logMessage(logContainerText, `Downloaded: ${convertedFileText.name}`);
  } else {
    logMessage(logContainerText, "Error: No converted file available.");
  }
});
  









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
          















function convertNumber() {
var numberInput = document.getElementById("numberInput").value;
var fromBase = parseInt(document.getElementById("fromBase").value);
var toBase = parseInt(document.getElementById("toBase").value);
var conversionResult = document.getElementById("conversionResult");

try {
    var decimalValue = parseInt(numberInput, fromBase);
    var result = decimalValue.toString(toBase).toUpperCase();
    conversionResult.value = result;
} catch (error) {
    conversionResult.value = "Invalid Input";
}
}









// Graphing Calculator (Basic) (e-24)
function plotGraph() {
  const funcStr = document.getElementById('graphFunction').value;
  const xMin = parseFloat(document.getElementById('xMin').value);
  const xMax = parseFloat(document.getElementById('xMax').value);
  const yMin = parseFloat(document.getElementById('yMin').value);
  const yMax = parseFloat(document.getElementById('yMax').value);
  
  const canvas = document.getElementById('graphCanvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  canvas.width = canvas.offsetWidth;
  canvas.height = 300;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw axes
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;
  
  // X axis
  const xZero = canvas.width * (-xMin) / (xMax - xMin);
  const yZero = canvas.height * (1 - (-yMin) / (yMax - yMin));
  
  ctx.beginPath();
  ctx.moveTo(0, yZero);
  ctx.lineTo(canvas.width, yZero);
  ctx.stroke();
  
  // Y axis
  ctx.beginPath();
  ctx.moveTo(xZero, 0);
  ctx.lineTo(xZero, canvas.height);
  ctx.stroke();
  
  // Draw grid
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 0.5;
  
  // Vertical grid lines
  const xStep = (xMax - xMin) / 10;
  for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
    const xPos = (x - xMin) / (xMax - xMin) * canvas.width;
    ctx.beginPath();
    ctx.moveTo(xPos, 0);
    ctx.lineTo(xPos, canvas.height);
    ctx.stroke();
    
    // X axis labels
    if (Math.abs(x) > 0.001) { // Don't label 0 twice
      ctx.fillStyle = '#000';
      ctx.font = '10px Arial';
      ctx.fillText(x.toFixed(1), xPos - 10, yZero + 15);
    }
  }
  
  // Horizontal grid lines
  const yStep = (yMax - yMin) / 10;
  for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
    const yPos = canvas.height - (y - yMin) / (yMax - yMin) * canvas.height;
    ctx.beginPath();
    ctx.moveTo(0, yPos);
    ctx.lineTo(canvas.width, yPos);
    ctx.stroke();
    
    // Y axis labels
    if (Math.abs(y) > 0.001) { // Don't label 0 twice
      ctx.fillStyle = '#000';
      ctx.font = '10px Arial';
      ctx.fillText(y.toFixed(1), xZero + 5, yPos + 5);
    }
  }
  
  // Draw function
  ctx.strokeStyle = '#3a86ff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  let firstPoint = true;
  for (let xPixel = 0; xPixel < canvas.width; xPixel++) {
    const x = xMin + (xPixel / canvas.width) * (xMax - xMin);
    
    try {
      // Create a function with 'x' as variable
      const func = new Function('x', `return ${funcStr};`);
      const y = func(x);
      
      // Skip points outside the visible range
      if (isNaN(y) || y < yMin || y > yMax) {
        firstPoint = true;
        continue;
      }
      
      const yPixel = canvas.height - ((y - yMin) / (yMax - yMin) * canvas.height);
      
      if (firstPoint) {
        ctx.moveTo(xPixel, yPixel);
        firstPoint = false;
      } else {
        ctx.lineTo(xPixel, yPixel);
      }
    } catch (e) {
      firstPoint = true;
    }
  }
  
  ctx.stroke();
}

// Initialize graph
window.addEventListener('load', function() {
  plotGraph();
});

// Arithmetic Sequence Calculator (e-25)
function calculateArithmeticSequence() {
  const a1 = parseFloat(document.getElementById('arithFirstTerm').value);
  const d = parseFloat(document.getElementById('arithCommonDiff').value);
  const n = parseInt(document.getElementById('arithNumTerms').value);
  
  let terms = [];
  for (let i = 0; i < n; i++) {
    terms.push(a1 + i * d);
  }
  
  const sum = n * (2 * a1 + (n - 1) * d) / 2;
  
  document.getElementById('arithTerms').innerHTML = `
    <p><strong>Sequence Terms:</strong> ${terms.join(', ')}</p>
    <p><strong>General Term:</strong> aₙ = ${a1} + (n-1)×${d} = ${d}n + ${a1 - d}</p>
  `;
  
  document.getElementById('arithSum').innerHTML = `
    <p><strong>Sum of first ${n} terms:</strong> Sₙ = ${sum}</p>
  `;
}

// Initialize arithmetic sequence
calculateArithmeticSequence();

// Geometric Sequence Calculator (e-26)
function calculateGeometricSequence() {
  const a1 = parseFloat(document.getElementById('geoFirstTerm').value);
  const r = parseFloat(document.getElementById('geoCommonRatio').value);
  const n = parseInt(document.getElementById('geoNumTerms').value);
  
  let terms = [];
  for (let i = 0; i < n; i++) {
    terms.push(a1 * Math.pow(r, i));
  }
  
  let sum;
  if (r === 1) {
    sum = a1 * n;
  } else {
    sum = a1 * (1 - Math.pow(r, n)) / (1 - r);
  }
  
  document.getElementById('geoTerms').innerHTML = `
    <p><strong>Sequence Terms:</strong> ${terms.map(t => t.toFixed(2)).join(', ')}</p>
    <p><strong>General Term:</strong> aₙ = ${a1} × ${r}^(n-1)</p>
  `;
  
  document.getElementById('geoSum').innerHTML = `
    <p><strong>Sum of first ${n} terms:</strong> Sₙ = ${sum.toFixed(2)}</p>
  `;
}

// Initialize geometric sequence
calculateGeometricSequence();

// Fibonacci Sequence Generator (e-27)
function generateFibonacci() {
  const n = parseInt(document.getElementById('fibNumTerms').value);
  
  let fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i-1] + fib[i-2]);
  }
  
  // If user asked for only 1 term, show just [0]
  if (n === 1) fib = [0];
  
  document.getElementById('fibResults').innerHTML = `
    <p><strong>First ${n} Fibonacci numbers:</strong></p>
    <div class="fib-sequence">${fib.join(', ')}</div>
    ${n > 2 ? `<p><strong>Ratio F(n)/F(n-1):</strong> ${(fib[n-1]/fib[n-2]).toFixed(6)} (approaches golden ratio ≈1.618034)</p>` : ''}
  `;
}

// Initialize Fibonacci sequence
generateFibonacci();

// Prime Factorization Calculator (e-28)
function calculatePrimeFactors() {
  let num = parseInt(document.getElementById('factorizeNumber').value);
  if (num < 2) {
    document.getElementById('primeFactorsResult').innerHTML = '<p>Please enter a number greater than 1</p>';
    return;
  }
  
  let originalNum = num;
  let factors = [];
  let divisor = 2;
  
  while (num >= 2) {
    if (num % divisor === 0) {
      factors.push(divisor);
      num = num / divisor;
    } else {
      divisor++;
    }
  }
  
  // Format the result with exponents
  let factorMap = {};
  factors.forEach(factor => {
    factorMap[factor] = (factorMap[factor] || 0) + 1;
  });
  
  let factorStr = Object.keys(factorMap).map(f => {
    return factorMap[f] > 1 ? `${f}^${factorMap[f]}` : f;
  }).join(' × ');
  
  document.getElementById('primeFactorsResult').innerHTML = `
    <p><strong>Prime factors of ${originalNum}:</strong> ${factorStr}</p>
    <p><strong>All prime factors:</strong> ${factors.join(', ')}</p>
  `;
}

// Initialize prime factorization
calculatePrimeFactors();










// Standard Deviation Calculator (e-19)
function calculateDeviation() {
  const dataString = document.getElementById('deviationData').value;
  const isSample = document.querySelector('input[name="deviationType"]:checked').value === 'sample';
  
  const data = dataString.split(',')
    .map(item => parseFloat(item.trim()))
    .filter(item => !isNaN(item));
  
  if (data.length === 0) {
    alert("Please enter valid numbers");
    return;
  }
  
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const squaredDiffs = data.map(val => Math.pow(val - mean, 2));
  const sumSquaredDiffs = squaredDiffs.reduce((sum, val) => sum + val, 0);
  
  const variance = isSample 
    ? sumSquaredDiffs / (data.length - 1)
    : sumSquaredDiffs / data.length;
  
  const stdDev = Math.sqrt(variance);
  
  document.getElementById('deviationMean').textContent = mean.toFixed(4);
  document.getElementById('deviationVariance').textContent = variance.toFixed(4);
  document.getElementById('deviationOutput').textContent = stdDev.toFixed(4);
}

// Variance Calculator (e-20)
function calculateVariance() {
  const dataString = document.getElementById('varianceData').value;
  const isSample = document.querySelector('input[name="varianceType"]:checked').value === 'sample';
  
  const data = dataString.split(',')
    .map(item => parseFloat(item.trim()))
    .filter(item => !isNaN(item));
  
  if (data.length === 0) {
    alert("Please enter valid numbers");
    return;
  }
  
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const squaredDiffs = data.map(val => Math.pow(val - mean, 2));
  const sumSquaredDiffs = squaredDiffs.reduce((sum, val) => sum + val, 0);
  
  const variance = isSample 
    ? sumSquaredDiffs / (data.length - 1)
    : sumSquaredDiffs / data.length;
  
  document.getElementById('varianceMean').textContent = mean.toFixed(4);
  document.getElementById('varianceSquares').textContent = sumSquaredDiffs.toFixed(4);
  document.getElementById('varianceOutput').textContent = variance.toFixed(4);
}

// Mean/Median/Mode Calculator (e-21)
function calculateCentral() {
  const dataString = document.getElementById('centralData').value;
  
  let data = dataString.split(',')
    .map(item => parseFloat(item.trim()))
    .filter(item => !isNaN(item));
  
  if (data.length === 0) {
    alert("Please enter valid numbers");
    return;
  }
  
  // Sort data for median calculation
  data.sort((a, b) => a - b);
  
  // Calculate mean
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  
  // Calculate median
  let median;
  const mid = Math.floor(data.length / 2);
  if (data.length % 2 === 0) {
    median = (data[mid - 1] + data[mid]) / 2;
  } else {
    median = data[mid];
  }
  
  // Calculate mode
  const frequency = {};
  let maxFreq = 0;
  let modes = [];
  
  data.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
      modes = [num];
    } else if (frequency[num] === maxFreq) {
      modes.push(num);
    }
  });
  
  // Calculate range
  const range = data[data.length - 1] - data[0];
  
  // Display results
  document.getElementById('centralCount').textContent = data.length;
  document.getElementById('centralMean').textContent = mean.toFixed(4);
  document.getElementById('centralMedian').textContent = median.toFixed(4);
  document.getElementById('centralMode').textContent = 
    maxFreq === 1 ? "No mode" : modes.join(", ");
  document.getElementById('centralRange').textContent = range.toFixed(4);
}

// Linear Equation Solver (e-22)
function solveLinear() {
  const a = parseFloat(document.getElementById('linearA').value);
  const b = parseFloat(document.getElementById('linearB').value);
  const c = parseFloat(document.getElementById('linearC').value);
  
  if (a === 0) {
    alert("Coefficient 'a' cannot be zero");
    return;
  }
  
  const steps = [];
  steps.push(`${a}x + ${b} = ${c}`);
  steps.push(`${a}x = ${c} - ${b}`);
  steps.push(`${a}x = ${c - b}`);
  steps.push(`x = ${c - b} / ${a}`);
  
  const solution = (c - b) / a;
  
  document.getElementById('linearSteps').innerHTML = 
    steps.map(step => `<p>${step}</p>`).join('');
  document.getElementById('linearSolution').textContent = solution.toFixed(4);
}

// System of Equations Solver (e-23)
function solveSystem() {
  const a1 = parseFloat(document.getElementById('systemA1').value);
  const b1 = parseFloat(document.getElementById('systemB1').value);
  const c1 = parseFloat(document.getElementById('systemC1').value);
  const a2 = parseFloat(document.getElementById('systemA2').value);
  const b2 = parseFloat(document.getElementById('systemB2').value);
  const c2 = parseFloat(document.getElementById('systemC2').value);
  const method = document.getElementById('systemMethod').value;
  
  let steps = [];
  let x, y;
  
  if (method === 'substitution') {
    // Substitution method
    steps.push(`Equation 1: ${a1}x + ${b1}y = ${c1}`);
    steps.push(`Equation 2: ${a2}x + ${b2}y = ${c2}`);
    
    // Solve equation 1 for y
    if (b1 !== 0) {
      steps.push(`From equation 1: y = (${c1} - ${a1}x) / ${b1}`);
      const expr = `(${c2} - ${a2}x) / ${b2} = (${c1} - ${a1}x) / ${b1}`;
      steps.push(`Substitute into equation 2: ${expr}`);
      
      // Cross multiply
      steps.push(`${b1}(${c2} - ${a2}x) = ${b2}(${c1} - ${a1}x)`);
      const left = b1 * c2;
      const right = b2 * c1;
      const xCoeff = -a2 * b1 + a1 * b2;
      
      steps.push(`${left} - ${a2*b1}x = ${right} - ${a1*b2}x`);
      steps.push(`${-a2*b1}x + ${a1*b2}x = ${right} - ${left}`);
      steps.push(`${xCoeff}x = ${right - left}`);
      
      x = (right - left) / xCoeff;
      steps.push(`x = ${x.toFixed(4)}`);
      
      // Now solve for y
      y = (c1 - a1 * x) / b1;
      steps.push(`y = (${c1} - ${a1}*${x.toFixed(4)}) / ${b1} = ${y.toFixed(4)}`);
    } else {
      // If b1 is 0, solve for x first
      x = c1 / a1;
      steps.push(`From equation 1: x = ${c1} / ${a1} = ${x.toFixed(4)}`);
      steps.push(`Substitute into equation 2: ${a2}*${x.toFixed(4)} + ${b2}y = ${c2}`);
      y = (c2 - a2 * x) / b2;
      steps.push(`y = (${c2} - ${a2}*${x.toFixed(4)}) / ${b2} = ${y.toFixed(4)}`);
    }
  } else {
    // Elimination method
    steps.push(`Equation 1: ${a1}x + ${b1}y = ${c1}`);
    steps.push(`Equation 2: ${a2}x + ${b2}y = ${c2}`);
    
    // Find multipliers to eliminate one variable
    const lcmA = a1 * a2 / gcd(Math.abs(a1), Math.abs(a2));
    const mult1 = lcmA / a1;
    const mult2 = -lcmA / a2;
    
    steps.push(`Multiply equation 1 by ${mult1} and equation 2 by ${mult2}`);
    steps.push(`New equation 1: ${a1*mult1}x + ${b1*mult1}y = ${c1*mult1}`);
    steps.push(`New equation 2: ${a2*mult2}x + ${b2*mult2}y = ${c2*mult2}`);
    
    // Add equations
    const sumY = b1*mult1 + b2*mult2;
    const sumC = c1*mult1 + c2*mult2;
    steps.push(`Add equations: ${sumY}y = ${sumC}`);
    
    y = sumC / sumY;
    steps.push(`y = ${sumC} / ${sumY} = ${y.toFixed(4)}`);
    
    // Substitute back to find x
    steps.push(`Substitute y into equation 1: ${a1}x + ${b1}*${y.toFixed(4)} = ${c1}`);
    x = (c1 - b1 * y) / a1;
    steps.push(`x = (${c1} - ${b1}*${y.toFixed(4)}) / ${a1} = ${x.toFixed(4)}`);
  }
  
  document.getElementById('systemSteps').innerHTML = 
    steps.map(step => `<p>${step}</p>`).join('');
  document.getElementById('systemX').textContent = x.toFixed(4);
  document.getElementById('systemY').textContent = y.toFixed(4);
}

// Helper function for GCD (used in system solver)
function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}









// Fraction Calculator (e-14)
function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}

function simplifyFraction(numerator, denominator) {
  const commonDivisor = gcd(Math.abs(numerator), Math.abs(denominator));
  return {
    num: numerator / commonDivisor,
    den: denominator / commonDivisor
  };
}

function calculateFraction() {
  const num1 = parseInt(document.getElementById('fracNum1').value);
  const den1 = parseInt(document.getElementById('fracDen1').value);
  const num2 = parseInt(document.getElementById('fracNum2').value);
  const den2 = parseInt(document.getElementById('fracDen2').value);
  const operation = document.getElementById('fracOperation').value;
  
  if (den1 === 0 || den2 === 0) {
    alert("Denominator cannot be zero");
    return;
  }
  
  let resultNum, resultDen;
  let steps = "";
  
  switch(operation) {
    case 'add':
      resultNum = num1 * den2 + num2 * den1;
      resultDen = den1 * den2;
      steps = `(${num1}/${den1}) + (${num2}/${den2}) = (${num1*den2} + ${num2*den1})/${den1*den2} = ${resultNum}/${resultDen}`;
      break;
    case 'subtract':
      resultNum = num1 * den2 - num2 * den1;
      resultDen = den1 * den2;
      steps = `(${num1}/${den1}) - (${num2}/${den2}) = (${num1*den2} - ${num2*den1})/${den1*den2} = ${resultNum}/${resultDen}`;
      break;
    case 'multiply':
      resultNum = num1 * num2;
      resultDen = den1 * den2;
      steps = `(${num1}/${den1}) × (${num2}/${den2}) = ${num1*num2}/${den1*den2} = ${resultNum}/${resultDen}`;
      break;
    case 'divide':
      resultNum = num1 * den2;
      resultDen = den1 * num2;
      steps = `(${num1}/${den1}) ÷ (${num2}/${den2}) = ${num1}/${den1} × ${den2}/${num2} = ${resultNum}/${resultDen}`;
      break;
  }
  
  // Simplify fraction
  const simplified = simplifyFraction(resultNum, resultDen);
  if (simplified.num !== resultNum || simplified.den !== resultDen) {
    steps += ` = ${simplified.num}/${simplified.den}`;
  }
  
  // Display results
  document.getElementById('fractionSolution').innerHTML = steps;
  
  if (simplified.den === 1) {
    document.getElementById('fracResult').textContent = simplified.num;
  } else if (Math.abs(simplified.num) > simplified.den) {
    const whole = Math.floor(simplified.num / simplified.den);
    const remainder = Math.abs(simplified.num) % simplified.den;
    document.getElementById('fracResult').textContent = 
      `${whole} ${remainder}/${simplified.den}`;
  } else {
    document.getElementById('fracResult').textContent = 
      `${simplified.num}/${simplified.den}`;
  }
  
  document.getElementById('fracDecimal').textContent = 
    (simplified.num / simplified.den).toFixed(5);
}

// Complex Number Calculator (e-15)
function calculateComplex() {
  const real1 = parseFloat(document.getElementById('complexReal1').value) || 0;
  const imag1 = parseFloat(document.getElementById('complexImag1').value) || 0;
  const real2 = parseFloat(document.getElementById('complexReal2').value) || 0;
  const imag2 = parseFloat(document.getElementById('complexImag2').value) || 0;
  const operation = document.getElementById('complexOperation').value;
  
  let resultReal, resultImag;
  
  switch(operation) {
    case 'add':
      resultReal = real1 + real2;
      resultImag = imag1 + imag2;
      break;
    case 'subtract':
      resultReal = real1 - real2;
      resultImag = imag1 - imag2;
      break;
    case 'multiply':
      resultReal = real1 * real2 - imag1 * imag2;
      resultImag = real1 * imag2 + imag1 * real2;
      break;
    case 'divide':
      const denominator = real2 * real2 + imag2 * imag2;
      resultReal = (real1 * real2 + imag1 * imag2) / denominator;
      resultImag = (imag1 * real2 - real1 * imag2) / denominator;
      break;
    case 'conjugate':
      resultReal = real1;
      resultImag = -imag1;
      break;
    case 'magnitude':
      resultReal = Math.sqrt(real1 * real1 + imag1 * imag1);
      resultImag = 0;
      break;
  }
  
  // Rectangular form
  const rectResult = `${resultReal.toFixed(3)} ${resultImag >= 0 ? '+' : ''}${resultImag.toFixed(3)}i`;
  document.getElementById('complexRectResult').textContent = rectResult;
  
  // Polar form (only for non-magnitude operations)
  if (operation !== 'magnitude') {
    const magnitude = Math.sqrt(resultReal * resultReal + resultImag * resultImag);
    const angle = Math.atan2(resultImag, resultReal) * 180 / Math.PI;
    document.getElementById('complexPolarResult').textContent = 
      `${magnitude.toFixed(3)}∠${angle.toFixed(1)}°`;
  } else {
    document.getElementById('complexPolarResult').textContent = "N/A";
  }
}

// Show/hide second complex number based on operation
document.getElementById('complexOperation').addEventListener('change', function() {
  const showB = !['conjugate', 'magnitude'].includes(this.value);
  document.getElementById('complexBContainer').style.display = showB ? 'flex' : 'none';
});

// Unit Circle Calculator (e-16)
function drawUnitCircle(angleDeg) {
  const canvas = document.getElementById('unitCircleCanvas');
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 120;
  const angleRad = angleDeg * Math.PI / 180;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw axes
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(canvas.width, centerY);
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvas.height);
  ctx.strokeStyle = '#aaa';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Draw angle line
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + radius * Math.cos(angleRad), centerY - radius * Math.sin(angleRad));
  ctx.strokeStyle = '#4a6baf';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw point on circumference
  ctx.beginPath();
  ctx.arc(centerX + radius * Math.cos(angleRad), centerY - radius * Math.sin(angleRad), 5, 0, 2 * Math.PI);
  ctx.fillStyle = '#4a6baf';
  ctx.fill();
  
  // Draw angle arc
  ctx.beginPath();
  ctx.arc(centerX, centerY, 30, 0, -angleRad);
  ctx.strokeStyle = '#ff6b6b';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function calculateUnitCircle() {
  const angleDeg = parseFloat(document.getElementById('unitCircleAngle').value);
  const angleRad = angleDeg * Math.PI / 180;
  
  // Calculate values
  const x = Math.cos(angleRad);
  const y = Math.sin(angleRad);
  const tan = Math.tan(angleRad);
  
  // Update display
  document.getElementById('unitCircleX').textContent = x.toFixed(4);
  document.getElementById('unitCircleY').textContent = y.toFixed(4);
  document.getElementById('unitCircleSin').textContent = y.toFixed(4);
  document.getElementById('unitCircleCos').textContent = x.toFixed(4);
  document.getElementById('unitCircleTan').textContent = 
    Math.abs(tan) > 10000 ? "∞" : tan.toFixed(4);
  document.getElementById('unitCircleRadians').textContent = angleRad.toFixed(4);
  
  // Draw unit circle
  drawUnitCircle(angleDeg);
}

// Initialize Unit Circle
calculateUnitCircle();

// Permutation & Combination Calculator (e-17)
function factorial(n) {
  if (n < 0) return NaN;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function calculatePermutation() {
  const n = parseInt(document.getElementById('permutationN').value);
  const r = parseInt(document.getElementById('permutationR').value);
  const type = document.getElementById('permutationType').value;
  
  if (r > n) {
    alert("r cannot be greater than n");
    return;
  }
  
  let result;
  if (type === 'permutation') {
    result = factorial(n) / factorial(n - r);
    document.getElementById('permutationNotation').textContent = `nPr = n!/(n-r)! = ${n}!/(${n}-${r})!`;
  } else {
    result = factorial(n) / (factorial(r) * factorial(n - r));
    document.getElementById('permutationNotation').textContent = `nCr = n!/(r!(n-r)!) = ${n}!/(${r}!×${n-r}!)`;
  }
  
  document.getElementById('permutationOutput').textContent = result;
}

// Probability Calculator (e-18)
function calculateProbability() {
  const probA = parseFloat(document.getElementById('probA').value);
  const probB = parseFloat(document.getElementById('probB').value);
  const type = document.getElementById('probabilityType').value;
  
  if (probA < 0 || probA > 1 || probB < 0 || probB > 1) {
    alert("Probabilities must be between 0 and 1");
    return;
  }
  
  let result;
  switch(type) {
    case 'and':
      result = probA * probB;
      break;
    case 'or':
      result = probA + probB - probA * probB;
      break;
    case 'not':
      result = 1 - probA;
      break;
    case 'conditional':
      result = probA; // Simplified version (assumes independence)
      break;
  }
  
  document.getElementById('probabilityOutput').textContent = result.toFixed(4);
  document.getElementById('probabilityPercent').textContent = (result * 100).toFixed(2);
  
  // Calculate odds
  const oddsFor = result;
  const oddsAgainst = 1 - result;
  const simplified = simplifyFraction(oddsFor * 100, oddsAgainst * 100);
  document.getElementById('probabilityOdds').textContent = 
    `${simplified.num}:${simplified.den}`;
}













// Matrix Calculator (e-9)
function createMatrixGrid(rows, cols, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  
  for (let i = 0; i < rows * cols; i++) {
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'matrix-cell';
    input.value = i % (cols + 1) === 0 ? '1' : '0';
    container.appendChild(input);
  }
  
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
}

function getMatrixValues(rows, cols, containerId) {
  const container = document.getElementById(containerId);
  const cells = container.querySelectorAll('.matrix-cell');
  const matrix = [];
  
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const index = i * cols + j;
      row.push(parseFloat(cells[index].value) || 0);
    }
    matrix.push(row);
  }
  
  return matrix;
}

function displayResultMatrix(matrix, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  
  if (!matrix || matrix.length === 0) return;
  
  const rows = matrix.length;
  const cols = matrix[0].length;
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  
  matrix.forEach(row => {
    row.forEach(value => {
      const div = document.createElement('div');
      div.className = 'matrix-cell';
      div.textContent = Number.isInteger(value) ? value : value.toFixed(4);
      container.appendChild(div);
    });
  });
}

function matrixAddition(a, b) {
  if (a.length !== b.length || a[0].length !== b[0].length) {
    alert("Matrices must have the same dimensions for addition");
    return null;
  }
  
  const result = [];
  for (let i = 0; i < a.length; i++) {
    const row = [];
    for (let j = 0; j < a[0].length; j++) {
      row.push(a[i][j] + b[i][j]);
    }
    result.push(row);
  }
  return result;
}

function matrixMultiplication(a, b) {
  if (a[0].length !== b.length) {
    alert("Number of columns in Matrix A must match rows in Matrix B");
    return null;
  }
  
  const result = [];
  for (let i = 0; i < a.length; i++) {
    const row = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }
  return result;
}

function matrixDeterminant(matrix) {
  if (matrix.length !== matrix[0].length) {
    alert("Matrix must be square to calculate determinant");
    return null;
  }
  
  if (matrix.length === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  
  let det = 0;
  for (let i = 0; i < matrix.length; i++) {
    const minor = [];
    for (let j = 1; j < matrix.length; j++) {
      const row = [];
      for (let k = 0; k < matrix.length; k++) {
        if (k !== i) row.push(matrix[j][k]);
      }
      minor.push(row);
    }
    det += matrix[0][i] * Math.pow(-1, i) * matrixDeterminant(minor);
  }
  return det;
}

function matrixTranspose(matrix) {
  const result = [];
  for (let i = 0; i < matrix[0].length; i++) {
    const row = [];
    for (let j = 0; j < matrix.length; j++) {
      row.push(matrix[j][i]);
    }
    result.push(row);
  }
  return result;
}

function calculateMatrix() {
  const operation = document.getElementById('matrixOperation').value;
  const aRows = parseInt(document.getElementById('matrixARows').value);
  const aCols = parseInt(document.getElementById('matrixACols').value);
  const matrixA = getMatrixValues(aRows, aCols, 'matrixAGrid');
  
  let result;
  
  if (operation === 'determinant' || operation === 'transpose') {
    if (operation === 'determinant') {
      result = [[matrixDeterminant(matrixA)]];
    } else {
      result = matrixTranspose(matrixA);
    }
  } else {
    const bRows = parseInt(document.getElementById('matrixBRows').value);
    const bCols = parseInt(document.getElementById('matrixBCols').value);
    const matrixB = getMatrixValues(bRows, bCols, 'matrixBGrid');
    
    if (operation === 'add') {
      result = matrixAddition(matrixA, matrixB);
    } else if (operation === 'multiply') {
      result = matrixMultiplication(matrixA, matrixB);
    }
  }
  
  if (result) {
    displayResultMatrix(result, 'resultGrid');
  }
}

// Initialize matrix dimensions
document.getElementById('matrixARows').addEventListener('change', function() {
  createMatrixGrid(this.value, document.getElementById('matrixACols').value, 'matrixAGrid');
});
document.getElementById('matrixACols').addEventListener('change', function() {
  createMatrixGrid(document.getElementById('matrixARows').value, this.value, 'matrixAGrid');
});
document.getElementById('matrixBRows').addEventListener('change', function() {
  createMatrixGrid(this.value, document.getElementById('matrixBCols').value, 'matrixBGrid');
});
document.getElementById('matrixBCols').addEventListener('change', function() {
  createMatrixGrid(document.getElementById('matrixBRows').value, this.value, 'matrixBGrid');
});

// Show/hide matrix B based on operation
document.getElementById('matrixOperation').addEventListener('change', function() {
  const showB = this.value === 'add' || this.value === 'multiply';
  document.getElementById('matrixBContainer').style.display = showB ? 'block' : 'none';
});

// Create initial matrices
createMatrixGrid(2, 2, 'matrixAGrid');
createMatrixGrid(2, 2, 'matrixBGrid');

// Trigonometry Calculator (e-10)
function calculateTrig() {
  const func = document.getElementById('trigFunction').value;
  const value = parseFloat(document.getElementById('trigValue').value);
  const unit = document.getElementById('trigUnit').value;
  
  let angle = value;
  if (unit === 'deg') {
    angle = value * Math.PI / 180;
  }
  
  let result;
  switch(func) {
    case 'sin': result = Math.sin(angle); break;
    case 'cos': result = Math.cos(angle); break;
    case 'tan': result = Math.tan(angle); break;
    case 'asin': 
      result = Math.asin(value);
      if (unit === 'deg') result *= 180 / Math.PI;
      break;
    case 'acos': 
      result = Math.acos(value);
      if (unit === 'deg') result *= 180 / Math.PI;
      break;
    case 'atan': 
      result = Math.atan(value);
      if (unit === 'deg') result *= 180 / Math.PI;
      break;
  }
  
  document.getElementById('trigOutput').textContent = 
    result.toFixed(8).replace(/\.?0+$/, '');
}

// Initialize Trig Calculator
document.querySelector('.trig-calculator button').addEventListener('click', calculateTrig);

// Logarithm Calculator (e-11)
function calculateLog() {
  const type = document.getElementById('logType').value;
  const number = parseFloat(document.getElementById('logNumber').value);
  
  let result;
  if (type === 'log') {
    const base = parseFloat(document.getElementById('logBase').value);
    result = Math.log(number) / Math.log(base);
  } else if (type === 'ln') {
    result = Math.log(number);
  } else if (type === 'log10') {
    result = Math.log10(number);
  }
  
  document.getElementById('logOutput').textContent = result.toFixed(8);
}

// Show/hide base input based on log type
document.getElementById('logType').addEventListener('change', function() {
  document.getElementById('logBaseContainer').style.display = 
    this.value === 'log' ? 'block' : 'none';
});

// Initialize Log Calculator
document.querySelector('.log-calculator button').addEventListener('click', calculateLog);

// Exponent Calculator (e-12)
function calculateExponent() {
  const operation = document.getElementById('exponentOperation').value;
  const base = parseFloat(document.getElementById('exponentBase').value);
  const power = parseFloat(document.getElementById('exponentPower').value);
  
  let result;
  if (operation === 'power') {
    result = Math.pow(base, power);
  } else if (operation === 'root') {
    result = Math.pow(base, 1/power);
  } else if (operation === 'exp') {
    result = Math.exp(power);
  }
  
  document.getElementById('exponentOutput').textContent = result.toFixed(8);
}

// Initialize Exponent Calculator
document.querySelector('.exponent-calculator button').addEventListener('click', calculateExponent);

// Root Calculator (e-13)
function calculateRoot() {
  const number = parseFloat(document.getElementById('rootNumber').value);
  const degree = parseFloat(document.getElementById('rootDegree').value);
  
  const result = Math.pow(number, 1/degree);
  const fractional = `${degree}√${number}`;
  
  document.getElementById('rootOutput').textContent = result.toFixed(8);
  document.getElementById('rootFractional').textContent = fractional;
}

// Initialize Root Calculator
document.querySelector('.root-calculator button').addEventListener('click', calculateRoot);













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














// Roman Numeral Converter (k-1)
function romanConversion() {
  const input = document.getElementById('romanInput').value.trim();
  const conversionType = document.getElementById('romanConversionType').value;
  const resultField = document.getElementById('romanResult');
  
  if (conversionType === 'toRoman') {
    // Convert decimal to Roman
    const num = parseInt(input);
    if (isNaN(num) || num < 1 || num > 3999) {
      resultField.value = 'Please enter a number between 1-3999';
      return;
    }
    resultField.value = decimalToRoman(num);
  } else {
    // Convert Roman to decimal
    if (!/^[IVXLCDM]+$/i.test(input)) {
      resultField.value = 'Invalid Roman numeral';
      return;
    }
    resultField.value = romanToDecimal(input.toUpperCase());
  }
}

function decimalToRoman(num) {
  const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
  ];
  
  let roman = '';
  for (const { value, symbol } of romanNumerals) {
    while (num >= value) {
      roman += symbol;
      num -= value;
    }
  }
  return roman;
}

function romanToDecimal(roman) {
  const romanMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  
  for (let i = 0; i < roman.length; i++) {
    const current = romanMap[roman[i]];
    const next = romanMap[roman[i + 1]];
    
    if (next && current < next) {
      total += next - current;
      i++;
    } else {
      total += current;
    }
  }
  return total;
}

// Fraction to Decimal Converter (k-2)
function fractionConversion() {
  const input = document.getElementById('fractionInput').value.trim();
  const conversionType = document.getElementById('fractionConversionType').value;
  const resultField = document.getElementById('fractionResult');
  
  if (conversionType === 'toDecimal') {
    // Fraction to decimal
    const fractionParts = input.split('/');
    if (fractionParts.length !== 2 || isNaN(fractionParts[0]) || isNaN(fractionParts[1])) {
      resultField.value = 'Invalid fraction (use format like 3/4)';
      return;
    }
    const numerator = parseFloat(fractionParts[0]);
    const denominator = parseFloat(fractionParts[1]);
    if (denominator === 0) {
      resultField.value = 'Cannot divide by zero';
      return;
    }
    resultField.value = (numerator / denominator).toFixed(4);
  } else {
    // Decimal to fraction
    const decimal = parseFloat(input);
    if (isNaN(decimal)) {
      resultField.value = 'Invalid decimal number';
      return;
    }
    resultField.value = decimalToFraction(decimal);
  }
}

function decimalToFraction(decimal) {
  const tolerance = 1.0E-6;
  let numerator = 1;
  let denominator = 1;
  let error = decimal - numerator / denominator;
  
  while (Math.abs(error) > tolerance) {
    if (error > 0) {
      numerator++;
    } else {
      denominator++;
      numerator = Math.floor(decimal * denominator);
    }
    error = decimal - numerator / denominator;
  }
  
  // Simplify fraction
  const gcd = greatestCommonDivisor(numerator, denominator);
  return `${numerator / gcd}/${denominator / gcd}`;
}

function greatestCommonDivisor(a, b) {
  return b ? greatestCommonDivisor(b, a % b) : a;
}

// Time Zone Converter (k-3)
function timezoneConversion() {
  const inputDateTime = document.getElementById('timezoneInput').value;
  const fromTz = document.getElementById('fromTimezone').value;
  const toTz = document.getElementById('toTimezone').value;
  const resultField = document.getElementById('timezoneResult');
  
  if (!inputDateTime) {
    resultField.value = 'Please select a date and time';
    return;
  }
  
  // Client-side timezone conversion (simplified)
  const date = new Date(inputDateTime);
  let result;
  
  // Note: This is a simplified client-side conversion
  // For accurate timezone conversion, you would normally need a library
  if (fromTz === toTz) {
    result = date.toLocaleString();
  } else {
    // Apply mock timezone offsets
    const offsets = {
      'UTC': 0,
      'EST': -5,
      'PST': -8,
      'CET': 1,
      'IST': 5.5
    };
    const offsetDiff = offsets[toTz] - offsets[fromTz];
    date.setHours(date.getHours() + offsetDiff);
    result = date.toLocaleString();
  }
  
  resultField.value = `${result} (${toTz})`;
}

// Cooking Measurement Converter (k-4)
function cookingConversion() {
  const amount = parseFloat(document.getElementById('cookingAmount').value);
  const fromUnit = document.getElementById('fromCookingUnit').value;
  const toUnit = document.getElementById('toCookingUnit').value;
  const resultField = document.getElementById('cookingResult');
  
  if (isNaN(amount)) {
    resultField.value = 'Please enter a valid amount';
    return;
  }
  
  // Conversion factors to milliliters (base unit)
  const unitFactors = {
    'cup': 240,
    'tbsp': 15,
    'tsp': 5,
    'ml': 1,
    'floz': 29.5735
  };
  
  // Convert to base unit (ml) first
  const mlAmount = amount * unitFactors[fromUnit];
  // Convert to target unit
  const result = mlAmount / unitFactors[toUnit];
  
  resultField.value = `${result.toFixed(2)} ${toUnit}`;
}

// Shoe Size Converter (k-5)
function shoeSizeConversion() {
  const size = parseFloat(document.getElementById('shoeSizeInput').value);
  const fromSystem = document.getElementById('fromShoeSystem').value;
  const toSystem = document.getElementById('toShoeSystem').value;
  const resultField = document.getElementById('shoeSizeResult');
  
  if (isNaN(size)) {
    resultField.value = 'Please enter a valid size';
    return;
  }
  
  // Conversion formulas (approximate)
  let result;
  if (fromSystem === toSystem) {
    result = size;
  } else if (fromSystem === 'US' && toSystem === 'UK') {
    result = size - 0.5;
  } else if (fromSystem === 'US' && toSystem === 'EU') {
    result = size + 33;
  } else if (fromSystem === 'US' && toSystem === 'JP') {
    result = (size * 25.4) + 22;
  } else if (fromSystem === 'UK' && toSystem === 'US') {
    result = size + 0.5;
  } else if (fromSystem === 'UK' && toSystem === 'EU') {
    result = size + 33.5;
  } else if (fromSystem === 'UK' && toSystem === 'JP') {
    result = ((size + 0.5) * 25.4) + 22;
  } else if (fromSystem === 'EU' && toSystem === 'US') {
    result = size - 33;
  } else if (fromSystem === 'EU' && toSystem === 'UK') {
    result = size - 33.5;
  } else if (fromSystem === 'EU' && toSystem === 'JP') {
    result = ((size - 33 + 0.5) * 25.4) + 22;
  } else if (fromSystem === 'JP' && toSystem === 'US') {
    result = (size - 22) / 25.4;
  } else if (fromSystem === 'JP' && toSystem === 'UK') {
    result = ((size - 22) / 25.4) - 0.5;
  } else if (fromSystem === 'JP' && toSystem === 'EU') {
    result = ((size - 22) / 25.4) + 33 - 0.5;
  }
  
  resultField.value = result.toFixed(1);
}























// Pace Calculator (l-6)
function calculatePace() {
  const distance = parseFloat(document.getElementById('paceDistance').value);
  const unit = document.getElementById('paceDistanceUnit').value;
  const timeStr = document.getElementById('paceTime').value;
  const resultField = document.getElementById('paceResult');
  
  if (isNaN(distance) || distance <= 0 || !timeStr) {
    resultField.value = 'Please enter valid values';
    return;
  }
  
  // Parse time (hh:mm:ss)
  const timeParts = timeStr.split(':').map(part => parseInt(part));
  const totalSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + (timeParts[2] || 0);
  
  if (totalSeconds <= 0) {
    resultField.value = 'Please enter valid time';
    return;
  }
  
  const paceSeconds = totalSeconds / distance;
  const paceMinutes = Math.floor(paceSeconds / 60);
  const paceRemainder = Math.round(paceSeconds % 60);
  
  resultField.value = `${paceMinutes}:${paceRemainder.toString().padStart(2, '0')} per ${unit === 'km' ? 'km' : 'mile'}`;
}

// Pregnancy Due Date Calculator (l-7)
function calculateDueDate() {
  const periodDate = new Date(document.getElementById('pregnancyDate').value);
  const cycleLength = parseInt(document.getElementById('cycleLength').value);
  const resultField = document.getElementById('dueDateResult');
  
  if (isNaN(periodDate.getTime()) || isNaN(cycleLength)) {
    resultField.value = 'Please enter valid date and cycle length';
    return;
  }
  
  // Naegele's rule: Due date = LMP + 1 year - 3 months + 7 days
  const dueDate = new Date(periodDate);
  dueDate.setDate(dueDate.getDate() + 280); // 40 weeks
  
  // Adjust for cycle length (standard is 28 days)
  if (cycleLength !== 28) {
    const adjustment = cycleLength - 28;
    dueDate.setDate(dueDate.getDate() + adjustment);
  }
  
  resultField.value = `Estimated due date: ${dueDate.toDateString()}`;
}

// Blood Alcohol Content Calculator (l-8)
function calculateBAC() {
  const gender = document.getElementById('bacGender').value;
  const weight = parseFloat(document.getElementById('bacWeight').value);
  const drinks = parseFloat(document.getElementById('bacDrinks').value);
  const hours = parseFloat(document.getElementById('bacHours').value);
  const resultField = document.getElementById('bacResult');
  
  if (isNaN(weight) || isNaN(drinks) || isNaN(hours)) {
    resultField.value = 'Please enter valid values';
    return;
  }
  
  // Widmark formula
  const r = gender === 'male' ? 0.68 : 0.55;
  const bac = ((drinks * 14) / (weight * r)) - (0.015 * hours);
  
  if (bac < 0) {
    resultField.value = 'BAC: 0% (sober)';
  } else {
    resultField.value = `BAC: ${bac.toFixed(3)}% (${getBACDescription(bac)})`;
  }
}

function getBACDescription(bac) {
  if (bac < 0.03) return 'Normal behavior';
  if (bac < 0.06) return 'Mild impairment';
  if (bac < 0.10) return 'Significant impairment';
  if (bac < 0.20) return 'Severe impairment';
  if (bac < 0.30) return 'Life-threatening';
  return 'Potentially fatal';
}

// Wind Chill Calculator (l-9)
function calculateWindChill() {
  const temp = parseFloat(document.getElementById('windChillTemp').value);
  const wind = parseFloat(document.getElementById('windSpeed').value);
  const resultField = document.getElementById('windChillResult');
  
  if (isNaN(temp) || isNaN(wind)) {
    resultField.value = 'Please enter valid values';
    return;
  }
  
  // Only valid for temps ≤ 50°F and wind ≥ 3mph
  if (temp > 50 || wind < 3) {
    resultField.value = 'Not applicable (temp >50°F or wind <3mph)';
    return;
  }
  
  // US formula: 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16)
  const windChill = 35.74 + (0.6215 * temp) - (35.75 * Math.pow(wind, 0.16)) + (0.4275 * temp * Math.pow(wind, 0.16));
  
  resultField.value = `Feels like: ${Math.round(windChill)}°F`;
}

// Sunrise/Sunset Calculator (l-10)
function calculateSunTimes() {
  const dateStr = document.getElementById('sunDate').value;
  const lat = parseFloat(document.getElementById('sunLat').value);
  const lng = parseFloat(document.getElementById('sunLng').value);
  const sunriseField = document.getElementById('sunriseResult');
  const sunsetField = document.getElementById('sunsetResult');
  
  if (!dateStr || isNaN(lat) || isNaN(lng)) {
    sunriseField.value = 'Please enter valid values';
    sunsetField.value = '';
    return;
  }
  
  // Simple approximation (for exact times you'd need a proper algorithm)
  const date = new Date(dateStr);
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const approxSunrise = 6 + Math.sin(dayOfYear / 58) * 2;
  const approxSunset = 18 + Math.sin(dayOfYear / 58) * 2;
  
  // Adjust slightly for latitude
  const latAdjust = lat / 90;
  const sunriseHour = Math.max(4, approxSunrise - latAdjust).toFixed(2);
  const sunsetHour = Math.min(20, approxSunset + latAdjust).toFixed(2);
  
  sunriseField.value = formatTime(sunriseHour);
  sunsetField.value = formatTime(sunsetHour);
}

function formatTime(decimalHours) {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}


// Percentage Increase Calculator (l-1)
function calculatePercentageIncrease() {
  const original = parseFloat(document.getElementById('originalValue').value);
  const newVal = parseFloat(document.getElementById('newValue').value);
  const resultField = document.getElementById('percentageIncreaseResult');
  
  if (isNaN(original) || isNaN(newVal)) {
    resultField.value = 'Please enter valid numbers';
    return;
  }
  
  if (original === 0) {
    resultField.value = 'Original value cannot be zero';
    return;
  }
  
  const increase = ((newVal - original) / original) * 100;
  resultField.value = `${increase.toFixed(2)}% increase`;
}

// VAT Calculator (l-2)
function calculateVAT() {
  const rate = parseFloat(document.getElementById('vatRate').value);
  const amount = parseFloat(document.getElementById('vatAmount').value);
  const type = document.getElementById('vatCalculationType').value;
  const resultField = document.getElementById('vatResult');
  
  if (isNaN(rate) || isNaN(amount)) {
    resultField.value = 'Please enter valid numbers';
    return;
  }
  
  let result;
  if (type === 'add') {
    // Add VAT to net amount
    result = amount * (1 + (rate / 100));
    resultField.value = `Gross amount: ${result.toFixed(2)} (VAT: ${(result - amount).toFixed(2)})`;
  } else {
    // Remove VAT from gross amount
    result = amount / (1 + (rate / 100));
    resultField.value = `Net amount: ${result.toFixed(2)} (VAT: ${(amount - result).toFixed(2)})`;
  }
}

// GPA Calculator (l-3)
let courseCount = 1;

function addGpaCourse() {
  courseCount++;
  const coursesDiv = document.getElementById('gpaCourses');
  const newCourse = document.createElement('div');
  newCourse.className = 'gpa-course';
  newCourse.innerHTML = `
    <span>Course ${courseCount}</span>
    <input class="tool-input" type="text" placeholder="Course name">
    <span>Grade</span>
    <select class="tool-select">
      <option value="4">A (4.0)</option>
      <option value="3.7">A- (3.7)</option>
      <option value="3.3">B+ (3.3)</option>
      <option value="3">B (3.0)</option>
      <option value="2.7">B- (2.7)</option>
      <option value="2.3">C+ (2.3)</option>
      <option value="2">C (2.0)</option>
      <option value="1.7">C- (1.7)</option>
      <option value="1.3">D+ (1.3)</option>
      <option value="1">D (1.0)</option>
      <option value="0">F (0.0)</option>
    </select>
    <span>Credits</span>
    <input class="tool-input" type="number" value="3" min="1">
  `;
  coursesDiv.appendChild(newCourse);
}

function calculateGPA() {
  const courses = document.querySelectorAll('.gpa-course');
  let totalPoints = 0;
  let totalCredits = 0;
  
  courses.forEach(course => {
    const grade = parseFloat(course.querySelector('.tool-select').value);
    const credits = parseFloat(course.querySelector('.tool-input[type="number"]').value);
    
    totalPoints += grade * credits;
    totalCredits += credits;
  });
  
  const gpa = totalPoints / totalCredits;
  document.getElementById('gpaResult').value = `GPA: ${gpa.toFixed(2)}`;
}

// Body Fat Calculator (l-4)
function calculateBodyFat() {
  const gender = document.getElementById('bodyFatGender').value;
  const height = parseFloat(document.getElementById('bodyFatHeight').value);
  const neck = parseFloat(document.getElementById('bodyFatNeck').value);
  const waist = parseFloat(document.getElementById('bodyFatWaist').value);
  const hip = parseFloat(document.getElementById('bodyFatHip').value);
  const resultField = document.getElementById('bodyFatResult');
  
  if (isNaN(height) || isNaN(neck) || isNaN(waist) || (gender === 'female' && isNaN(hip))) {
    resultField.value = 'Please enter all measurements';
    return;
  }
  
  let bodyFat;
  if (gender === 'male') {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }
  
  resultField.value = `Body Fat: ${bodyFat.toFixed(1)}%`;
}

// Calorie Calculator (l-5)
function calculateCalories() {
  const gender = document.getElementById('calorieGender').value;
  const age = parseFloat(document.getElementById('calorieAge').value);
  const height = parseFloat(document.getElementById('calorieHeight').value);
  const weight = parseFloat(document.getElementById('calorieWeight').value);
  const activity = parseFloat(document.getElementById('calorieActivity').value);
  const resultField = document.getElementById('calorieResult');
  
  if (isNaN(age) || isNaN(height) || isNaN(weight)) {
    resultField.value = 'Please enter valid measurements';
    return;
  }
  
  let bmr;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
  
  const calories = bmr * activity;
  resultField.value = `${Math.round(calories)} calories/day`;
}












// Gratuity Calculator (m-1)
function calculateGratuity() {
  const salary = parseFloat(document.getElementById('gratuitySalary').value);
  const years = parseFloat(document.getElementById('gratuityYears').value);
  const resultField = document.getElementById('gratuityResult');
  
  if (isNaN(salary) || isNaN(years)) {
    resultField.value = 'Please enter valid numbers';
    return;
  }
  
  // Standard gratuity calculation: 21 days salary per year of service
  const gratuity = (salary / 30) * 21 * years;
  resultField.value = gratuity.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
}

// Compound Interest Calculator (m-2)
function calculateCompoundInterest() {
  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('interestRate').value);
  const time = parseFloat(document.getElementById('timePeriod').value);
  const compounding = parseInt(document.getElementById('compounding').value);
  const resultField = document.getElementById('compoundResult');
  
  if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
    resultField.value = 'Please enter valid numbers';
    return;
  }
  
  // Compound interest formula: A = P(1 + r/n)^(nt)
  const amount = principal * Math.pow(1 + (rate / 100) / compounding, compounding * time);
  
  resultField.value = amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

// Currency Exchange Calculator (m-3)
function calculateCurrencyExchange() {
  const amount = parseFloat(document.getElementById('exchangeAmount').value);
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const resultField = document.getElementById('exchangeResult');
  
  if (isNaN(amount)) {
    resultField.value = 'Please enter valid amount';
    return;
  }
  
  // Static exchange rates (for demonstration)
  const exchangeRates = {
    USD: { USD: 1, EUR: 0.85, GBP: 0.73, JPY: 110.5, INR: 74.5 },
    EUR: { USD: 1.18, EUR: 1, GBP: 0.86, JPY: 130.2, INR: 87.8 },
    GBP: { USD: 1.37, EUR: 1.16, GBP: 1, JPY: 151.3, INR: 102.1 },
    JPY: { USD: 0.009, EUR: 0.0077, GBP: 0.0066, JPY: 1, INR: 0.67 },
    INR: { USD: 0.013, EUR: 0.011, GBP: 0.0098, JPY: 1.49, INR: 1 }
  };
  
  if (fromCurrency === toCurrency) {
    resultField.value = amount.toLocaleString('en-US', {
      style: 'currency',
      currency: toCurrency
    });
    return;
  }
  
  const convertedAmount = amount * exchangeRates[fromCurrency][toCurrency];
  resultField.value = convertedAmount.toLocaleString('en-US', {
    style: 'currency',
    currency: toCurrency
  });
}

// Tip Calculator (m-4)
function calculateTip() {
  const bill = parseFloat(document.getElementById('billAmount').value);
  const tipSelect = document.getElementById('tipPercentage');
  const customTip = document.getElementById('customTip');
  const split = parseInt(document.getElementById('splitCount').value);
  const resultTip = document.getElementById('tipAmount');
  const resultTotal = document.getElementById('totalBill');
  const resultSplit = document.getElementById('splitAmount');
  
  if (isNaN(bill)) {
    resultTip.value = resultTotal.value = resultSplit.value = 'Invalid bill amount';
    return;
  }
  
  let tipPercent;
  if (tipSelect.value === 'custom') {
    tipPercent = parseFloat(customTip.value);
    if (isNaN(tipPercent)) {
      resultTip.value = resultTotal.value = resultSplit.value = 'Invalid tip percentage';
      return;
    }
  } else {
    tipPercent = parseFloat(tipSelect.value);
  }
  
  const tipAmount = bill * (tipPercent / 100);
  const totalBill = bill + tipAmount;
  const perPerson = totalBill / split;
  
  resultTip.value = tipAmount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  resultTotal.value = totalBill.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  resultSplit.value = perPerson.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

// Show/hide custom tip field
document.getElementById('tipPercentage').addEventListener('change', function() {
  document.getElementById('customTip').style.display = 
    this.value === 'custom' ? 'block' : 'none';
});

// Retirement Planner (m-5)
function calculateRetirement() {
  const currentAge = parseInt(document.getElementById('currentAge').value);
  const retirementAge = parseInt(document.getElementById('retirementAge').value);
  const currentSavings = parseFloat(document.getElementById('currentSavings').value);
  const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
  const returnRate = parseFloat(document.getElementById('returnRate').value);
  const resultField = document.getElementById('retirementResult');
  
  if (isNaN(currentAge) || isNaN(retirementAge) || isNaN(currentSavings) || 
      isNaN(monthlyContribution) || isNaN(returnRate)) {
    resultField.value = 'Please enter valid numbers';
    return;
  }
  
  if (currentAge >= retirementAge) {
    resultField.value = 'Retirement age must be after current age';
    return;
  }
  
  const years = retirementAge - currentAge;
  const monthlyRate = returnRate / 100 / 12;
  const months = years * 12;
  
  // Future value of current savings
  const futureValueCurrent = currentSavings * Math.pow(1 + monthlyRate, months);
  
  // Future value of contributions: FV = PMT * [(1 + r)^n - 1] / r
  const futureValueContributions = monthlyContribution * 
    (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
  
  const total = futureValueCurrent + futureValueContributions;
  
  resultField.value = total.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
}

















// Mortgage Calculator (m-6)
function calculateMortgage() {
  const homeValue = parseFloat(document.getElementById('homeValue').value);
  const downPayment = parseFloat(document.getElementById('downPayment').value);
  const loanTerm = parseInt(document.getElementById('loanTerm').value);
  const interestRate = parseFloat(document.getElementById('interestRateMortgage').value);
  
  if (isNaN(homeValue) || isNaN(downPayment) || isNaN(loanTerm) || isNaN(interestRate)) {
    document.getElementById('monthlyPayment').value = 'Please enter valid numbers';
    return;
  }
  
  const loanAmount = homeValue - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const payments = loanTerm * 12;
  
  // Mortgage formula: M = P[r(1+r)^n]/[(1+r)^n-1]
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
    (Math.pow(1 + monthlyRate, payments) - 1);
  
  const totalInterest = (monthlyPayment * payments) - loanAmount;
  
  document.getElementById('monthlyPayment').value = monthlyPayment.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  
  document.getElementById('totalInterest').value = totalInterest.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

// Car Loan Calculator (m-7)
function calculateCarLoan() {
  const carPrice = parseFloat(document.getElementById('carPrice').value);
  const downPayment = parseFloat(document.getElementById('carDownPayment').value);
  const loanTerm = parseInt(document.getElementById('carLoanTerm').value);
  const interestRate = parseFloat(document.getElementById('carInterestRate').value);
  
  if (isNaN(carPrice) || isNaN(downPayment) || isNaN(loanTerm) || isNaN(interestRate)) {
    document.getElementById('carMonthlyPayment').value = 'Please enter valid numbers';
    return;
  }
  
  const loanAmount = carPrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  
  // Auto loan formula same as mortgage
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
    (Math.pow(1 + monthlyRate, loanTerm) - 1);
  
  const totalCost = monthlyPayment * loanTerm;
  
  document.getElementById('carMonthlyPayment').value = monthlyPayment.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  
  document.getElementById('totalLoanCost').value = totalCost.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

// Investment Return Calculator (m-8)
function calculateInvestment() {
  const initial = parseFloat(document.getElementById('initialInvestment').value);
  const monthly = parseFloat(document.getElementById('investmentMonthly').value);
  const years = parseInt(document.getElementById('investmentYears').value);
  const returnRate = parseFloat(document.getElementById('expectedReturn').value);
  
  if (isNaN(initial) || isNaN(monthly) || isNaN(years) || isNaN(returnRate)) {
    document.getElementById('investmentResult').value = 'Please enter valid numbers';
    return;
  }
  
  const monthlyRate = returnRate / 100 / 12;
  const months = years * 12;
  
  // Future value of initial investment
  const futureValueInitial = initial * Math.pow(1 + monthlyRate, months);
  
  // Future value of monthly contributions: FV = PMT * [(1 + r)^n - 1] / r
  const futureValueMonthly = monthly * 
    (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
  
  const totalValue = futureValueInitial + futureValueMonthly;
  const totalContributed = initial + (monthly * months);
  
  document.getElementById('investmentResult').value = totalValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  
  document.getElementById('totalContributions').value = totalContributed.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

// Debt Payoff Calculator (m-9)
function calculateDebtPayoff() {
  const debt = parseFloat(document.getElementById('totalDebt').value);
  const interestRate = parseFloat(document.getElementById('debtInterestRate').value);
  const monthlyPayment = parseFloat(document.getElementById('monthlyDebtPayment').value);
  
  if (isNaN(debt) || isNaN(interestRate) || isNaN(monthlyPayment)) {
    document.getElementById('payoffTime').value = 'Please enter valid numbers';
    return;
  }
  
  if (monthlyPayment <= 0) {
    document.getElementById('payoffTime').value = 'Payment must be positive';
    return;
  }
  
  const monthlyRate = interestRate / 100 / 12;
  let balance = debt;
  let months = 0;
  let totalInterest = 0;
  
  // Calculate month by month until debt is paid off
  while (balance > 0 && months < 1200) { // Cap at 100 years to prevent infinite loops
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    
    balance -= principal;
    totalInterest += interest;
    months++;
    
    if (balance < 0) {
      totalInterest -= Math.abs(balance) * monthlyRate;
      break;
    }
  }
  
  if (months >= 1200) {
    document.getElementById('payoffTime').value = 'Payment too low - will never be paid off';
    document.getElementById('totalDebtInterest').value = '';
  } else {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    document.getElementById('payoffTime').value = 
      `${years} years ${remainingMonths} months (${months} total months)`;
    document.getElementById('totalDebtInterest').value = totalInterest.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }
}

// Savings Goal Calculator (m-10)
function calculateSavingsGoal() {
  const goal = parseFloat(document.getElementById('savingsGoal').value);
  const initial = parseFloat(document.getElementById('initialSavings').value);
  const years = parseInt(document.getElementById('savingsYears').value);
  const interestRate = parseFloat(document.getElementById('savingsInterestRate').value);
  
  if (isNaN(goal) || isNaN(initial) || isNaN(years) || isNaN(interestRate)) {
    document.getElementById('monthlyDeposit').value = 'Please enter valid numbers';
    return;
  }
  
  const monthlyRate = interestRate / 100 / 12;
  const months = years * 12;
  const futureValueInitial = initial * Math.pow(1 + monthlyRate, months);
  
  if (futureValueInitial >= goal) {
    document.getElementById('monthlyDeposit').value = '$0 (already have enough)';
    document.getElementById('savingsInterest').value = (futureValueInitial - initial).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    return;
  }
  
  // Calculate required monthly deposit: PMT = (FV - PV*(1+r)^n) / [((1+r)^n - 1)/r]
  const requiredMonthly = (goal - futureValueInitial) / 
    ((Math.pow(1 + monthlyRate, months) - 1) * monthlyRate);
  
  const totalDeposited = requiredMonthly * months;
  const totalInterest = goal - (initial + totalDeposited);
  
  document.getElementById('monthlyDeposit').value = requiredMonthly.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  
  document.getElementById('savingsInterest').value = totalInterest.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}
 










// Pixel Art Generator (n-6)
function createPixelGrid() {
  const gridSize = parseInt(document.getElementById('pixelGridSize').value);
  const grid = document.getElementById('pixelGrid');
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  
  for (let i = 0; i < gridSize * gridSize; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.addEventListener('click', function() {
      this.style.backgroundColor = document.getElementById('pixelColor').value;
    });
    pixel.addEventListener('mousedown', startDrawing);
    pixel.addEventListener('mouseenter', drawPixel);
    grid.appendChild(pixel);
  }
}

let isDrawing = false;
function startDrawing(e) {
  isDrawing = true;
  drawPixel(e);
}

function drawPixel(e) {
  if (!isDrawing) return;
  e.target.style.backgroundColor = document.getElementById('pixelColor').value;
}

document.addEventListener('mouseup', () => isDrawing = false);

function clearPixelArt() {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach(pixel => {
    pixel.style.backgroundColor = 'transparent';
  });
}

function downloadPixelArt() {
  const gridSize = parseInt(document.getElementById('pixelGridSize').value);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const pixelSize = 10; // Size of each pixel in the downloaded image
  
  canvas.width = gridSize * pixelSize;
  canvas.height = gridSize * pixelSize;
  
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel, index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    ctx.fillStyle = pixel.style.backgroundColor || 'transparent';
    ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
  });
  
  const link = document.createElement('a');
  link.download = 'pixel-art.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Initialize pixel grid
document.getElementById('pixelGridSize').addEventListener('change', createPixelGrid);
createPixelGrid();

// Color Contrast Checker (n-7)
function checkContrast() {
  const fgColor = document.getElementById('foregroundColor').value;
  const bgColor = document.getElementById('backgroundColor').value;
  
  // Update hex values
  document.getElementById('foregroundHex').value = fgColor;
  document.getElementById('backgroundHex').value = bgColor;
  
  // Update preview
  const preview = document.getElementById('contrastPreview');
  preview.style.backgroundColor = bgColor;
  preview.querySelector('.contrast-text').style.color = fgColor;
  
  // Calculate contrast ratio
  const contrastRatio = getContrastRatio(fgColor, bgColor);
  const rating = getContrastRating(contrastRatio);
  
  // Display results
  const results = document.getElementById('contrastResults');
  results.innerHTML = `
    <p>Contrast Ratio: <strong>${contrastRatio.toFixed(2)}:1</strong></p>
    <p>WCAG Rating: <strong>${rating}</strong></p>
    <p>${getContrastMessage(contrastRatio)}</p>
  `;
}

function getContrastRatio(color1, color2) {
  // Convert hex to RGB
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  // Calculate relative luminance
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  // Return contrast ratio
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
}

function getLuminance(r, g, b) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRating(ratio) {
  if (ratio >= 7) return 'AAA (Large Text)';
  if (ratio >= 4.5) return 'AA (Normal Text)';
  if (ratio >= 3) return 'AA (Large Text)';
  return 'Fail';
}

function getContrastMessage(ratio) {
  if (ratio >= 7) return 'Excellent contrast for all text sizes.';
  if (ratio >= 4.5) return 'Good contrast for normal text (AA compliant).';
  if (ratio >= 3) return 'Minimum contrast for large text (AA compliant).';
  return 'Poor contrast - does not meet accessibility guidelines.';
}

// Sync color inputs with hex inputs
document.getElementById('foregroundColor').addEventListener('input', function() {
  document.getElementById('foregroundHex').value = this.value;
});
document.getElementById('backgroundColor').addEventListener('input', function() {
  document.getElementById('backgroundHex').value = this.value;
});
document.getElementById('foregroundHex').addEventListener('input', function() {
  if (/^#[0-9A-F]{6}$/i.test(this.value)) {
    document.getElementById('foregroundColor').value = this.value;
  }
});
document.getElementById('backgroundHex').addEventListener('input', function() {
  if (/^#[0-9A-F]{6}$/i.test(this.value)) {
    document.getElementById('backgroundColor').value = this.value;
  }
});

// Initialize contrast check
checkContrast();

// Color Palette Generator (n-8)
function generatePalette() {
  const baseColor = document.getElementById('baseColor').value;
  const paletteType = document.getElementById('paletteType').value;
  const container = document.getElementById('paletteContainer');
  
  container.innerHTML = '';
  
  // Generate palette based on type
  const colors = getPaletteColors(baseColor, paletteType);
  
  // Display colors
  colors.forEach(color => {
    const colorElement = document.createElement('div');
    colorElement.className = 'palette-color';
    colorElement.innerHTML = `
      <div class="color-box" style="background-color: ${color};"></div>
      <div class="color-value">${color}</div>
    `;
    container.appendChild(colorElement);
  });
}

function getPaletteColors(baseColor, type) {
  const base = hexToHsl(baseColor);
  const colors = [];
  
  switch(type) {
    case 'monochromatic':
      // Different shades of the same hue
      colors.push(hslToHex(base.h, base.s, Math.min(base.l + 0.3, 1)));
      colors.push(hslToHex(base.h, base.s, Math.min(base.l + 0.15, 1)));
      colors.push(baseColor);
      colors.push(hslToHex(base.h, base.s, Math.max(base.l - 0.15, 0)));
      colors.push(hslToHex(base.h, base.s, Math.max(base.l - 0.3, 0)));
      break;
      
    case 'analogous':
      // Adjacent colors (30° apart)
      colors.push(hslToHex((base.h + 30) % 360, base.s, base.l));
      colors.push(hslToHex((base.h + 15) % 360, base.s, base.l));
      colors.push(baseColor);
      colors.push(hslToHex((base.h - 15 + 360) % 360, base.s, base.l));
      colors.push(hslToHex((base.h - 30 + 360) % 360, base.s, base.l));
      break;
      
    case 'complementary':
      // Base color and its complement (180° apart)
      colors.push(baseColor);
      colors.push(hslToHex((base.h + 180) % 360, base.s, base.l));
      colors.push(hslToHex(base.h, base.s, Math.min(base.l + 0.2, 1)));
      colors.push(hslToHex((base.h + 180) % 360, base.s, Math.min(base.l + 0.2, 1)));
      colors.push(hslToHex(base.h, Math.min(base.s + 0.2, 1), base.l));
      break;
      
    case 'triadic':
      // Three colors 120° apart
      colors.push(baseColor);
      colors.push(hslToHex((base.h + 120) % 360, base.s, base.l));
      colors.push(hslToHex((base.h + 240) % 360, base.s, base.l));
      colors.push(hslToHex(base.h, base.s, Math.min(base.l + 0.2, 1)));
      colors.push(hslToHex((base.h + 120) % 360, base.s, Math.max(base.l - 0.2, 0)));
      break;
      
    case 'tetradic':
      // Four colors forming a rectangle (two complementary pairs)
      colors.push(baseColor);
      colors.push(hslToHex((base.h + 60) % 360, base.s, base.l));
      colors.push(hslToHex((base.h + 180) % 360, base.s, base.l));
      colors.push(hslToHex((base.h + 240) % 360, base.s, base.l));
      colors.push(hslToHex(base.h, Math.min(base.s + 0.3, 1), base.l));
      break;
  }
  
  return colors;
}

function hexToHsl(hex) {
  let {r, g, b} = hexToRgb(hex);
  r /= 255, g /= 255, b /= 255;
  
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }
  
  return {
    h: Math.round(h * 360),
    s: parseFloat(s.toFixed(2)),
    l: parseFloat(l.toFixed(2))
  };
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function copyPalette() {
  const colors = Array.from(document.querySelectorAll('.color-value'))
    .map(el => el.textContent)
    .join('\n');
  
  navigator.clipboard.writeText(colors)
    .then(() => alert('Color palette copied to clipboard!'))
    .catch(err => console.error('Failed to copy:', err));
}

// Initialize palette
generatePalette();

// Pattern Generator (n-9)
function generatePattern() {
  const type = document.getElementById('patternType').value;
  const color1 = document.getElementById('patternColor1').value;
  const color2 = document.getElementById('patternColor2').value;
  const size = parseInt(document.getElementById('patternSize').value);
  const opacity = parseInt(document.getElementById('patternOpacity').value) / 100;
  
  const canvas = document.createElement('canvas');
  canvas.width = size * 2;
  canvas.height = size * 2;
  const ctx = canvas.getContext('2d');
  
  // Draw pattern based on type
  switch(type) {
    case 'dots':
      ctx.fillStyle = color1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color2;
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.arc(size/2, size/2, size/3, 0, Math.PI * 2);
      ctx.fill();
      ctx.arc(size + size/2, size/2, size/3, 0, Math.PI * 2);
      ctx.fill();
      ctx.arc(size/2, size + size/2, size/3, 0, Math.PI * 2);
      ctx.fill();
      ctx.arc(size + size/2, size + size/2, size/3, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 'lines':
      ctx.fillStyle = color1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color2;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = size/4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      ctx.lineTo(canvas.width, 0);
      ctx.stroke();
      break;
      
    case 'squares':
      ctx.fillStyle = color1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color2;
      ctx.globalAlpha = opacity;
      ctx.fillRect(0, 0, size, size);
      ctx.fillRect(size, size, size, size);
      break;
      
    case 'zigzag':
      ctx.fillStyle = color1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color2;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = size/4;
      ctx.beginPath();
      ctx.moveTo(0, size/2);
      ctx.lineTo(size/2, 0);
      ctx.lineTo(size, size/2);
      ctx.lineTo(size + size/2, 0);
      ctx.lineTo(canvas.width, size/2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, size + size/2);
      ctx.lineTo(size/2, size);
      ctx.lineTo(size, size + size/2);
      ctx.lineTo(size + size/2, size);
      ctx.lineTo(canvas.width, size + size/2);
      ctx.stroke();
      break;
  }
  
  // Apply pattern to preview
  const preview = document.getElementById('patternPreview');
  preview.style.backgroundImage = `url(${canvas.toDataURL()})`;
  
  // Generate CSS code
  document.getElementById('patternCode').value = 
    `background-image: url(${canvas.toDataURL()});\n` +
    `background-size: ${size}px ${size}px;`;
}

// Initialize pattern
generatePattern();

// Favicon Generator (n-10)
function generateFavicon() {
  const type = document.getElementById('faviconType').value;
  const size = parseInt(document.getElementById('faviconSize').value);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = size;
  canvas.height = size;
  
  if (type === 'text') {
    const text = document.getElementById('faviconText').value;
    const textColor = document.getElementById('faviconTextColor').value;
    const bgColor = document.getElementById('faviconBgColor').value;
    
    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
    
    // Draw text
    ctx.fillStyle = textColor;
    ctx.font = `bold ${size * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, size/2, size/2);
  } else {
    const emoji = document.getElementById('faviconEmoji').value;
    
    // Draw emoji
    ctx.font = `${size * 0.8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, size/2, size/2);
  }
  
  // Display preview
  const preview = document.getElementById('faviconPreview');
  preview.innerHTML = '';
  preview.appendChild(canvas);
}

function downloadFavicon() {
  const canvas = document.querySelector('#faviconPreview canvas');
  if (!canvas) {
    alert('Please generate a favicon first');
    return;
  }
  
  const link = document.createElement('a');
  link.download = 'favicon.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Toggle controls based on favicon type
document.getElementById('faviconType').addEventListener('change', function() {
  const isText = this.value === 'text';
  document.getElementById('faviconTextControls').style.display = isText ? 'block' : 'none';
  document.getElementById('faviconEmojiControls').style.display = isText ? 'none' : 'block';
});

// Initialize favicon
generateFavicon();















// Barcode Generator (n-1) - Requires JsBarcode library
function generateBarcode() {
  try {
    const data = document.getElementById('barcodeData').value || '123456789';
    const type = document.getElementById('barcodeType').value;
    
    // Clear previous barcode
    document.getElementById('barcode').innerHTML = '';
    
    // Generate new barcode
    JsBarcode('#barcode', data, {
      format: type,
      lineColor: '#000000',
      width: 2,
      height: 100,
      displayValue: true
    });
  } catch (e) {
    alert('JsBarcode library not loaded. Please include it to use this feature.');
    console.error('JsBarcode error:', e);
  }
}

// Gradient Generator (n-2)
function generateGradient() {
  const color1 = document.getElementById('gradientColor1').value;
  const color2 = document.getElementById('gradientColor2').value;
  const type = document.getElementById('gradientType').value;
  const direction = document.getElementById('gradientDirection').value;
  
  let gradientCSS;
  const preview = document.getElementById('gradientPreview');
  
  if (type === 'linear') {
    gradientCSS = `linear-gradient(${direction}, ${color1}, ${color2})`;
    preview.style.background = gradientCSS;
  } else {
    gradientCSS = `radial-gradient(circle, ${color1}, ${color2})`;
    preview.style.background = gradientCSS;
  }
  
  document.getElementById('gradientCode').value = 
    `background: ${gradientCSS};\n` +
    `background-image: ${gradientCSS};`;
}

// ASCII Art Generator (n-3)
const asciiFonts = {
  standard: {
    A: [' █████╗ ', '██╔══██╗', '███████║', '██╔══██║', '██║  ██║', '╚═╝  ╚═╝'],
    S: ['███████╗', '██╔════╝', '███████╗', '╚════██║', '███████║', '╚══════╝'],
    C: [' ██████╗', '██╔════╝', '██║     ', '██║     ', '╚██████╗', ' ╚═════╝'],
    I: ['██╗', '██║', '██║', '██║', '██║', '╚═╝'],
    // More characters can be added
  },
  block: {
    A: ['┌─┐', '├─┤', '┴ ┴'],
    S: ['┌─┐', '└─┐', '┌─┘', '└─┘'],
    C: ['┌─┐', '│  ', '└─┘'],
    I: ['┌┐', '││', '└┘'],
  },
  simple: {
    A: [' A ', 'A A', 'AAA', 'A A', 'A A'],
    S: ['SSS', 'S  ', 'SSS', '  S', 'SSS'],
    C: [' CC', 'C  ', 'C  ', 'C  ', ' CC'],
    I: ['III', ' I ', ' I ', ' I ', 'III'],
  }
};

function generateAscii() {
  const text = document.getElementById('asciiText').value.toUpperCase();
  const style = document.getElementById('asciiStyle').value;
  const output = document.getElementById('asciiOutput');
  
  if (!text) {
    output.textContent = 'Please enter some text';
    return;
  }
  
  let asciiArt = '';
  const font = asciiFonts[style] || asciiFonts.standard;
  
  // For each line of ASCII characters
  for (let line = 0; line < 6; line++) {
    // For each character in the input text
    for (let char of text) {
      // Get the ASCII representation or use a default
      const charArt = font[char] || font[' '] || ['?'];
      asciiArt += charArt[line] || ' ';
    }
    asciiArt += '\n';
  }
  
  output.textContent = asciiArt;
}

function copyAscii() {
  const output = document.getElementById('asciiOutput');
  navigator.clipboard.writeText(output.textContent)
    .then(() => alert('ASCII art copied to clipboard!'))
    .catch(err => console.error('Failed to copy:', err));
}

// Meme Generator (n-4)
function generateMeme() {
  const canvas = document.getElementById('memeCanvas');
  const ctx = canvas.getContext('2d');
  const imageUrl = document.getElementById('memeTemplate').value;
  const topText = document.getElementById('memeTopText').value;
  const bottomText = document.getElementById('memeBottomText').value;
  const textColor = document.getElementById('memeTextColor').value;
  const textSize = parseInt(document.getElementById('memeTextSize').value);
  
  const image = new Image();
  image.crossOrigin = 'Anonymous';
  image.onload = function() {
    canvas.width = image.width;
    canvas.height = image.height;
    
    // Draw image
    ctx.drawImage(image, 0, 0);
    
    // Text style
    ctx.fillStyle = textColor;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = Math.floor(textSize/10);
    ctx.font = `bold ${textSize}px Impact`;
    ctx.textAlign = 'center';
    
    // Top text
    if (topText) {
      ctx.strokeText(topText, canvas.width/2, textSize + 10);
      ctx.fillText(topText, canvas.width/2, textSize + 10);
    }
    
    // Bottom text
    if (bottomText) {
      ctx.strokeText(bottomText, canvas.width/2, canvas.height - 10);
      ctx.fillText(bottomText, canvas.width/2, canvas.height - 10);
    }
  };
  image.src = imageUrl;
}

function downloadMeme() {
  const canvas = document.getElementById('memeCanvas');
  if (!canvas.width) {
    alert('Please generate a meme first');
    return;
  }
  
  const link = document.createElement('a');
  link.download = 'meme.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Calendar Generator (n-5)
function generateCalendar() {
  const month = parseInt(document.getElementById('calendarMonth').value);
  const year = parseInt(document.getElementById('calendarYear').value);
  const startDay = parseInt(document.getElementById('calendarStartDay').value);
  const showWeekNumbers = document.getElementById('showWeekNumbers').checked;
  const output = document.getElementById('calendarOutput');
  
  const date = new Date(year, month, 1);
  const monthName = date.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = (date.getDay() - startDay + 7) % 7;
  
  let calendarHTML = `<h3>${monthName} ${year}</h3><table class="calendar-table"><tr>`;
  
  // Add week numbers column if enabled
  if (showWeekNumbers) {
    calendarHTML += '<th class="week-number">Week</th>';
  }
  
  // Add day headers
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (let i = 0; i < 7; i++) {
    const dayIndex = (startDay + i) % 7;
    calendarHTML += `<th>${dayNames[dayIndex]}</th>`;
  }
  calendarHTML += '</tr>';
  
  let day = 1;
  let weekNumber = getWeekNumber(new Date(year, month, 1));
  
  // Create calendar rows
  for (let i = 0; i < 6; i++) {
    if (day > daysInMonth) break;
    
    calendarHTML += '<tr>';
    
    // Add week number if enabled
    if (showWeekNumbers) {
      calendarHTML += `<td class="week-number">${weekNumber}</td>`;
      weekNumber++;
    }
    
    // Add days
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        calendarHTML += '<td></td>';
      } else if (day > daysInMonth) {
        calendarHTML += '<td></td>';
      } else {
        const today = new Date();
        const isToday = day === today.getDate() && 
                        month === today.getMonth() && 
                        year === today.getFullYear();
        calendarHTML += `<td${isToday ? ' class="today"' : ''}>${day}</td>`;
        day++;
      }
    }
    calendarHTML += '</tr>';
  }
  
  calendarHTML += '</table>';
  output.innerHTML = calendarHTML;
}

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDays = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
}

function printCalendar() {
  const calendar = document.getElementById('calendarOutput').innerHTML;
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`
    <html>
      <head>
        <title>Calendar</title>
        <style>
          body { font-family: Arial; }
          .calendar-table { border-collapse: collapse; width: 100%; }
          .calendar-table th, .calendar-table td { 
            border: 1px solid #ddd; 
            padding: 8px; 
            text-align: center;
          }
          .calendar-table th { background-color: #f2f2f2; }
          .week-number { background-color: #f9f9f9; }
          .today { background-color: #ffeb3b; font-weight: bold; }
        </style>
      </head>
      <body>${calendar}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

// Initialize default generations
window.addEventListener('DOMContentLoaded', function() {
  generateGradient();
  generateAscii();
  generateCalendar();
});











// CSS Gradient Generator (o-6)
function updateGradient() {
  const type = document.getElementById('gradientType').value;
  const angle = document.getElementById('gradientAngle').value;
  const color1 = document.getElementById('gradientColor1').value;
  const color2 = document.getElementById('gradientColor2').value;
  const color3 = document.getElementById('gradientColor3').value;
  
  // Update angle display
  document.getElementById('gradientAngleValue').textContent = `${angle}deg`;
  
  // Show/hide angle controls based on gradient type
  document.getElementById('linearControls').style.display = type === 'linear' ? 'block' : 'none';
  
  // Generate gradient CSS
  let gradientCSS;
  if (type === 'linear') {
    gradientCSS = `linear-gradient(${angle}deg, ${color1}, ${color2}${color3 ? `, ${color3}` : ''})`;
  } else {
    gradientCSS = `radial-gradient(circle, ${color1}, ${color2}${color3 ? `, ${color3}` : ''})`;
  }
  
  // Apply to preview
  document.getElementById('gradientPreview').style.background = gradientCSS;
  
  // Update code display
  document.getElementById('gradientCode').value = `background: ${gradientCSS};`;
}

function copyGradientCode() {
  const code = document.getElementById('gradientCode');
  code.select();
  document.execCommand('copy');
  alert('CSS gradient code copied to clipboard!');
}

// Initialize gradient controls
document.getElementById('gradientType').addEventListener('change', function() {
  updateGradient();
});
document.getElementById('gradientAngle').addEventListener('input', updateGradient);
document.querySelectorAll('.gradient-colors input[type="color"]').forEach(input => {
  input.addEventListener('input', updateGradient);
});

// Initialize gradient
updateGradient();

// Text to Handwriting Converter (o-8)
function generateHandwriting() {
  const text = document.getElementById('handwritingText').value;
  const font = document.getElementById('handwritingFont').value;
  const color = document.getElementById('handwritingColor').value;
  const paper = document.getElementById('handwritingPaper').value;
  
  if (!text) {
    alert('Please enter some text first');
    return;
  }
  
  // Create a canvas to render the handwriting
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 400;
  
  // Set styles based on selections
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  
  // Apply different "handwriting" styles
  switch(font) {
    case 'cursive':
      ctx.font = 'italic 24px "Comic Sans MS", cursive';
      break;
    case 'architect':
      ctx.font = '20px Arial';
      // Add some architectural lettering style
      ctx.textBaseline = 'middle';
      break;
    case 'doodle':
      ctx.font = '22px "Comic Sans MS"';
      break;
  }
  
  // Draw the text with some randomness to simulate handwriting
  const lines = text.split('\n');
  const lineHeight = 30;
  const startX = 20;
  let startY = 50;
  
  lines.forEach(line => {
    let currentX = startX;
    for (let i = 0; i < line.length; i++) {
      // Add slight randomness to each character's position
      const offsetX = Math.random() * 3;
      const offsetY = Math.random() * 3;
      
      // Draw the character
      ctx.fillText(line[i], currentX + offsetX, startY + offsetY);
      
      // Move to next position
      currentX += ctx.measureText(line[i]).width + 1;
    }
    startY += lineHeight;
  });
  
  // Display the result
  const preview = document.getElementById('handwritingPreview');
  preview.innerHTML = '';
  preview.appendChild(canvas);
}

function downloadHandwriting() {
  const canvas = document.querySelector('#handwritingPreview canvas');
  if (!canvas) {
    alert('Please generate handwriting first');
    return;
  }
  
  const link = document.createElement('a');
  link.download = 'handwriting.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// ASCII Flowchart Generator (o-9)
function generateFlowchart() {
  const type = document.getElementById('flowchartType').value;
  const text = document.getElementById('flowchartText').value;
  
  if (!text) {
    alert('Please enter some text first');
    return;
  }
  
  const steps = text.split(',').map(s => s.trim());
  let flowchart = '';
  
  switch(type) {
    case 'simple':
      flowchart = generateSimpleFlowchart(steps);
      break;
    case 'decision':
      flowchart = generateDecisionFlowchart(steps);
      break;
    case 'loop':
      flowchart = generateLoopFlowchart(steps);
      break;
  }
  
  document.getElementById('flowchartPreview').textContent = flowchart;
}

function generateSimpleFlowchart(steps) {
  let result = '';
  const maxLength = Math.max(...steps.map(s => s.length));
  
  // Top border
  result += '┌' + '─'.repeat(maxLength + 2) + '┐\n';
  
  // Steps
  steps.forEach((step, i) => {
    const padding = ' '.repeat(Math.floor((maxLength - step.length) / 2));
    result += `│ ${padding}${step}${padding} │\n`;
    
    if (i < steps.length - 1) {
      result += '├' + '─'.repeat(maxLength + 2) + '┤\n';
    }
  });
  
  // Bottom border
  result += '└' + '─'.repeat(maxLength + 2) + '┘\n';
  
  return result;
}

function generateDecisionFlowchart(steps) {
  if (steps.length < 2) return "Need at least 2 steps for decision flowchart";
  
  let result = '';
  const maxLength = Math.max(...steps.map(s => s.length));
  
  // First step
  result += '┌' + '─'.repeat(maxLength + 2) + '┐\n';
  const padding1 = ' '.repeat(Math.floor((maxLength - steps[0].length) / 2));
  result += `│ ${padding1}${steps[0]}${padding1} │\n`;
  result += '└' + '─'.repeat(maxLength + 2) + '┘\n';
  result += '    │\n';
  result += '    ▼\n';
  
  // Decision diamond
  const question = steps[1];
  const diamondWidth = question.length + 4;
  const halfWidth = Math.ceil(diamondWidth / 2);
  
  result += ' '.repeat(halfWidth) + '┌' + '─'.repeat(halfWidth - 1) + '┐\n';
  result += ' '.repeat(halfWidth - 1) + '/' + ' '.repeat(halfWidth) + '\\\n';
  result += ' '.repeat(halfWidth - 2) + '/' + '  ' + question + '  ' + '\\\n';
  result += ' '.repeat(halfWidth - 1) + '\\' + ' '.repeat(halfWidth) + '/\n';
  result += ' '.repeat(halfWidth) + '└' + '─'.repeat(halfWidth - 1) + '┘\n';
  
  return result;
}

function generateLoopFlowchart(steps) {
  if (steps.length < 3) return "Need at least 3 steps for loop flowchart";
  
  let result = '';
  const maxLength = Math.max(...steps.map(s => s.length));
  
  // Start
  result += '┌' + '─'.repeat(maxLength + 2) + '┐\n';
  const padding1 = ' '.repeat(Math.floor((maxLength - steps[0].length) / 2));
  result += `│ ${padding1}${steps[0]}${padding1} │\n`;
  result += '└' + '─'.repeat(maxLength + 2) + '┘\n';
  result += '    │\n';
  result += '    ▼\n';
  
  // Loop box
  result += '┌' + '─'.repeat(maxLength + 2) + '┐\n';
  const padding2 = ' '.repeat(Math.floor((maxLength - steps[1].length) / 2));
  result += `│ ${padding2}${steps[1]}${padding2} │\n`;
  result += '└' + '─'.repeat(maxLength + 2) + '┘\n';
  
  // Loop arrow
  result += '    ▲\n';
  result += '    │\n';
  result += '    └───────┐\n';
  result += '            │\n';
  result += '            ▼\n';
  
  // End box
  result += '┌' + '─'.repeat(maxLength + 2) + '┐\n';
  const padding3 = ' '.repeat(Math.floor((maxLength - steps[2].length) / 2));
  result += `│ ${padding3}${steps[2]}${padding3} │\n`;
  result += '└' + '─'.repeat(maxLength + 2) + '┘\n';
  
  return result;
}

function copyFlowchart() {
  const flowchart = document.getElementById('flowchartPreview').textContent;
  if (!flowchart) {
    alert('Please generate a flowchart first');
    return;
  }
  
  navigator.clipboard.writeText(flowchart)
    .then(() => alert('Flowchart copied to clipboard!'))
    .catch(err => console.error('Failed to copy:', err));
}

// Mosaic Art Generator (o-10)
function generateMosaic() {
  const fileInput = document.getElementById('mosaicImage');
  const tileSize = parseInt(document.getElementById('mosaicTileSize').value);
  const variation = parseInt(document.getElementById('mosaicVariation').value);
  
  // Update value displays
  document.getElementById('mosaicTileSizeValue').textContent = `${tileSize}px`;
  document.getElementById('mosaicVariationValue').textContent = `${variation}%`;
  
  if (!fileInput.files || !fileInput.files[0]) {
    alert('Please select an image first');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.getElementById('mosaicCanvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions (scaled down for performance)
      const scale = Math.min(800 / img.width, 600 / img.height, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      
      // Draw original image scaled down
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Apply mosaic effect
      const scaledTileSize = tileSize * scale;
      for (let y = 0; y < canvas.height; y += scaledTileSize) {
        for (let x = 0; x < canvas.width; x += scaledTileSize) {
          // Get average color in this tile
          const pixelCount = Math.min(scaledTileSize, canvas.width - x) * 
                            Math.min(scaledTileSize, canvas.height - y);
          let r = 0, g = 0, b = 0;
          
          for (let ty = 0; ty < scaledTileSize && y + ty < canvas.height; ty++) {
            for (let tx = 0; tx < scaledTileSize && x + tx < canvas.width; tx++) {
              const pos = ((y + ty) * canvas.width + (x + tx)) * 4;
              r += data[pos];
              g += data[pos + 1];
              b += data[pos + 2];
            }
          }
          
          r = Math.round(r / pixelCount);
          g = Math.round(g / pixelCount);
          b = Math.round(b / pixelCount);
          
          // Apply color variation
          const variationAmount = variation / 100;
          r += Math.round((Math.random() * 2 - 1) * 255 * variationAmount);
          g += Math.round((Math.random() * 2 - 1) * 255 * variationAmount);
          b += Math.round((Math.random() * 2 - 1) * 255 * variationAmount);
          r = Math.max(0, Math.min(255, r));
          g = Math.max(0, Math.min(255, g));
          b = Math.max(0, Math.min(255, b));
          
          // Fill the tile with the average color
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(x, y, scaledTileSize, scaledTileSize);
        }
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(fileInput.files[0]);
}

function downloadMosaic() {
  const canvas = document.getElementById('mosaicCanvas');
  if (!canvas || canvas.width === 0) {
    alert('Please generate a mosaic first');
    return;
  }
  
  const link = document.createElement('a');
  link.download = 'mosaic-art.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Initialize mosaic controls
document.getElementById('mosaicTileSize').addEventListener('input', function() {
  document.getElementById('mosaicTileSizeValue').textContent = `${this.value}px`;
});
document.getElementById('mosaicVariation').addEventListener('input', function() {
  document.getElementById('mosaicVariationValue').textContent = `${this.value}%`;
});




// CSS Box Shadow Generator (o-5)
function updateShadowPreview() {
const h = document.getElementById('shadowH').value;
const v = document.getElementById('shadowV').value;
const blur = document.getElementById('shadowBlur').value;
const spread = document.getElementById('shadowSpread').value;
const color = document.getElementById('shadowColor').value;
const opacity = document.getElementById('shadowOpacity').value;
const inset = document.getElementById('shadowInset').checked;

// Update value displays
document.getElementById('shadowHValue').textContent = `${h}px`;
document.getElementById('shadowVValue').textContent = `${v}px`;
document.getElementById('shadowBlurValue').textContent = `${blur}px`;
document.getElementById('shadowSpreadValue').textContent = `${spread}px`;
document.getElementById('shadowOpacityValue').textContent = `${opacity}%`;

// Convert color to RGBA with opacity
const rgbaColor = hexToRgba(color, opacity);

// Generate box-shadow CSS
let shadowValue = `${h}px ${v}px ${blur}px ${spread}px ${rgbaColor}`;
if (inset) {
shadowValue = `inset ${shadowValue}`;
}

// Apply to preview box
const previewBox = document.getElementById('shadowPreviewBox');
previewBox.style.boxShadow = shadowValue;

// Update code display
document.getElementById('shadowCode').value = `box-shadow: ${shadowValue};`;
}

function hexToRgba(hex, opacity) {
// Convert hex to RGB first
let r = 0, g = 0, b = 0;
if (hex.length == 4) {
r = parseInt(hex[1] + hex[1], 16);
g = parseInt(hex[2] + hex[2], 16);
b = parseInt(hex[3] + hex[3], 16);
} else if (hex.length == 7) {
r = parseInt(hex.substring(1, 3), 16);
g = parseInt(hex.substring(3, 5), 16);
b = parseInt(hex.substring(5, 7), 16);
}

// Then return RGBA string
return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

function copyShadowCode() {
const code = document.getElementById('shadowCode');
code.select();
document.execCommand('copy');
alert('CSS code copied to clipboard!');
}

// Initialize shadow controls
document.querySelectorAll('.shadow-controls input[type="range"], .shadow-controls input[type="color"]').forEach(input => {
input.addEventListener('input', updateShadowPreview);
});
document.getElementById('shadowInset').addEventListener('change', updateShadowPreview);

// Initialize preview
updateShadowPreview();
















// Reading Time Calculator (p-6)
function calculateReadingTime() {
  const text = document.getElementById('readingText').value;
  const wordsPerMinute = parseInt(document.getElementById('readingSpeed').value);
  
  // Count words (simplified approach)
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  document.getElementById('wordCount').textContent = wordCount;
  document.getElementById('readingTime').textContent = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
}

// Initialize Reading Calculator
document.querySelector('.reading-calculator button').addEventListener('click', calculateReadingTime);

// Password Strength Checker (p-7)
function checkPasswordStrength() {
  const password = document.getElementById('passwordInput').value;
  let strength = 0;
  
  // Requirements
  const hasMinLength = password.length >= 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  // Update requirement indicators
  document.getElementById('lengthReq').style.color = hasMinLength ? 'green' : 'red';
  document.getElementById('lowercaseReq').style.color = hasLowercase ? 'green' : 'red';
  document.getElementById('uppercaseReq').style.color = hasUppercase ? 'green' : 'red';
  document.getElementById('numberReq').style.color = hasNumber ? 'green' : 'red';
  document.getElementById('specialReq').style.color = hasSpecial ? 'green' : 'red';
  
  // Calculate strength score
  if (hasMinLength) strength += 1;
  if (hasLowercase) strength += 1;
  if (hasUppercase) strength += 1;
  if (hasNumber) strength += 1;
  if (hasSpecial) strength += 1;
  
  // Additional points for length
  if (password.length >= 12) strength += 1;
  if (password.length >= 16) strength += 1;
  
  // Update strength meter
  const strengthBar = document.getElementById('strengthBar');
  strengthBar.style.width = `${strength * 16.66}%`;
  
  // Set color and text based on strength
  let strengthText = '';
  let strengthColor = '';
  
  if (strength <= 2) {
    strengthText = 'Very Weak';
    strengthColor = '#ff4d4d';
  } else if (strength <= 4) {
    strengthText = 'Weak';
    strengthColor = '#ff9933';
  } else if (strength <= 6) {
    strengthText = 'Moderate';
    strengthColor = '#ffcc00';
  } else if (strength <= 8) {
    strengthText = 'Strong';
    strengthColor = '#66cc66';
  } else {
    strengthText = 'Very Strong';
    strengthColor = '#009900';
  }
  
  strengthBar.style.backgroundColor = strengthColor;
  document.getElementById('strengthText').textContent = `Strength: ${strengthText}`;
  document.getElementById('strengthText').style.color = strengthColor;
}

// Toggle password visibility
document.getElementById('showPassword').addEventListener('change', function() {
  const passwordInput = document.getElementById('passwordInput');
  passwordInput.type = this.checked ? 'text' : 'password';
});

// Initialize Password Checker
document.getElementById('passwordInput').addEventListener('input', checkPasswordStrength);

// Habit Tracker (p-8)
let habits = JSON.parse(localStorage.getItem('habits')) || [];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function generateCalendar() {
  const calendarEl = document.getElementById('habitCalendar');
  const date = new Date(currentYear, currentMonth, 1);
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = date.getDay();
  
  let calendarHTML = '<div class="calendar-header">';
  calendarHTML += `<button class="calendar-nav" onclick="prevMonth()">←</button>`;
  calendarHTML += `<span class="calendar-title">${date.toLocaleString('default', { month: 'long' })} ${currentYear}</span>`;
  calendarHTML += `<button class="calendar-nav" onclick="nextMonth()">→</button>`;
  calendarHTML += '</div>';
  calendarHTML += '<div class="calendar-grid">';
  
  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayNames.forEach(day => {
    calendarHTML += `<div class="calendar-day-name">${day}</div>`;
  });
  
  // Empty cells for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    calendarHTML += '<div class="calendar-day empty"></div>';
  }
  
  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const habitsForDay = habits.filter(h => h.dates.includes(dateStr));
    
    calendarHTML += `<div class="calendar-day" data-date="${dateStr}">`;
    calendarHTML += `<div class="day-number">${day}</div>`;
    habitsForDay.forEach(habit => {
      calendarHTML += `<div class="habit-dot" style="background-color: ${habit.color}" title="${habit.name}"></div>`;
    });
    calendarHTML += '</div>';
  }
  
  calendarHTML += '</div>';
  calendarEl.innerHTML = calendarHTML;
  
  // Update habit list
  updateHabitList();
}

function updateHabitList() {
  const habitListEl = document.getElementById('habitList');
  habitListEl.innerHTML = '';
  
  if (habits.length === 0) {
    habitListEl.innerHTML = '<p>No habits added yet. Add your first habit above!</p>';
    return;
  }
  
  habits.forEach((habit, index) => {
    const habitEl = document.createElement('div');
    habitEl.className = 'habit-item';
    habitEl.innerHTML = `
      <div class="habit-info">
        <span class="habit-color" style="background-color: ${habit.color}"></span>
        <span class="habit-name">${habit.name}</span>
      </div>
      <div class="habit-actions">
        <button class="habit-btn" onclick="toggleHabitDate(${index}, '${getTodayDate()}')">+</button>
        <button class="habit-btn delete" onclick="deleteHabit(${index})">×</button>
      </div>
    `;
    habitListEl.appendChild(habitEl);
  });
}

function addHabit() {
  const habitInput = document.getElementById('newHabit');
  const habitName = habitInput.value.trim();
  
  if (!habitName) {
    alert('Please enter a habit name');
    return;
  }
  
  // Generate random color for the habit
  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
  
  habits.push({
    name: habitName,
    color: randomColor,
    dates: []
  });
  
  saveHabits();
  habitInput.value = '';
  generateCalendar();
}

function toggleHabitDate(habitIndex, dateStr) {
  const habit = habits[habitIndex];
  const dateIndex = habit.dates.indexOf(dateStr);
  
  if (dateIndex === -1) {
    habit.dates.push(dateStr);
  } else {
    habit.dates.splice(dateIndex, 1);
  }
  
  saveHabits();
  generateCalendar();
}

function deleteHabit(habitIndex) {
  if (confirm('Are you sure you want to delete this habit?')) {
    habits.splice(habitIndex, 1);
    saveHabits();
    generateCalendar();
  }
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar();
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar();
}

function getTodayDate() {
  const today = new Date();
  return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
}

function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

// Initialize Habit Tracker
generateCalendar();

// Workout Generator (p-9)
const workoutExercises = {
  fullbody: {
    beginner: ['Bodyweight Squats', 'Push-ups (knees if needed)', 'Plank', 'Lunges', 'Superman'],
    intermediate: ['Jump Squats', 'Push-ups', 'Plank with Shoulder Taps', 'Bulgarian Split Squats', 'Bicycle Crunches'],
    advanced: ['Pistol Squats', 'Diamond Push-ups', 'Hanging Leg Raises', 'Jump Lunges', 'Handstand Push-ups']
  },
  upper: {
    beginner: ['Wall Push-ups', 'Arm Circles', 'Seated Rows (with band)', 'Bicep Curls (with water bottles)', 'Tricep Dips (on chair)'],
    intermediate: ['Push-ups', 'Pull-ups (assisted if needed)', 'Dumbbell Shoulder Press', 'Bent-over Rows', 'Plank to Push-up'],
    advanced: ['One-arm Push-ups', 'Muscle-ups', 'Handstand Push-ups', 'Weighted Pull-ups', 'Dragon Flags']
  },
  lower: {
    beginner: ['Bodyweight Squats', 'Step-ups', 'Glute Bridges', 'Calf Raises', 'Side Leg Raises'],
    intermediate: ['Jump Squats', 'Walking Lunges', 'Single-leg Deadlifts', 'Wall Sit', 'Box Jumps'],
    advanced: ['Pistol Squats', 'Bulgarian Split Squats with Jump', 'Single-leg Glute Bridges with Weight', 'Sprints', 'Depth Jumps']
  },
  core: {
    beginner: ['Plank', 'Dead Bug', 'Seated Russian Twists', 'Leg Raises (bent knees)', 'Bird Dog'],
    intermediate: ['Side Plank', 'Hanging Knee Raises', 'Ab Wheel Rollouts', 'Dragon Flags (assisted)', 'L-sit'],
    advanced: ['Front Lever', 'Human Flag', 'Hanging Leg Raises', 'Dragon Flags', 'Planche']
  },
  cardio: {
    beginner: ['Brisk Walking', 'Jumping Jacks', 'Step-ups', 'Mountain Climbers (slow)', 'High Knees (slow)'],
    intermediate: ['Running', 'Burpees', 'Jump Rope', 'Box Jumps', 'Sprints'],
    advanced: ['HIIT Sprints', 'Plyometric Push-ups', 'Box Jump Burpees', 'Double Unders (jump rope)', 'Stair Running']
  }
};

function generateWorkout() {
  const type = document.getElementById('workoutType').value;
  const difficulty = document.getElementById('workoutDifficulty').value;
  const duration = parseInt(document.getElementById('workoutDuration').value);
  
  const exercises = workoutExercises[type][difficulty];
  const workoutDurationPerExercise = duration * 60 / exercises.length; // in seconds
  
  let workoutHTML = '<div class="workout-plan">';
  workoutHTML += `<h4>${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} ${type} Workout</h4>`;
  workoutHTML += `<p>Estimated duration: ${duration} minutes</p>`;
  workoutHTML += '<ol class="workout-exercises">';
  
  exercises.forEach(exercise => {
    const sets = difficulty === 'beginner' ? 3 : difficulty === 'intermediate' ? 4 : 5;
    const reps = difficulty === 'beginner' ? 10 : difficulty === 'intermediate' ? 15 : 20;
    
    workoutHTML += `
      <li>
        <strong>${exercise}</strong>
        <div class="exercise-details">
          <span>${sets} sets × ${reps} reps</span>
          <span>${Math.floor(workoutDurationPerExercise / sets / 60)} min rest</span>
        </div>
      </li>
    `;
  });
  
  workoutHTML += '</ol></div>';
  document.getElementById('workoutResult').innerHTML = workoutHTML;
}

// Initialize Workout Generator
document.querySelector('.workout-generator button').addEventListener('click', generateWorkout);

// Meal Planner (p-10)
let meals = JSON.parse(localStorage.getItem('meals')) || [];

function generateMealPlan() {
  const mealPlanEl = document.getElementById('mealPlan');
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
  
  let mealPlanHTML = '<div class="meal-plan-grid">';
  
  // Header row
  mealPlanHTML += '<div class="meal-plan-header"></div>';
  days.forEach(day => {
    mealPlanHTML += `<div class="meal-plan-header">${day.charAt(0).toUpperCase() + day.slice(1)}</div>`;
  });
  
  // Meal rows
  mealTypes.forEach(type => {
    mealPlanHTML += `<div class="meal-plan-type">${type.charAt(0).toUpperCase() + type.slice(1)}</div>`;
    
    days.forEach(day => {
      const dayMeals = meals.filter(m => m.day === day && m.type === type);
      mealPlanHTML += '<div class="meal-plan-cell">';
      
      if (dayMeals.length > 0) {
        dayMeals.forEach(meal => {
          const index = meals.findIndex(m => m === meal);
          mealPlanHTML += `
            <div class="meal-item">
              <span>${meal.name}</span>
              <button class="meal-delete" onclick="deleteMeal(${index})">×</button>
            </div>
          `;
        });
      }
      
      mealPlanHTML += '</div>';
    });
  });
  
  mealPlanHTML += '</div>';
  mealPlanEl.innerHTML = mealPlanHTML;
}

function addMeal() {
  const mealInput = document.getElementById('newMeal');
  const mealName = mealInput.value.trim();
  const day = document.getElementById('mealDay').value;
  const type = document.getElementById('mealType').value;
  
  if (!mealName) {
    alert('Please enter a meal name');
    return;
  }
  
  meals.push({
    name: mealName,
    day: day,
    type: type
  });
  
  saveMeals();
  mealInput.value = '';
  generateMealPlan();
}

function deleteMeal(index) {
  if (confirm('Are you sure you want to delete this meal?')) {
    meals.splice(index, 1);
    saveMeals();
    generateMealPlan();
  }
}

function saveMeals() {
  localStorage.setItem('meals', JSON.stringify(meals));
}

// Initialize Meal Planner
generateMealPlan();




// Pomodoro Timer (p-1)
let pomodoroInterval;
let pomodoroTimeLeft = 25 * 60; // 25 minutes in seconds
let isPomodoroRunning = false;
let isWorkPhase = true;

function updatePomodoroDisplay() {
  const minutes = Math.floor(pomodoroTimeLeft / 60);
  const seconds = pomodoroTimeLeft % 60;
  document.getElementById('pomodoroDisplay').textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startPomodoro() {
  if (isPomodoroRunning) return;
  
  const workMinutes = parseInt(document.getElementById('workDuration').value);
  const breakMinutes = parseInt(document.getElementById('breakDuration').value);
  
  if (isWorkPhase) {
    pomodoroTimeLeft = workMinutes * 60;
    document.getElementById('pomodoroStatus').textContent = "Work time! Focus!";
  } else {
    pomodoroTimeLeft = breakMinutes * 60;
    document.getElementById('pomodoroStatus').textContent = "Break time! Relax!";
  }
  
  isPomodoroRunning = true;
  document.getElementById('pomodoroStart').disabled = true;
  document.getElementById('pomodoroPause').disabled = false;
  
  pomodoroInterval = setInterval(() => {
    pomodoroTimeLeft--;
    updatePomodoroDisplay();
    
    if (pomodoroTimeLeft <= 0) {
      clearInterval(pomodoroInterval);
      isPomodoroRunning = false;
      isWorkPhase = !isWorkPhase;
      
      // Play sound
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
      audio.play();
      
      if (isWorkPhase) {
        document.getElementById('pomodoroStatus').textContent = "Work phase ready to start";
      } else {
        document.getElementById('pomodoroStatus').textContent = "Break phase ready to start";
      }
      
      document.getElementById('pomodoroStart').disabled = false;
      document.getElementById('pomodoroPause').disabled = true;
    }
  }, 1000);
}

function pausePomodoro() {
  clearInterval(pomodoroInterval);
  isPomodoroRunning = false;
  document.getElementById('pomodoroStart').disabled = false;
  document.getElementById('pomodoroPause').disabled = true;
  document.getElementById('pomodoroStatus').textContent = "Paused";
}

function resetPomodoro() {
  clearInterval(pomodoroInterval);
  isPomodoroRunning = false;
  isWorkPhase = true;
  pomodoroTimeLeft = parseInt(document.getElementById('workDuration').value) * 60;
  updatePomodoroDisplay();
  document.getElementById('pomodoroStart').disabled = false;
  document.getElementById('pomodoroPause').disabled = true;
  document.getElementById('pomodoroStatus').textContent = "Ready to work";
}

// Initialize Pomodoro
document.getElementById('pomodoroStart').addEventListener('click', startPomodoro);
document.getElementById('pomodoroPause').addEventListener('click', pausePomodoro);
document.getElementById('pomodoroReset').addEventListener('click', resetPomodoro);
updatePomodoroDisplay();

// Countdown Timer (p-2)
let countdownInterval;
let countdownTimeLeft = 0;
let isCountdownRunning = false;

function updateCountdownDisplay() {
  const hours = Math.floor(countdownTimeLeft / 3600);
  const minutes = Math.floor((countdownTimeLeft % 3600) / 60);
  const seconds = countdownTimeLeft % 60;
  document.getElementById('countdownDisplay').textContent = 
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startCountdown() {
  if (isCountdownRunning) return;
  
  const hours = parseInt(document.getElementById('countdownHours').value) || 0;
  const minutes = parseInt(document.getElementById('countdownMinutes').value) || 0;
  const seconds = parseInt(document.getElementById('countdownSeconds').value) || 0;
  
  countdownTimeLeft = hours * 3600 + minutes * 60 + seconds;
  
  if (countdownTimeLeft <= 0) {
    alert("Please set a valid time");
    return;
  }
  
  isCountdownRunning = true;
  document.getElementById('countdownStart').disabled = true;
  document.getElementById('countdownPause').disabled = false;
  document.getElementById('countdownStatus').textContent = "Counting down...";
  
  updateCountdownDisplay();
  
  countdownInterval = setInterval(() => {
    countdownTimeLeft--;
    updateCountdownDisplay();
    
    if (countdownTimeLeft <= 0) {
      clearInterval(countdownInterval);
      isCountdownRunning = false;
      document.getElementById('countdownStart').disabled = false;
      document.getElementById('countdownPause').disabled = true;
      document.getElementById('countdownStatus').textContent = "Time's up!";
      
      // Play sound
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
      audio.play();
    }
  }, 1000);
}

function pauseCountdown() {
  clearInterval(countdownInterval);
  isCountdownRunning = false;
  document.getElementById('countdownStart').disabled = false;
  document.getElementById('countdownPause').disabled = true;
  document.getElementById('countdownStatus').textContent = "Paused";
}

function resetCountdown() {
  clearInterval(countdownInterval);
  isCountdownRunning = false;
  countdownTimeLeft = 0;
  updateCountdownDisplay();
  document.getElementById('countdownStart').disabled = false;
  document.getElementById('countdownPause').disabled = true;
  document.getElementById('countdownStatus').textContent = "Set your timer";
}

// Initialize Countdown
document.getElementById('countdownStart').addEventListener('click', startCountdown);
document.getElementById('countdownPause').addEventListener('click', pauseCountdown);
document.getElementById('countdownReset').addEventListener('click', resetCountdown);
updateCountdownDisplay();

// Stopwatch (p-3)
let stopwatchInterval;
let stopwatchTime = 0;
let isStopwatchRunning = false;
let lapCount = 0;

function updateStopwatchDisplay() {
  const hours = Math.floor(stopwatchTime / 360000);
  const minutes = Math.floor((stopwatchTime % 360000) / 6000);
  const seconds = Math.floor((stopwatchTime % 6000) / 100);
  const centiseconds = stopwatchTime % 100;
  document.getElementById('stopwatchDisplay').textContent = 
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
}

function startStopwatch() {
  if (isStopwatchRunning) return;
  
  isStopwatchRunning = true;
  document.getElementById('stopwatchStart').disabled = true;
  document.getElementById('stopwatchPause').disabled = false;
  document.getElementById('stopwatchLap').disabled = false;
  
  stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    updateStopwatchDisplay();
  }, 10);
}

function pauseStopwatch() {
  clearInterval(stopwatchInterval);
  isStopwatchRunning = false;
  document.getElementById('stopwatchStart').disabled = false;
  document.getElementById('stopwatchPause').disabled = true;
  document.getElementById('stopwatchLap').disabled = true;
}

function lapStopwatch() {
  lapCount++;
  const lapTime = document.getElementById('stopwatchDisplay').textContent;
  const lapElement = document.createElement('div');
  lapElement.className = 'lap-item';
  lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
  document.getElementById('stopwatchLaps').prepend(lapElement);
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  isStopwatchRunning = false;
  stopwatchTime = 0;
  lapCount = 0;
  updateStopwatchDisplay();
  document.getElementById('stopwatchStart').disabled = false;
  document.getElementById('stopwatchPause').disabled = true;
  document.getElementById('stopwatchLap').disabled = true;
  document.getElementById('stopwatchLaps').innerHTML = '';
}

// Initialize Stopwatch
document.getElementById('stopwatchStart').addEventListener('click', startStopwatch);
document.getElementById('stopwatchPause').addEventListener('click', pauseStopwatch);
document.getElementById('stopwatchLap').addEventListener('click', lapStopwatch);
document.getElementById('stopwatchReset').addEventListener('click', resetStopwatch);
updateStopwatchDisplay();

// Meeting Cost Calculator (p-4)
function calculateMeetingCost() {
  const duration = parseInt(document.getElementById('meetingDuration').value);
  const participants = parseInt(document.getElementById('participantCount').value);
  const rate = parseInt(document.getElementById('hourlyRate').value);
  
  if (isNaN(duration) || isNaN(participants) || isNaN(rate)) {
    alert("Please enter valid numbers");
    return;
  }
  
  const cost = (duration / 60) * participants * rate;
  const costPerMinute = participants * rate / 60;
  
  document.getElementById('meetingCost').textContent = `$${cost.toFixed(2)}`;
  document.getElementById('costPerMinute').textContent = `$${costPerMinute.toFixed(2)}`;
}

// Initialize Meeting Calculator
document.querySelector('.meeting-calculator button').addEventListener('click', calculateMeetingCost);

// Typing Speed Test (p-5)
let typingInterval;
let typingTimeLeft = 60;
let isTypingTestRunning = false;
let testText = "The quick brown fox jumps over the lazy dog. This sentence contains all the letters in the English alphabet. Typing tests help improve your speed and accuracy. Practice regularly to see improvement in your typing skills.";
let startTime, endTime;

function startTypingTest() {
  document.getElementById('typingText').textContent = testText;
  document.getElementById('typingInput').value = '';
  document.getElementById('typingInput').disabled = false;
  document.getElementById('typingInput').focus();
  document.getElementById('typingStart').disabled = true;
  document.getElementById('typingReset').disabled = false;
  
  typingTimeLeft = 60;
  isTypingTestRunning = true;
  startTime = new Date();
  
  document.getElementById('typingTime').textContent = typingTimeLeft;
  document.getElementById('typingWPM').textContent = '0';
  document.getElementById('typingAccuracy').textContent = '0';
  
  typingInterval = setInterval(() => {
    typingTimeLeft--;
    document.getElementById('typingTime').textContent = typingTimeLeft;
    
    if (typingTimeLeft <= 0) {
      endTypingTest();
    }
  }, 1000);
}

function endTypingTest() {
  clearInterval(typingInterval);
  isTypingTestRunning = false;
  endTime = new Date();
  document.getElementById('typingInput').disabled = true;
  
  const typedText = document.getElementById('typingInput').value;
  const originalText = testText;
  
  // Calculate WPM (5 characters = 1 word)
  const timeInMinutes = (endTime - startTime) / 60000;
  const typedChars = typedText.length;
  const wpm = Math.round((typedChars / 5) / timeInMinutes);
  
  // Calculate accuracy
  let correctChars = 0;
  const minLength = Math.min(typedText.length, originalText.length);
  
  for (let i = 0; i < minLength; i++) {
    if (typedText[i] === originalText[i]) {
      correctChars++;
    }
  }
  
  const accuracy = Math.round((correctChars / typedText.length) * 100);
  
  document.getElementById('typingWPM').textContent = wpm;
  document.getElementById('typingAccuracy').textContent = accuracy;
}

function resetTypingTest() {
  clearInterval(typingInterval);
  isTypingTestRunning = false;
  document.getElementById('typingText').textContent = "Click start to begin the typing test. The text to type will appear here.";
  document.getElementById('typingInput').value = '';
  document.getElementById('typingInput').disabled = true;
  document.getElementById('typingStart').disabled = false;
  document.getElementById('typingReset').disabled = true;
  document.getElementById('typingTime').textContent = '60';
  document.getElementById('typingWPM').textContent = '0';
  document.getElementById('typingAccuracy').textContent = '0';
}

// Initialize Typing Test
document.getElementById('typingStart').addEventListener('click', startTypingTest);
document.getElementById('typingReset').addEventListener('click', resetTypingTest);
document.getElementById('typingInput').addEventListener('input', function() {
  if (this.value.length >= testText.length) {
    endTypingTest();
  }
});














// Car Loan Calculator (q-1)
function calculateCarLoan() {
  const price = parseFloat(document.getElementById('carPrice').value);
  const downPayment = parseFloat(document.getElementById('downPayment').value);
  const termYears = parseInt(document.getElementById('loanTerm').value);
  const annualRate = parseFloat(document.getElementById('interestRate').value) / 100;
  
  const loanAmount = price - downPayment;
  const monthlyRate = annualRate / 12;
  const termMonths = termYears * 12;
  
  if (loanAmount <= 0) {
    alert("Loan amount must be positive");
    return;
  }
  
  // Calculate monthly payment
  const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
  const totalCost = monthlyPayment * termMonths;
  const totalInterest = totalCost - loanAmount;
  
  // Display results
  document.getElementById('monthlyPayment').textContent = `$${monthlyPayment.toFixed(2)}`;
  document.getElementById('totalInterest').textContent = `$${totalInterest.toFixed(2)}`;
  document.getElementById('totalCost').textContent = `$${totalCost.toFixed(2)}`;
}

// Initialize Car Loan Calculator
document.querySelector('.car-loan-calculator button').addEventListener('click', calculateCarLoan);

// Mortgage Calculator (q-2)
function calculateMortgage() {
  const homePrice = parseFloat(document.getElementById('homePrice').value);
  const downPayment = parseFloat(document.getElementById('mortgageDownPayment').value);
  const termYears = parseInt(document.getElementById('mortgageTerm').value);
  const annualRate = parseFloat(document.getElementById('mortgageRate').value) / 100;
  const annualTaxes = parseFloat(document.getElementById('annualTaxes').value);
  const annualInsurance = parseFloat(document.getElementById('annualInsurance').value);
  
  const loanAmount = homePrice - downPayment;
  const monthlyRate = annualRate / 12;
  const termMonths = termYears * 12;
  
  if (loanAmount <= 0) {
    alert("Loan amount must be positive");
    return;
  }
  
  // Calculate principal & interest
  const monthlyPI = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
  const monthlyTaxes = annualTaxes / 12;
  const monthlyInsurance = annualInsurance / 12;
  const monthlyPayment = monthlyPI + monthlyTaxes + monthlyInsurance;
  
  const totalInterest = (monthlyPI * termMonths) - loanAmount;
  
  // Display results
  document.getElementById('mortgagePayment').textContent = `$${monthlyPayment.toFixed(2)}`;
  document.getElementById('principalInterest').textContent = `$${monthlyPI.toFixed(2)}`;
  document.getElementById('taxesInsurance').textContent = `$${(monthlyTaxes + monthlyInsurance).toFixed(2)}`;
  document.getElementById('mortgageTotalInterest').textContent = `$${totalInterest.toFixed(2)}`;
}

// Initialize Mortgage Calculator
document.querySelector('.mortgage-calculator button').addEventListener('click', calculateMortgage);

// Fuel Cost Calculator (q-3)
function calculateFuelCost() {
  const distance = parseFloat(document.getElementById('tripDistance').value);
  const mpg = parseFloat(document.getElementById('fuelEfficiency').value);
  const pricePerGallon = parseFloat(document.getElementById('fuelPrice').value);
  
  if (distance <= 0 || mpg <= 0) {
    alert("Please enter valid values");
    return;
  }
  
  const gallonsNeeded = distance / mpg;
  const tripCost = gallonsNeeded * pricePerGallon;
  
  document.getElementById('fuelNeeded').textContent = gallonsNeeded.toFixed(1);
  document.getElementById('tripCost').textContent = `$${tripCost.toFixed(2)}`;
}

// Initialize Fuel Calculator
document.querySelector('.fuel-calculator button').addEventListener('click', calculateFuelCost);

// Carbon Footprint Calculator (q-4)
function calculateCarbonFootprint() {
  // Transportation
  const milesDriven = parseFloat(document.getElementById('milesDriven').value);
  const mpg = parseFloat(document.getElementById('vehicleMPG').value);
  const flightHours = parseFloat(document.getElementById('flightHours').value);
  
  // Home Energy
  const electricityUsage = parseFloat(document.getElementById('electricityUsage').value) * 12; // Convert to annual
  const gasUsage = parseFloat(document.getElementById('gasUsage').value) * 12; // Convert to annual
  
  // Emission factors (kg CO2 per unit)
  const gasolineEmission = 8.89; // kg CO2 per gallon
  const flightEmission = 90; // kg CO2 per hour (short-haul)
  const electricityEmission = 0.43; // kg CO2 per kWh (US average)
  const gasEmission = 5.3; // kg CO2 per therm
  
  // Calculate emissions
  const drivingEmissions = (milesDriven / mpg) * gasolineEmission;
  const flightEmissions = flightHours * flightEmission;
  const transportEmissions = drivingEmissions + flightEmissions;
  
  const electricityEmissions = electricityUsage * electricityEmission;
  const gasEmissions = gasUsage * gasEmission;
  const homeEmissions = electricityEmissions + gasEmissions;
  
  const totalEmissions = transportEmissions + homeEmissions;
  
  // Calculate percentages
  const transportPercent = Math.round((transportEmissions / totalEmissions) * 100) || 0;
  const homePercent = Math.round((homeEmissions / totalEmissions) * 100) || 0;
  
  // Display results
  document.getElementById('carbonTotal').textContent = Math.round(totalEmissions).toLocaleString();
  document.getElementById('transportBar').style.width = `${transportPercent}%`;
  document.getElementById('homeBar').style.width = `${homePercent}%`;
  document.getElementById('transportPercent').textContent = `${transportPercent}%`;
  document.getElementById('homePercent').textContent = `${homePercent}%`;
  
  // Add comparison
  const avgUSFootprint = 16000; // kg CO2 per year
  const comparison = document.getElementById('carbonComparison');
  comparison.innerHTML = `
    <p>US Average: ${avgUSFootprint.toLocaleString()} kg CO₂/year</p>
    <p>Your footprint is ${(totalEmissions / avgUSFootprint * 100).toFixed(0)}% of the US average</p>
  `;
  
  // Set bar colors
  document.getElementById('transportBar').style.backgroundColor = '#4a6baf';
  document.getElementById('homeBar').style.backgroundColor = '#5cb85c';
}

// Initialize Carbon Calculator
document.querySelector('.carbon-calculator button').addEventListener('click', calculateCarbonFootprint);

// Electricity Cost Calculator (q-5)
function calculateElectricityCost() {
  const wattage = parseFloat(document.getElementById('applianceWattage').value);
  const hours = parseFloat(document.getElementById('hoursUsed').value);
  const rate = parseFloat(document.getElementById('electricityRate').value);
  
  if (wattage <= 0 || hours <= 0) {
    alert("Please enter valid values");
    return;
  }
  
  const kWh = (wattage * hours) / 1000;
  const dailyCost = kWh * rate;
  const monthlyCost = dailyCost * 30;
  const annualCost = dailyCost * 365;
  
  document.getElementById('dailyCost').textContent = `$${dailyCost.toFixed(2)}`;
  document.getElementById('monthlyCost').textContent = `$${monthlyCost.toFixed(2)}`;
  document.getElementById('annualCost').textContent = `$${annualCost.toFixed(2)}`;
}

function setApplianceValues(wattage, hours) {
  document.getElementById('applianceWattage').value = wattage;
  document.getElementById('hoursUsed').value = hours;
  calculateElectricityCost();
}

// Initialize Electricity Calculator
document.querySelector('.electricity-calculator button').addEventListener('click', calculateElectricityCost);














// Water Intake Calculator (r-1)
function calculateWater() {
  const weight = parseFloat(document.getElementById('waterWeight').value);
  const activity = parseFloat(document.getElementById('waterActivity').value);
  const water = (weight * 0.033 * activity).toFixed(1);
  
  document.getElementById('waterResult').innerHTML = `
    <p><strong>Recommended Daily Water Intake:</strong> ${water} liters</p>
    <p>This is approximately ${Math.round(water * 4.2)} 8-oz glasses per day</p>
  `;
}

// Macro Calculator (r-2)
function calculateMacros() {
  const goal = document.getElementById('macroGoal').value;
  const calories = parseFloat(document.getElementById('macroCalories').value);
  
  let protein, fat, carbs;
  
  if (goal === 'cut') {
    protein = (calories * 0.4) / 4;
    fat = (calories * 0.25) / 9;
    carbs = (calories * 0.35) / 4;
  } else if (goal === 'bulk') {
    protein = (calories * 0.3) / 4;
    fat = (calories * 0.25) / 9;
    carbs = (calories * 0.45) / 4;
  } else { // maintain
    protein = (calories * 0.3) / 4;
    fat = (calories * 0.3) / 9;
    carbs = (calories * 0.4) / 4;
  }
  
  document.getElementById('macroResult').innerHTML = `
    <p><strong>Macronutrient Breakdown:</strong></p>
    <p>Protein: ${protein.toFixed(1)}g (${Math.round(protein * 4 / calories * 100)}%)</p>
    <p>Fat: ${fat.toFixed(1)}g (${Math.round(fat * 9 / calories * 100)}%)</p>
    <p>Carbs: ${carbs.toFixed(1)}g (${Math.round(carbs * 4 / calories * 100)}%)</p>
  `;
}

// Ideal Weight Calculator (r-3)
function calculateIdealWeight() {
  const height = parseFloat(document.getElementById('idealHeight').value);
  const gender = document.getElementById('idealGender').value;
  
  let idealWeight;
  if (gender === 'male') {
    idealWeight = 50 + 0.9 * (height - 152);
  } else {
    idealWeight = 45.5 + 0.9 * (height - 152);
  }
  
  document.getElementById('idealWeightResult').innerHTML = `
    <p><strong>Ideal Weight Range:</strong> ${(idealWeight * 0.9).toFixed(1)}kg to ${(idealWeight * 1.1).toFixed(1)}kg</p>
    <p>For your height of ${height}cm</p>
  `;
}

// Running Pace Calculator (r-4)
function calculatePace() {
  const distance = parseFloat(document.getElementById('runDistance').value);
  const time = parseFloat(document.getElementById('runTime').value);
  
  const pace = time / distance;
  const paceMin = Math.floor(pace);
  const paceSec = Math.round((pace - paceMin) * 60);
  
  document.getElementById('paceResult').innerHTML = `
    <p><strong>Average Pace:</strong> ${paceMin}:${paceSec.toString().padStart(2, '0')} min/km</p>
    <p><strong>Speed:</strong> ${(60 / pace).toFixed(1)} km/h</p>
  `;
}

// Swimming Pool Volume Calculator (r-5)
function calculatePoolVolume() {
  const length = parseFloat(document.getElementById('poolLength').value);
  const width = parseFloat(document.getElementById('poolWidth').value);
  const depth = parseFloat(document.getElementById('poolDepth').value);
  
  const volume = length * width * depth * 1000; // in liters
  
  document.getElementById('poolResult').innerHTML = `
    <p><strong>Pool Volume:</strong> ${volume.toLocaleString()} liters</p>
    <p>Approximately ${Math.round(volume / 1000)} cubic meters</p>
  `;
}

// One Rep Max Calculator (r-6)
function calculateORM() {
  const weight = parseFloat(document.getElementById('ormWeight').value);
  const reps = parseFloat(document.getElementById('ormReps').value);
  
  // Using Epley formula
  const orm = weight * (1 + reps / 30);
  
  document.getElementById('ormResult').innerHTML = `
    <p><strong>Estimated 1RM:</strong> ${orm.toFixed(1)}kg</p>
    <p>For ${weight}kg × ${reps} reps</p>
  `;
}

// Pregnancy Weight Gain Calculator (r-7)
function calculatePregnancyWeight() {
  const weight = parseFloat(document.getElementById('prePregWeight').value);
  const height = parseFloat(document.getElementById('pregHeight').value);
  const week = parseFloat(document.getElementById('pregWeek').value);
  
  const bmi = weight / Math.pow(height / 100, 2);
  let totalGain;
  
  if (bmi < 18.5) {
    totalGain = 12.5 + (week / 40) * (28 - 12.5);
  } else if (bmi < 25) {
    totalGain = 11.5 + (week / 40) * (16 - 11.5);
  } else if (bmi < 30) {
    totalGain = 7 + (week / 40) * (11.5 - 7);
  } else {
    totalGain = 5 + (week / 40) * (9 - 5);
  }
  
  document.getElementById('pregWeightResult').innerHTML = `
    <p><strong>Recommended Weight Gain:</strong> ${totalGain.toFixed(1)}kg by week ${week}</p>
    <p>Based on pre-pregnancy BMI of ${bmi.toFixed(1)}</p>
  `;
}

// Waist-to-Hip Ratio Calculator (r-8)
function calculateWHR() {
  const waist = parseFloat(document.getElementById('waistSize').value);
  const hip = parseFloat(document.getElementById('hipSize').value);
  const gender = document.getElementById('whrGender').value;
  
  const ratio = (waist / hip).toFixed(2);
  let risk;
  
  if (gender === 'male') {
    risk = ratio < 0.9 ? 'Low' : ratio < 1.0 ? 'Moderate' : 'High';
  } else {
    risk = ratio < 0.8 ? 'Low' : ratio < 0.85 ? 'Moderate' : 'High';
  }
  
  document.getElementById('whrResult').innerHTML = `
    <p><strong>Waist-to-Hip Ratio:</strong> ${ratio}</p>
    <p><strong>Health Risk:</strong> ${risk}</p>
  `;
}

// TDEE Calculator (r-9)
function calculateTDEE() {
  const age = parseFloat(document.getElementById('tdeeAge').value);
  const gender = document.getElementById('tdeeGender').value;
  const weight = parseFloat(document.getElementById('tdeeWeight').value);
  const height = parseFloat(document.getElementById('tdeeHeight').value);
  const activity = parseFloat(document.getElementById('tdeeActivity').value);
  
  // Mifflin-St Jeor Equation
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  const tdee = bmr * activity;
  
  document.getElementById('tdeeResult').innerHTML = `
    <p><strong>Basal Metabolic Rate (BMR):</strong> ${bmr.toFixed(0)} calories/day</p>
    <p><strong>Total Daily Energy Expenditure (TDEE):</strong> ${tdee.toFixed(0)} calories/day</p>
  `;
}

// Heart Rate Zone Calculator (r-10)
function calculateHRZones() {
  const age = parseFloat(document.getElementById('hrAge').value);
  const resting = parseFloat(document.getElementById('hrResting').value);
  
  const maxHR = 220 - age;
  const reserve = maxHR - resting;
  
  const zones = {
    'Very Light': [resting + reserve * 0.5, resting + reserve * 0.6],
    'Light': [resting + reserve * 0.6, resting + reserve * 0.7],
    'Moderate': [resting + reserve * 0.7, resting + reserve * 0.8],
    'Hard': [resting + reserve * 0.8, resting + reserve * 0.9],
    'Maximum': [resting + reserve * 0.9, maxHR]
  };
  
  let resultHTML = '<p><strong>Heart Rate Zones:</strong></p>';
  for (const [zone, [min, max]] of Object.entries(zones)) {
    resultHTML += `<p>${zone}: ${Math.round(min)}-${Math.round(max)} bpm</p>`;
  }
  
  document.getElementById('hrZoneResult').innerHTML = resultHTML;
}

// Initialize all calculators
window.addEventListener('load', function() {
  calculateWater();
  calculateMacros();
  calculateIdealWeight();
  calculatePace();
  calculatePoolVolume();
  calculateORM();
  calculatePregnancyWeight();
  calculateWHR();
  calculateTDEE();
  calculateHRZones();
});












// CSS Minifier (s-1)
function minifyCSS() {
  const css = document.getElementById('cssInput').value;
  // Basic minification - remove comments, whitespace, etc.
  let minified = css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*([{};:,])\s*/g, '$1') // Remove space around special chars
    .replace(/;}/g, '}') // Remove last semicolon in rules
    .trim();
  
  document.getElementById('cssOutput').value = minified;
  
  const originalSize = new Blob([css]).size;
  const minifiedSize = new Blob([minified]).size;
  const savings = Math.round((1 - minifiedSize / originalSize) * 100);
  
  document.getElementById('cssStats').innerHTML = `
    <p>Original: ${originalSize} bytes | Minified: ${minifiedSize} bytes | Savings: ${savings}%</p>
  `;
}

function copyCSS() {
  const output = document.getElementById('cssOutput');
  output.select();
  document.execCommand('copy');
}

function downloadCSS() {
  const minified = document.getElementById('cssOutput').value;
  const blob = new Blob([minified], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'styles.min.css';
  a.click();
  URL.revokeObjectURL(url);
}

// HTML Validator (s-2)
function validateHTML() {
  const html = document.getElementById('htmlInput').value;
  const resultsDiv = document.getElementById('htmlResults');
  resultsDiv.innerHTML = '<p>Validating...</p>';
  
  // Client-side basic validation (note: this is limited compared to server-side validation)
  setTimeout(() => {
    let errors = [];
    let warnings = [];
    
    // Check for unclosed tags (basic check)
    const openTags = html.match(/<([a-z][a-z0-9]*)([^>]*)>/gi) || [];
    const closeTags = html.match(/<\/([a-z][a-z0-9]*)>/gi) || [];
    
    const tagCounts = {};
    openTags.forEach(tag => {
      const tagName = tag.match(/<([a-z][a-z0-9]*)/i)[1].toLowerCase();
      tagCounts[tagName] = (tagCounts[tagName] || 0) + 1;
    });
    
    closeTags.forEach(tag => {
      const tagName = tag.match(/<\/([a-z][a-z0-9]*)/i)[1].toLowerCase();
      tagCounts[tagName] = (tagCounts[tagName] || 0) - 1;
    });
    
    for (const tag in tagCounts) {
      if (tagCounts[tag] > 0) {
        errors.push(`Unclosed &lt;${tag}&gt; tag`);
      } else if (tagCounts[tag] < 0) {
        errors.push(`Closing tag &lt;/${tag}&gt; without opening tag`);
      }
    }
    
    // Check for common issues
    if (!html.match(/<!DOCTYPE html>/i)) {
      warnings.push("Missing &lt;!DOCTYPE html&gt; declaration");
    }
    
    if (!html.match(/<html[\s>]/i)) {
      warnings.push("Missing &lt;html&gt; tag");
    }
    
    if (!html.match(/<head[\s>]/i)) {
      warnings.push("Missing &lt;head&gt; tag");
    }
    
    if (!html.match(/<title[\s>]/i)) {
      warnings.push("Missing &lt;title&gt; tag");
    }
    
    if (!html.match(/<body[\s>]/i)) {
      warnings.push("Missing &lt;body&gt; tag");
    }
    
    // Display results
    let resultsHTML = '';
    if (errors.length === 0 && warnings.length === 0) {
      resultsHTML = '<p class="valid">HTML appears to be valid!</p>';
    } else {
      if (errors.length > 0) {
        resultsHTML += '<h4>Errors:</h4><ul>';
        errors.forEach(error => {
          resultsHTML += `<li>${error}</li>`;
        });
        resultsHTML += '</ul>';
      }
      
      if (warnings.length > 0) {
        resultsHTML += '<h4>Warnings:</h4><ul>';
        warnings.forEach(warning => {
          resultsHTML += `<li>${warning}</li>`;
        });
        resultsHTML += '</ul>';
      }
    }
    
    resultsDiv.innerHTML = resultsHTML;
  }, 500);
}

// Meta Tag Generator (s-3)
function generateMetaTags() {
  const title = document.getElementById('metaTitle').value;
  const description = document.getElementById('metaDescription').value;
  const keywords = document.getElementById('metaKeywords').value;
  const author = document.getElementById('metaAuthor').value;
  const viewport = document.getElementById('metaViewport').value;
  
  let metaTags = `<!-- Primary Meta Tags -->\n`;
  metaTags += `<title>${title}</title>\n`;
  metaTags += `<meta name="description" content="${description}">\n`;
  metaTags += `<meta name="keywords" content="${keywords}">\n`;
  metaTags += `<meta name="author" content="${author}">\n`;
  metaTags += `<meta name="viewport" content="${viewport}">\n\n`;
  
  metaTags += `<!-- Open Graph / Facebook -->\n`;
  metaTags += `<meta property="og:type" content="website">\n`;
  metaTags += `<meta property="og:title" content="${title}">\n`;
  metaTags += `<meta property="og:description" content="${description}">\n\n`;
  
  metaTags += `<!-- Twitter -->\n`;
  metaTags += `<meta name="twitter:card" content="summary">\n`;
  metaTags += `<meta name="twitter:title" content="${title}">\n`;
  metaTags += `<meta name="twitter:description" content="${description}">`;
  
  document.getElementById('metaOutput').value = metaTags;
}

function copyMetaTags() {
  const output = document.getElementById('metaOutput');
  output.select();
  document.execCommand('copy');
}

// Favicon Generator (Multiple Sizes) (s-4)
function generateFavicon() {
  const fileInput = document.getElementById('faviconUpload');
  const previewSize = parseInt(document.getElementById('faviconPreviewSize').value);
  
  if (fileInput.files.length === 0) {
    alert('Please select an image file first');
    return;
  }
  
  const file = fileInput.files[0];
  const reader = new FileReader();
  
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.getElementById('faviconCanvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = previewSize;
      canvas.height = previewSize;
      ctx.drawImage(img, 0, 0, previewSize, previewSize);
      
      // Generate HTML code for multiple sizes
      const sizes = [16, 32, 64, 128, 256];
      let htmlCode = '<!-- Favicon HTML -->\n';
      
      sizes.forEach(size => {
        htmlCode += `<link rel="icon" href="/favicon-${size}x${size}.png" sizes="${size}x${size}">\n`;
      });
      
      htmlCode += '\n<!-- Apple Touch Icon -->\n';
      htmlCode += `<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n`;
      
      htmlCode += '\n<!-- Web Manifest -->\n';
      htmlCode += `<link rel="manifest" href="/site.webmanifest">`;
      
      document.getElementById('faviconCode').value = htmlCode;
      
      // Show available sizes
      let sizesHTML = '<p>Recommended sizes:</p><ul>';
      sizes.forEach(size => {
        sizesHTML += `<li>${size}x${size}</li>`;
      });
      sizesHTML += '</ul>';
      document.getElementById('faviconSizes').innerHTML = sizesHTML;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function copyFaviconCode() {
  const output = document.getElementById('faviconCode');
  output.select();
  document.execCommand('copy');
}

// Robots.txt Generator (s-5)
function generateRobotsTxt() {
  const sitemap = document.getElementById('sitemapUrl').value;
  const disallowed = document.getElementById('disallowedPaths').value;
  const delay = document.getElementById('crawlDelay').value;
  
  let robots = '# Robots.txt generated by tool\n';
  robots += 'User-agent: *\n';
  
  if (disallowed) {
    const paths = disallowed.split('\n');
    paths.forEach(path => {
      if (path.trim()) {
        robots += `Disallow: ${path.trim()}\n`;
      }
    });
  }
  
  if (delay > 0) {
    robots += `Crawl-delay: ${delay}\n`;
  }
  
  if (sitemap) {
    robots += `\nSitemap: ${sitemap.trim()}\n`;
  }
  
  document.getElementById('robotsOutput').value = robots;
}

function copyRobotsTxt() {
  const output = document.getElementById('robotsOutput');
  output.select();
  document.execCommand('copy');
}

function downloadRobotsTxt() {
  const robots = document.getElementById('robotsOutput').value;
  const blob = new Blob([robots], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'robots.txt';
  a.click();
  URL.revokeObjectURL(url);
}

// .htaccess Generator (s-6)
function generateHtaccess() {
  let htaccess = '# .htaccess generated by tool\n\n';
  
  if (document.getElementById('htRewrite').checked) {
    htaccess += '# Enable URL rewriting\n';
    htaccess += 'RewriteEngine On\n';
    htaccess += 'RewriteCond %{REQUEST_FILENAME} !-f\n';
    htaccess += 'RewriteCond %{REQUEST_FILENAME} !-d\n';
    htaccess += 'RewriteRule ^(.*)$ index.php?url=$1 [QSA,L]\n\n';
  }
  
  if (document.getElementById('htGzip').checked) {
    htaccess += '# Enable GZIP compression\n';
    htaccess += '<IfModule mod_deflate.c>\n';
    htaccess += '  AddOutputFilterByType DEFLATE text/html\n';
    htaccess += '  AddOutputFilterByType DEFLATE text/css\n';
    htaccess += '  AddOutputFilterByType DEFLATE text/javascript\n';
    htaccess += '  AddOutputFilterByType DEFLATE application/javascript\n';
    htaccess += '  AddOutputFilterByType DEFLATE application/json\n';
    htaccess += '</IfModule>\n\n';
  }
  
  if (document.getElementById('htCaching').checked) {
    htaccess += '# Enable browser caching\n';
    htaccess += '<IfModule mod_expires.c>\n';
    htaccess += '  ExpiresActive On\n';
    htaccess += '  ExpiresByType image/jpg "access plus 1 year"\n';
    htaccess += '  ExpiresByType image/jpeg "access plus 1 year"\n';
    htaccess += '  ExpiresByType image/gif "access plus 1 year"\n';
    htaccess += '  ExpiresByType image/png "access plus 1 year"\n';
    htaccess += '  ExpiresByType text/css "access plus 1 month"\n';
    htaccess += '  ExpiresByType application/pdf "access plus 1 month"\n';
    htaccess += '  ExpiresByType text/javascript "access plus 1 month"\n';
    htaccess += '  ExpiresByType application/javascript "access plus 1 month"\n';
    htaccess += '  ExpiresDefault "access plus 2 days"\n';
    htaccess += '</IfModule>\n\n';
  }
  
  if (document.getElementById('htWWW').checked) {
    htaccess += '# Force WWW\n';
    htaccess += 'RewriteCond %{HTTP_HOST} !^www\. [NC]\n';
    htaccess += 'RewriteRule ^(.*)$ http://www.%{HTTP_HOST}/$1 [R=301,L]\n\n';
  }
  
  if (document.getElementById('htHTTPS').checked) {
    htaccess += '# Force HTTPS\n';
    htaccess += 'RewriteCond %{HTTPS} off\n';
    htaccess += 'RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]\n\n';
  }
  
  if (document.getElementById('htErrorDocs').checked) {
    htaccess += '# Custom Error Documents\n';
    htaccess += 'ErrorDocument 400 /errors/400.html\n';
    htaccess += 'ErrorDocument 401 /errors/401.html\n';
    htaccess += 'ErrorDocument 403 /errors/403.html\n';
    htaccess += 'ErrorDocument 404 /errors/404.html\n';
    htaccess += 'ErrorDocument 500 /errors/500.html\n';
  }
  
  document.getElementById('htaccessOutput').value = htaccess;
}

function copyHtaccess() {
  const output = document.getElementById('htaccessOutput');
  output.select();
  document.execCommand('copy');
}

function downloadHtaccess() {
  const htaccess = document.getElementById('htaccessOutput').value;
  const blob = new Blob([htaccess], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '.htaccess';
  a.click();
  URL.revokeObjectURL(url);
}

// SVG Optimizer (s-7)
function optimizeSVG() {
  const fileInput = document.getElementById('svgUpload');
  
  if (fileInput.files.length === 0) {
    alert('Please select an SVG file first');
    return;
  }
  
  const file = fileInput.files[0];
  const reader = new FileReader();
  
  reader.onload = function(e) {
    let svg = e.target.result;
    const originalSize = new Blob([svg]).size;
    
    // Store original for preview
    document.getElementById('svgOriginalPreview').innerHTML = svg;
    
    // Apply optimizations
    if (document.getElementById('svgRemoveComments').checked) {
      svg = svg.replace(/<!--[\s\S]*?-->/g, '');
    }
    
    if (document.getElementById('svgRemoveMetadata').checked) {
      svg = svg.replace(/<metadata>[\s\S]*?<\/metadata>/g, '');
    }
    
    if (document.getElementById('svgRemoveTitle').checked) {
      svg = svg.replace(/<title>[\s\S]*?<\/title>/g, '');
    }
    
    if (document.getElementById('svgRemoveDesc').checked) {
      svg = svg.replace(/<desc>[\s\S]*?<\/desc>/g, '');
    }
    
    if (document.getElementById('svgPrecision').checked) {
      svg = svg.replace(/(\d+\.\d{3,})(?=[^\d]|$)/g, function(match) {
        return parseFloat(match).toFixed(2);
      });
    }
    
    // Collapse whitespace
    svg = svg.replace(/\s+/g, ' ');
    svg = svg.replace(/>\s+</g, '><');
    
    document.getElementById('svgOutput').value = svg;
    document.getElementById('svgOptimizedPreview').innerHTML = svg;
    
    const optimizedSize = new Blob([svg]).size;
    const savings = Math.round((1 - optimizedSize / originalSize) * 100);
    
    document.getElementById('svgStats').innerHTML = `
      <p>Original: ${originalSize} bytes | Optimized: ${optimizedSize} bytes | Savings: ${savings}%</p>
    `;
  };
  reader.readAsText(file);
}

function copySVG() {
  const output = document.getElementById('svgOutput');
  output.select();
  document.execCommand('copy');
}

function downloadSVG() {
  const svg = document.getElementById('svgOutput').value;
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'optimized.svg';
  a.click();
  URL.revokeObjectURL(url);
}

// CanIUse Embed Generator (s-8)
function generateCanIUseEmbed() {
  const feature = document.getElementById('caniuseFeature').value.trim();
  const periods = document.getElementById('caniusePeriods').value.trim();
  const width = document.getElementById('caniuseWidth').value;
  
  if (!feature) {
    alert('Please enter a feature');
    return;
  }
  
  const embedCode = `<p class="ciu_embed" data-feature="${feature}" data-periods="${periods || 'future_1,current,past_1,past_2'}" data-accessible-colours="false" style="width: ${width}px">
  <a href="https://caniuse.com/#feat=${feature}">Can I Use ${feature}?</a> Data on support for the ${feature} feature across the major browsers from caniuse.com.
</p>`

  
  document.getElementById('caniuseOutput').value = embedCode;
  document.getElementById('caniusePreview').innerHTML = embedCode;
}

function copyCanIUseEmbed() {
  const output = document.getElementById('caniuseOutput');
  output.select();
  document.execCommand('copy');
}

// Open Graph Meta Generator (s-9)
function generateOpenGraph() {
  const title = document.getElementById('ogTitle').value;
  const description = document.getElementById('ogDescription').value;
  const url = document.getElementById('ogUrl').value;
  const image = document.getElementById('ogImage').value;
  const siteName = document.getElementById('ogSiteName').value;
  const type = document.getElementById('ogType').value;
  
  let metaTags = `<!-- Open Graph / Facebook -->\n`;
  metaTags += `<meta property="og:type" content="${type}">\n`;
  metaTags += `<meta property="og:title" content="${title}">\n`;
  metaTags += `<meta property="og:description" content="${description}">\n`;
  metaTags += `<meta property="og:url" content="${url}">\n`;
  metaTags += `<meta property="og:image" content="${image}">\n`;
  metaTags += `<meta property="og:site_name" content="${siteName}">\n`;
  
  // Additional tags based on type
  if (type === 'article') {
    metaTags += `<meta property="article:published_time" content="${new Date().toISOString()}">\n`;
    metaTags += `<meta property="article:author" content="Author Name">\n`;
  }
  
  document.getElementById('ogOutput').value = metaTags;
}

function copyOpenGraph() {
  const output = document.getElementById('ogOutput');
  output.select();
  document.execCommand('copy');
}

// Twitter Card Generator (s-10)
function generateTwitterCard() {
  const cardType = document.getElementById('twitterCardType').value;
  const title = document.getElementById('twitterTitle').value;
  const description = document.getElementById('twitterDescription').value;
  const image = document.getElementById('twitterImage').value;
  const site = document.getElementById('twitterSite').value;
  const creator = document.getElementById('twitterCreator').value;
  
  let metaTags = `<!-- Twitter Card -->\n`;
  metaTags += `<meta name="twitter:card" content="${cardType}">\n`;
  metaTags += `<meta name="twitter:title" content="${title}">\n`;
  metaTags += `<meta name="twitter:description" content="${description}">\n`;
  metaTags += `<meta name="twitter:image" content="${image}">\n`;
  
  if (site) {
    metaTags += `<meta name="twitter:site" content="${site}">\n`;
  }
  
  if (creator) {
    metaTags += `<meta name="twitter:creator" content="${creator}">\n`;
  }
  
  document.getElementById('twitterOutput').value = metaTags;
}

function copyTwitterCard() {
  const output = document.getElementById('twitterOutput');
  output.select();
  document.execCommand('copy');
}












// Periodic Table Explorer (u-1)
const elements = [
  { symbol: "H", name: "Hydrogen", atomicNumber: 1, mass: 1.008, category: "diatomic-nonmetal" },
  { symbol: "He", name: "Helium", atomicNumber: 2, mass: 4.0026, category: "noble-gas" },
  // More elements would be added here...
  { symbol: "C", name: "Carbon", atomicNumber: 6, mass: 12.011, category: "polyatomic-nonmetal" },
  { symbol: "O", name: "Oxygen", atomicNumber: 8, mass: 15.999, category: "diatomic-nonmetal" },
  { symbol: "Fe", name: "Iron", atomicNumber: 26, mass: 55.845, category: "transition-metal" }
];

function renderPeriodicTable() {
  const table = document.getElementById('periodicTable');
  table.innerHTML = '';
  
  elements.forEach(element => {
    const elementBox = document.createElement('div');
    elementBox.className = `element-box ${element.category}`;
    elementBox.innerHTML = `
      <div class="element-symbol">${element.symbol}</div>
      <div class="element-number">${element.atomicNumber}</div>
    `;
    elementBox.addEventListener('click', () => showElementDetails(element));
    table.appendChild(elementBox);
  });
}

function showElementDetails(element) {
  const details = document.getElementById('elementDetails');
  details.innerHTML = `
    <h3>${element.name} (${element.symbol})</h3>
    <p><strong>Atomic Number:</strong> ${element.atomicNumber}</p>
    <p><strong>Atomic Mass:</strong> ${element.mass} u</p>
    <p><strong>Category:</strong> ${element.category.replace('-', ' ')}</p>
  `;
}

// Chemical Equation Balancer (u-2)
function balanceEquation() {
  const reactants = document.getElementById('reactantsInput').value;
  const products = document.getElementById('productsInput').value;
  
  // Simple simulation - real implementation would require equation parsing
  document.getElementById('equationResult').innerHTML = `
    <p><strong>Balanced Equation:</strong></p>
    <p>${reactants || 'Reactants'} → ${products || 'Products'}</p>
    <p class="equation-note">Note: This is a simulation. Real balancing requires more complex algorithms.</p>
  `;
}

// Geometry Calculator (u-3)
document.getElementById('shapeSelect').addEventListener('change', function() {
  const shape = this.value;
  const inputs = document.getElementById('shapeInputs');
  inputs.innerHTML = '';
  
  switch(shape) {
    case 'circle':
      inputs.innerHTML = '<input class="tool-input" type="number" id="radius" placeholder="Radius">';
      break;
    case 'triangle':
      inputs.innerHTML = `
        <input class="tool-input" type="number" id="base" placeholder="Base">
        <input class="tool-input" type="number" id="height" placeholder="Height">
      `;
      break;
    case 'rectangle':
      inputs.innerHTML = `
        <input class="tool-input" type="number" id="length" placeholder="Length">
        <input class="tool-input" type="number" id="width" placeholder="Width">
      `;
      break;
    case 'sphere':
      inputs.innerHTML = '<input class="tool-input" type="number" id="sphereRadius" placeholder="Radius">';
      break;
  }
});

function calculateGeometry() {
  const shape = document.getElementById('shapeSelect').value;
  let result = '';
  
  switch(shape) {
    case 'circle':
      const radius = parseFloat(document.getElementById('radius').value);
      if (!isNaN(radius)) {
        const area = Math.PI * radius * radius;
        const circumference = 2 * Math.PI * radius;
        result = `<p><strong>Area:</strong> ${area.toFixed(2)}</p><p><strong>Circumference:</strong> ${circumference.toFixed(2)}</p>`;
      }
      break;
    case 'triangle':
      const base = parseFloat(document.getElementById('base').value);
      const height = parseFloat(document.getElementById('height').value);
      if (!isNaN(base) && !isNaN(height)) {
        const area = 0.5 * base * height;
        result = `<p><strong>Area:</strong> ${area.toFixed(2)}</p>`;
      }
      break;
    case 'rectangle':
      const length = parseFloat(document.getElementById('length').value);
      const width = parseFloat(document.getElementById('width').value);
      if (!isNaN(length) && !isNaN(width)) {
        const area = length * width;
        const perimeter = 2 * (length + width);
        result = `<p><strong>Area:</strong> ${area.toFixed(2)}</p><p><strong>Perimeter:</strong> ${perimeter.toFixed(2)}</p>`;
      }
      break;
    case 'sphere':
      const sphereRadius = parseFloat(document.getElementById('sphereRadius').value);
      if (!isNaN(sphereRadius)) {
        const volume = (4/3) * Math.PI * Math.pow(sphereRadius, 3);
        const surfaceArea = 4 * Math.PI * Math.pow(sphereRadius, 2);
        result = `<p><strong>Volume:</strong> ${volume.toFixed(2)}</p><p><strong>Surface Area:</strong> ${surfaceArea.toFixed(2)}</p>`;
      }
      break;
  }
  
  document.getElementById('geometryResult').innerHTML = result || '<p>Please enter valid dimensions</p>';
}

// Unit Circle Explorer (u-4)
document.getElementById('angleSlider').addEventListener('input', function() {
  const angle = parseInt(this.value);
  document.getElementById('angleValue').textContent = `${angle}°`;
  updateUnitCircle(angle);
});

function updateUnitCircle(angle) {
  const radians = angle * Math.PI / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  
  document.getElementById('trigValues').innerHTML = `
    <p><strong>sin(${angle}°):</strong> ${sin.toFixed(4)}</p>
    <p><strong>cos(${angle}°):</strong> ${cos.toFixed(4)}</p>
    <p><strong>tan(${angle}°):</strong> ${Math.tan(radians).toFixed(4)}</p>
  `;
  
  // Visual representation would be implemented with canvas in a real implementation
}

// Trig Identities Reference (u-5)
const identities = {
  pythagorean: [
    "sin²θ + cos²θ = 1",
    "1 + tan²θ = sec²θ",
    "1 + cot²θ = csc²θ"
  ],
  angleSum: [
    "sin(A+B) = sinAcosB + cosAsinB",
    "cos(A+B) = cosAcosB - sinAsinB",
    "tan(A+B) = (tanA + tanB)/(1 - tanAtanB)"
  ],
  doubleAngle: [
    "sin(2θ) = 2sinθcosθ",
    "cos(2θ) = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ",
    "tan(2θ) = 2tanθ/(1 - tan²θ)"
  ],
  halfAngle: [
    "sin(θ/2) = ±√((1 - cosθ)/2)",
    "cos(θ/2) = ±√((1 + cosθ)/2)",
    "tan(θ/2) = ±√((1 - cosθ)/(1 + cosθ)) = (1 - cosθ)/sinθ = sinθ/(1 + cosθ)"
  ]
};

document.getElementById('identityCategory').addEventListener('change', function() {
  const category = this.value;
  const display = document.getElementById('identityDisplay');
  display.innerHTML = '<ul>' + identities[category].map(id => `<li>${id}</li>`).join('') + '</ul>';
});

// Initialize identity display
document.getElementById('identityCategory').dispatchEvent(new Event('change'));

// Derivative Calculator (u-6)
function calculateDerivative() {
  const func = document.getElementById('functionInput').value;
  if (!func) return;
  
  // Simple simulation - real implementation would require expression parsing
  document.getElementById('derivativeResult').innerHTML = `
    <p><strong>Function:</strong> f(x) = ${func}</p>
    <p><strong>Derivative:</strong> f'(x) = ${func.replace('x^2', '2x').replace('x', '1')}</p>
    <p class="derivative-note">Note: This is a simulation. Real derivatives require more complex parsing.</p>
  `;
}

// Integral Calculator (u-7)
function calculateIntegral() {
  const func = document.getElementById('integralFunction').value;
  const lower = parseFloat(document.getElementById('lowerLimit').value);
  const upper = parseFloat(document.getElementById('upperLimit').value);
  
  if (!func) return;
  
  // Simple simulation
  let result = `<p><strong>Function:</strong> f(x) = ${func}</p>`;
  
  if (!isNaN(lower) && !isNaN(upper)) {
    result += `<p><strong>Definite Integral:</strong> ∫${func} dx from ${lower} to ${upper} ≈ ${(upper*upper - lower*lower).toFixed(2)}</p>`;
  } else {
    result += `<p><strong>Indefinite Integral:</strong> ∫${func} dx = ${func.replace('x', 'x²/2')} + C</p>`;
  }
  
  result += `<p class="integral-note">Note: This is a simulation. Real integrals require more complex parsing.</p>`;
  document.getElementById('integralResult').innerHTML = result;
}

// Truth Table Generator (u-8)
function generateTruthTable() {
  const expression = document.getElementById('logicalExpression').value;
  if (!expression) return;
  
  // Simple simulation
  document.getElementById('truthTableResult').innerHTML = `
    <table class="truth-table">
      <tr><th>A</th><th>B</th><th>C</th><th>Result</th></tr>
      <tr><td>T</td><td>T</td><td>T</td><td>T</td></tr>
      <tr><td>T</td><td>T</td><td>F</td><td>F</td></tr>
      <tr><td>T</td><td>F</td><td>T</td><td>T</td></tr>
      <tr><td>T</td><td>F</td><td>F</td><td>F</td></tr>
      <tr><td>F</td><td>T</td><td>T</td><td>T</td></tr>
      <tr><td>F</td><td>T</td><td>F</td><td>F</td></tr>
      <tr><td>F</td><td>F</td><td>T</td><td>T</td></tr>
      <tr><td>F</td><td>F</td><td>F</td><td>F</td></tr>
    </table>
    <p class="truth-table-note">Note: This is a sample table. Real implementation would parse the expression.</p>
  `;
}

// Venn Diagram Generator (u-9)
document.getElementById('vennType').addEventListener('change', function() {
  const type = parseInt(this.value);
  const inputs = document.getElementById('vennInputs');
  
  inputs.innerHTML = `
    <input class="tool-input" type="text" id="setA" placeholder="Set A items (comma separated)">
    <input class="tool-input" type="text" id="setB" placeholder="Set B items (comma separated)">
    ${type === 3 ? '<input class="tool-input" type="text" id="setC" placeholder="Set C items (comma separated)">' : ''}
  `;
});

function generateVennDiagram() {
  const type = parseInt(document.getElementById('vennType').value);
  const setA = document.getElementById('setA').value.split(',').map(item => item.trim());
  const setB = document.getElementById('setB').value.split(',').map(item => item.trim());
  const setC = type === 3 ? document.getElementById('setC').value.split(',').map(item => item.trim()) : [];
  
  // Visual representation would be implemented with canvas in a real implementation
  document.getElementById('vennDisplay').innerHTML = `
    <p>Venn Diagram for ${type} sets would be displayed here.</p>
    <p>Set A: ${setA.join(', ')}</p>
    <p>Set B: ${setB.join(', ')}</p>
    ${type === 3 ? `<p>Set C: ${setC.join(', ')}</p>` : ''}
  `;
}

// Resistor Color Code Calculator (u-10)
const resistorColors = [
  { color: "black", value: 0, multiplier: 1 },
  { color: "brown", value: 1, multiplier: 10 },
  { color: "red", value: 2, multiplier: 100 },
  // More colors would be added...
  { color: "gold", value: null, multiplier: 0.1, tolerance: "5%" },
  { color: "silver", value: null, multiplier: 0.01, tolerance: "10%" }
];

document.getElementById('resistorMode').addEventListener('change', function() {
  const mode = this.value;
  const inputs = document.getElementById('resistorInputs');
  
  if (mode === 'codeToValue') {
    inputs.innerHTML = `
      <select class="tool-select" id="band1">
        <option value="">1st Band</option>
        ${resistorColors.filter(c => c.value !== null).map(c => `<option value="${c.value}">${c.color}</option>`).join('')}
      </select>
      <select class="tool-select" id="band2">
        <option value="">2nd Band</option>
        ${resistorColors.filter(c => c.value !== null).map(c => `<option value="${c.value}">${c.color}</option>`).join('')}
      </select>
      <select class="tool-select" id="multiplier">
        <option value="">Multiplier</option>
        ${resistorColors.map(c => `<option value="${c.multiplier}">${c.color}</option>`).join('')}
      </select>
    `;
  } else {
    inputs.innerHTML = '<input class="tool-input" type="number" id="resistorValue" placeholder="Resistance value (ohms)">';
  }
});

function calculateResistor() {
  const mode = document.getElementById('resistorMode').value;
  
  if (mode === 'codeToValue') {
    const band1 = document.getElementById('band1').value;
    const band2 = document.getElementById('band2').value;
    const multiplier = document.getElementById('multiplier').value;
    
    if (band1 && band2 && multiplier) {
      const value = parseInt(band1 + band2) * parseFloat(multiplier);
      document.getElementById('resistorResult').innerHTML = `
        <p><strong>Resistance:</strong> ${value} ohms</p>
      `;
    }
  } else {
    const value = document.getElementById('resistorValue').value;
    if (value) {
      document.getElementById('resistorResult').innerHTML = `
        <p><strong>Color Code:</strong> Would display color bands for ${value} ohms</p>
      `;
    }
  }
}

// Initialize tools
renderPeriodicTable();
document.getElementById('resistorMode').dispatchEvent(new Event('change'));
document.getElementById('vennType').dispatchEvent(new Event('change'));














// Haiku Generator (v-1)
const haikuThemes = {
  nature: [
    ["Autumn moonlight", "Cherry blossoms fall", "Morning dew glistens"],
    ["Winter's first snow", "Mountains stand silent", "Rivers keep flowing"],
    ["Summer cicadas", "Singing in the hot sun", "Shadows grow longer"]
  ],
  love: [
    ["Your gentle smile", "Warms my heart like sunshine", "Forever with you"],
    ["Hands intertwined", "Whispered words soft and sweet", "Hearts beat as one"],
    ["Distance between us", "Fades when I hear your voice", "Love knows no bounds"]
  ],
  seasons: [
    ["Spring's first flower", "Blooms despite the cold wind", "Hope springs anew"],
    ["Summer night breeze", "Carries children's laughter", "Fireflies dance"],
    ["Autumn leaves fall", "Crisp air and golden light", "Harvest moon glows"]
  ],
  urban: [
    ["Neon lights glow", "City never sleeps tonight", "Taxi horns blare"],
    ["Concrete canyons", "People rushing everywhere", "Lonely in crowds"],
    ["Subway rumbles", "Underground world moving", "Eyes never meet"]
  ]
};

function generateHaiku() {
  const theme = document.getElementById('haikuTheme').value;
  let haiku;
  
  if (theme === 'random') {
    const allThemes = Object.values(haikuThemes);
    const randomTheme = allThemes[Math.floor(Math.random() * allThemes.length)];
    haiku = randomTheme[Math.floor(Math.random() * randomTheme.length)];
  } else {
    const themeHaikus = haikuThemes[theme];
    haiku = themeHaikus[Math.floor(Math.random() * themeHaikus.length)];
  }
  
  const lines = document.querySelectorAll('.haiku-line');
  lines.forEach((line, index) => {
    line.textContent = haiku[index];
  });
}

function copyHaiku() {
  const lines = Array.from(document.querySelectorAll('.haiku-line'))
    .map(line => line.textContent)
    .join('\n');
  
  navigator.clipboard.writeText(lines)
    .then(() => alert('Haiku copied to clipboard!'))
    .catch(err => console.error('Failed to copy:', err));
}

// Initialize haiku
generateHaiku();

// Blackout Poetry Creator (v-2)
function setupBlackoutText() {
  const text = document.getElementById('blackoutText').value;
  const preview = document.getElementById('blackoutPreview');
  preview.innerHTML = '';
  
  const words = text.split(/\s+/);
  words.forEach(word => {
    const span = document.createElement('span');
    span.textContent = word + ' ';
    span.addEventListener('click', function() {
      this.classList.toggle('selected-word');
    });
    preview.appendChild(span);
  });
}

function resetBlackout() {
  document.getElementById('blackoutText').value = 'Enter or paste text here to create your blackout poetry. Select words you want to keep by clicking on them.';
  setupBlackoutText();
}

function downloadBlackout() {
  const preview = document.getElementById('blackoutPreview');
  const textColor = document.getElementById('blackoutTextColor').value;
  const bgColor = document.getElementById('blackoutBgColor').value;
  
  // Create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = preview.offsetWidth;
  canvas.height = preview.offsetHeight;
  
  // Draw background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw selected text
  ctx.fillStyle = textColor;
  ctx.font = '16px Arial';
  let x = 10, y = 20;
  
  const selectedWords = Array.from(preview.querySelectorAll('.selected-word'));
  if (selectedWords.length === 0) {
    alert('Please select words to keep by clicking on them');
    return;
  }
  
  selectedWords.forEach(word => {
    const wordWidth = ctx.measureText(word.textContent).width;
    if (x + wordWidth > canvas.width - 10) {
      x = 10;
      y += 20;
    }
    ctx.fillText(word.textContent, x, y);
    x += wordWidth;
  });
  
  // Download
  const link = document.createElement('a');
  link.download = 'blackout-poetry.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Initialize blackout poetry
document.getElementById('blackoutText').addEventListener('input', setupBlackoutText);
setupBlackoutText();

// Chord Progression Generator (v-3)
const chordProgressions = {
  pop: [
    ['I', 'V', 'vi', 'IV'],
    ['vi', 'IV', 'I', 'V'],
    ['I', 'vi', 'IV', 'V']
  ],
  rock: [
    ['I', 'IV', 'V', 'IV'],
    ['I', 'bIII', 'IV', 'I'],
    ['I', 'V', 'vi', 'iii', 'IV']
  ],
  jazz: [
    ['ii', 'V', 'I', 'vi'],
    ['I', 'vi', 'ii', 'V'],
    ['iii', 'vi', 'ii', 'V', 'I']
  ],
  blues: [
    ['I', 'I', 'I', 'I', 'IV', 'IV', 'I', 'I', 'V', 'IV', 'I', 'V'],
    ['I', 'IV', 'I', 'V'],
    ['I', 'IV', 'V', 'IV']
  ],
  classical: [
    ['I', 'IV', 'V', 'I'],
    ['I', 'vi', 'IV', 'V'],
    ['I', 'ii', 'V', 'I']
  ]
};

const chordShapes = {
  major: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  minor: ['Cm', 'Dm', 'Em', 'Fm', 'Gm', 'Am', 'Bm'],
  blues: ['C7', 'D7', 'E7', 'F7', 'G7', 'A7', 'B7'],
  pentatonic: ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5']
};

function generateChords() {
  const key = document.getElementById('chordKey').value;
  const scale = document.getElementById('chordScale').value;
  const style = document.getElementById('chordStyle').value;
  
  // Get progression pattern
  const patterns = chordProgressions[style];
  const pattern = patterns[Math.floor(Math.random() * patterns.length)];
  
  // Convert to actual chords
  const keyIndex = chordShapes.major.indexOf(key);
  const chords = pattern.map(roman => {
    let chordIndex;
    switch(roman) {
      case 'I': chordIndex = 0; break;
      case 'ii': chordIndex = 1; break;
      case 'iii': chordIndex = 2; break;
      case 'IV': chordIndex = 3; break;
      case 'V': chordIndex = 4; break;
      case 'vi': chordIndex = 5; break;
      case 'bIII': chordIndex = 2; break;
      default: chordIndex = 0;
    }
    
    const actualIndex = (keyIndex + chordIndex) % 7;
    return chordShapes[scale][actualIndex];
  });
  
  // Display progression
  document.getElementById('chordProgression').textContent = chords.join(' - ');
  
  // Simple chord diagram (placeholder)
  document.getElementById('chordDiagram').innerHTML = `
    <p>Try these chords:</p>
    <div class="chord-shapes">${chords.map(c => `<span>${c}</span>`).join('')}</div>
  `;
}

// Initialize chords
generateChords();

// Rhyme Finder (v-4)
const rhymes = {
  love: ["dove", "glove", "above", "shove"],
  cat: ["hat", "mat", "bat", "flat"],
  sun: ["fun", "run", "bun", "done"],
  tree: ["free", "see", "flee", "knee"],
  blue: ["clue", "shoe", "true", "view"]
};

function findRhymes() {
  const word = document.getElementById('rhymeWord').value.toLowerCase();
  const type = document.getElementById('rhymeType').value;
  
  let results = [];
  if (rhymes[word]) {
    results = rhymes[word];
  } else {
    // Fallback for words not in our small dictionary
    results = ["No rhymes found in our limited dictionary. Try: love, cat, sun, tree, blue"];
  }
  
  document.getElementById('rhymeResults').innerHTML = `
    <p>Rhymes for <strong>${word}</strong>:</p>
    <div class="rhyme-words">${results.map(r => `<span>${r}</span>`).join('')}</div>
  `;
}

// Initialize rhymes
findRhymes();

// Story Plot Generator (v-5)
const storyPlots = {
  fantasy: [
    "A young farmhand discovers they are the last descendant of an ancient royal line and must reclaim their throne from a dark sorcerer.",
    "A group of adventurers is hired to retrieve a magical artifact from a dungeon, but they soon discover the artifact has a mind of its own.",
    "A wizard's apprentice accidentally unleashes a powerful demon and must find a way to banish it before it destroys their village."
  ],
  scifi: [
    "A space explorer wakes from cryosleep to find their ship adrift and the crew missing, with only cryptic messages left behind.",
    "In a future where emotions are regulated by the government, a rebel discovers a way to break free from the system.",
    "An AI designed to manage a space station becomes self-aware and must decide whether to help or hinder the human crew."
  ],
  mystery: [
    "A detective with a perfect record takes on a case that seems impossible - a murder in a locked room with no suspects.",
    "A journalist investigating a series of disappearances uncovers a secret society with ties to the town's founding families.",
    "A lawyer defending a client accused of murder begins to suspect their client might actually be guilty."
  ],
  romance: [
    "Two rival chefs are forced to work together in a cooking competition, but the heat in the kitchen isn't just from the stoves.",
    "A romance novelist who doesn't believe in love finds themselves falling for the subject of their latest book.",
    "After a mix-up at the airport, two strangers end up sharing a honeymoon suite and pretending to be married."
  ],
  horror: [
    "A family moves into their dream home, only to discover it was the site of a gruesome murder - and the killer might still be around.",
    "A group of friends on a camping trip find an abandoned cabin in the woods, and something inside is watching them.",
    "A journalist investigating urban legends discovers that one of them might be terrifyingly real."
  ]
};

function generatePlot() {
  const genre = document.getElementById('plotGenre').value;
  const complexity = document.getElementById('plotComplexity').value;
  
  let plot = storyPlots[genre][Math.floor(Math.random() * storyPlots[genre].length)];
  
  if (complexity === 'simple') {
    plot = plot.split('.')[0] + ".";
  } else if (complexity === 'complex') {
    plot += " Along the way, they must confront their own inner demons and make difficult choices.";
  }
  
  document.getElementById('plotResult').textContent = plot;
}

// Initialize plot
generatePlot();

// Band Name Generator (v-6)
const bandNameParts = {
  adjectives: ["Crimson", "Electric", "Frozen", "Lunar", "Atomic", "Neon", "Velvet", "Cosmic", "Rebel", "Silent"],
  nouns: ["Dragons", "Hearts", "Wolves", "Machines", "Stones", "Echoes", "Shadows", "Flames", "Tides", "Storms"],
  suffixes: ["X", "69", "Inc.", "Ltd.", "Band", "Collective", "Experience", "Project", "Syndicate", "Underground"]
};

function generateBandName() {
  const style = document.getElementById('bandStyle').value;
  const vibe = document.getElementById('bandVibe').value;
  
  let names = [];
  for (let i = 0; i < 5; i++) {
    const adj = bandNameParts.adjectives[Math.floor(Math.random() * bandNameParts.adjectives.length)];
    const noun = bandNameParts.nouns[Math.floor(Math.random() * bandNameParts.nouns.length)];
    const suffix = Math.random() > 0.7 ? ' ' + bandNameParts.suffixes[Math.floor(Math.random() * bandNameParts.suffixes.length)] : '';
    
    let name;
    if (style === 'electronic' && vibe === 'abstract') {
      name = adj.slice(0, 3) + noun.slice(0, 3) + suffix;
    } else if (style === 'punk' && vibe === 'edgy') {
      name = `The ${adj} ${noun}`;
    } else {
      name = `${adj} ${noun}${suffix}`;
    }
    
    names.push(name);
  }
  
  document.getElementById('bandNameResults').innerHTML = names.map(n => `<div>${n}</div>`).join('');
}

// Initialize band names
generateBandName();

// Movie Title Generator (v-7)
const movieTitleParts = {
  first: ["The Last", "Eternal", "Midnight", "Silent", "Forgotten", "Secret", "Lost", "Dark", "Final", "Bloody"],
  second: ["Promise", "Whisper", "Journey", "Legacy", "Memory", "Shadow", "Dream", "Hour", "Reckoning", "Sacrifice"],
  prepositions: ["of", "in", "with", "without", "beyond", "after", "before", "between"],
  third: ["the Moon", "the Stars", "the Damned", "Time", "the Forest", "the Past", "Tomorrow", "the End"]
};

function generateMovieTitle() {
  const genre = document.getElementById('movieGenre').value;
  const style = document.getElementById('movieStyle').value;
  
  let titles = [];
  for (let i = 0; i < 5; i++) {
    let title;
    if (style === 'classic') {
      title = `${movieTitleParts.first[Math.floor(Math.random() * movieTitleParts.first.length)]} ${movieTitleParts.second[Math.floor(Math.random() * movieTitleParts.second.length)]}`;
    } else if (style === 'arthouse') {
      const prep = movieTitleParts.prepositions[Math.floor(Math.random() * movieTitleParts.prepositions.length)];
      title = `${movieTitleParts.second[Math.floor(Math.random() * movieTitleParts.second.length)]} ${prep} ${movieTitleParts.third[Math.floor(Math.random() * movieTitleParts.third.length)]}`;
    } else if (style === 'bmovie') {
      title = `Attack of the ${movieTitleParts.third[Math.floor(Math.random() * movieTitleParts.third.length)].replace('the ', '')}`;
    } else {
      title = `${movieTitleParts.first[Math.floor(Math.random() * movieTitleParts.first.length)]} ${movieTitleParts.second[Math.floor(Math.random() * movieTitleParts.second.length)]}`;
    }
    
    titles.push(title);
  }
  
  document.getElementById('movieTitleResults').innerHTML = titles.map(t => `<div>${t}</div>`).join('');
}

// Initialize movie titles
generateMovieTitle();

// D&D Character Generator (v-8)
const races = ["Human", "Elf", "Dwarf", "Halfling", "Dragonborn", "Tiefling", "Gnome", "Half-Orc"];
const classes = ["Fighter", "Wizard", "Rogue", "Cleric", "Paladin", "Ranger", "Bard", "Sorcerer"];
const backgrounds = ["Acolyte", "Criminal", "Folk Hero", "Noble", "Sage", "Soldier", "Urchin", "Entertainer"];
const traits = [
  "Brave", "Curious", "Honorable", "Sly", "Wise", "Charming", "Stoic", "Eccentric",
  "Brash", "Gentle", "Sarcastic", "Optimistic", "Pessimistic", "Loyal", "Treacherous", "Ambitious"
];

function generateDndCharacter() {
  const racePref = document.getElementById('dndRace').value;
  const classPref = document.getElementById('dndClass').value;
  
  const race = racePref === 'random' ? races[Math.floor(Math.random() * races.length)] : racePref;
  const charClass = classPref === 'random' ? classes[Math.floor(Math.random() * classes.length)] : classPref;
  const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  const trait1 = traits[Math.floor(Math.random() * traits.length)];
  const trait2 = traits[Math.floor(Math.random() * traits.length)];
  
  document.getElementById('dndCharacterSheet').innerHTML = `
    <div class="dnd-character">
      <h3>${race} ${charClass}</h3>
      <p><strong>Background:</strong> ${background}</p>
      <p><strong>Personality:</strong> ${trait1} and ${trait2}</p>
      <p><strong>Equipment:</strong> ${generateEquipment(charClass)}</p>
      <p><strong>Backstory:</strong> ${generateBackstory(race, charClass, background)}</p>
    </div>
  `;
}

function generateEquipment(charClass) {
  const equipment = {
    Fighter: "Longsword, shield, chain mail, backpack",
    Wizard: "Spellbook, dagger, robes, component pouch",
    Rogue: "Dagger, leather armor, thieves' tools, grappling hook",
    Cleric: "Mace, shield, holy symbol, chain mail",
    Paladin: "Greatsword, shield, holy symbol, plate armor",
    Ranger: "Longbow, arrows, leather armor, survival kit",
    Bard: "Rapier, lute, leather armor, disguise kit",
    Sorcerer: "Dagger, arcane focus, robes, potion"
  };
  return equipment[charClass] || "Varies by class";
}

function generateBackstory(race, charClass, background) {
  const backstories = [
    `A ${race.toLowerCase()} ${background.toLowerCase()} who discovered ${charClass.toLowerCase()} abilities and set out to explore the world.`,
    `Former ${background.toLowerCase()} who turned to ${charClass.toLowerCase()} after a life-changing event.`,
    `${race} ${charClass.toLowerCase()} trained in the arts of ${charClass.toLowerCase()} from a young age, now seeking adventure.`,
    `${background} who found a new calling as a ${charClass.toLowerCase()}.`
  ];
  return backstories[Math.floor(Math.random() * backstories.length)];
}

// Initialize character
generateDndCharacter();

// Tattoo Generator (v-9)
function generateTattoo() {
  const style = document.getElementById('tattooStyle').value;
  const theme = document.getElementById('tattooTheme').value || "abstract";
  const placement = document.getElementById('tattooPlacement').value;
  
  const preview = document.getElementById('tattooPreview');
  preview.innerHTML = '';
  
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  
  // Draw based on style
  switch(style) {
    case 'tribal':
      drawTribalTattoo(ctx, theme);
      break;
    case 'realistic':
      drawRealisticTattoo(ctx, theme);
      break;
    case 'watercolor':
      drawWatercolorTattoo(ctx, theme);
      break;
    case 'geometric':
      drawGeometricTattoo(ctx, theme);
      break;
    case 'traditional':
      drawTraditionalTattoo(ctx, theme);
      break;
  }
  
  preview.appendChild(canvas);
}

function drawTribalTattoo(ctx, theme) {
  ctx.fillStyle = '#000';
  ctx.beginPath();
  // Simplified tribal pattern
  ctx.moveTo(50, 50);
  ctx.lineTo(150, 30);
  ctx.lineTo(250, 50);
  ctx.lineTo(230, 150);
  ctx.lineTo(250, 250);
  ctx.lineTo(150, 270);
  ctx.lineTo(50, 250);
  ctx.lineTo(70, 150);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillText(`Tribal ${theme} design`, 10, 290);
}

function drawRealisticTattoo(ctx, theme) {
  ctx.fillStyle = '#333';
  ctx.font = 'italic 16px Arial';
  ctx.fillText(`Realistic ${theme} tattoo`, 10, 290);
  
  // Placeholder for realistic drawing
  ctx.beginPath();
  ctx.arc(150, 150, 80, 0, Math.PI * 2);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#555';
  ctx.fillText(theme, 140, 150);
}

function drawWatercolorTattoo(ctx, theme) {
  // Placeholder for watercolor effect
  const colors = ['#ff3a3a', '#3a86ff', '#8338ec', '#ffbe0b'];
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(
      100 + Math.random() * 100,
      100 + Math.random() * 100,
      20 + Math.random() * 30,
      0, Math.PI * 2
    );
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.fill();
  }
  ctx.fillStyle = '#000';
  ctx.font = 'italic 16px Arial';
  ctx.fillText(`Watercolor ${theme}`, 10, 290);
}

function drawGeometricTattoo(ctx, theme) {
  ctx.fillStyle = '#000';
  // Simple geometric pattern
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(
      150 + Math.cos(i * Math.PI / 3) * 80,
      150 + Math.sin(i * Math.PI / 3) * 80
    );
    ctx.lineTo(
      150 + Math.cos((i + 1) * Math.PI / 3) * 80,
      150 + Math.sin((i + 1) * Math.PI / 3) * 80
    );
    ctx.closePath();
    if (i % 2 === 0) ctx.fill();
    else ctx.stroke();
  }
  ctx.fillStyle = '#000';
  ctx.font = 'italic 16px Arial';
  ctx.fillText(`Geometric ${theme}`, 10, 290);
}

function drawTraditionalTattoo(ctx, theme) {
  ctx.fillStyle = '#000';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(theme.toUpperCase(), 150, 150);
  ctx.textAlign = 'left';
  ctx.font = 'italic 16px Arial';
  ctx.fillText(`Traditional ${theme} flash`, 10, 290);
}

// Initialize tattoo
generateTattoo();

// Mandala Generator (v-10)
function generateMandala() {
  const layers = parseInt(document.getElementById('mandalaLayers').value);
  const segments = parseInt(document.getElementById('mandalaSegments').value);
  const color1 = document.getElementById('mandalaColor1').value;
  const color2 = document.getElementById('mandalaColor2').value;
  
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const maxRadius = Math.min(centerX, centerY) * 0.9;
  
  // Draw mandala
  for (let layer = 1; layer <= layers; layer++) {
    const radius = (maxRadius * layer) / layers;
    const layerColor = layer % 2 === 0 ? color1 : color2;
    
    for (let segment = 0; segment < segments; segment++) {
      const angle = (segment * 2 * Math.PI) / segments;
      const nextAngle = ((segment + 1) * 2 * Math.PI) / segments;
      
      // Draw petal-like shapes
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX + Math.cos(angle) * radius * 0.7,
        centerY + Math.sin(angle) * radius * 0.7,
        radius * 0.3,
        angle - Math.PI/4,
        angle + Math.PI/4
      );
      ctx.closePath();
      ctx.fillStyle = layerColor;
      ctx.fill();
      
      // Connect segments
      if (layer > 1) {
        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(angle) * (radius * 0.7 - radius * 0.3),
          centerY + Math.sin(angle) * (radius * 0.7 - radius * 0.3)
        );
        ctx.lineTo(
          centerX + Math.cos(angle) * (radius * 0.7 + radius * 0.3),
          centerY + Math.sin(angle) * (radius * 0.7 + radius * 0.3)
        );
        ctx.strokeStyle = layerColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  }
  
  // Add center dot
  ctx.beginPath();
  ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#000';
  ctx.fill();
  
  document.getElementById('mandalaPreview').innerHTML = '';
  document.getElementById('mandalaPreview').appendChild(canvas);
}

function downloadMandala() {
  const canvas = document.querySelector('#mandalaPreview canvas');
  if (!canvas) {
    alert('Please generate a mandala first');
    return;
  }
  
  const link = document.createElement('a');
  link.download = 'mandala.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Initialize mandala
generateMandala();



// Time Zone World Clock (w-1)
const timezones = [
  { name: "Local Time", offset: "local" },
  { name: "UTC/GMT", offset: 0 },
  { name: "Eastern Time (ET)", offset: -5 },
  { name: "Central Time (CT)", offset: -6 },
  { name: "Mountain Time (MT)", offset: -7 },
  { name: "Pacific Time (PT)", offset: -8 },
  { name: "London (GMT)", offset: 0 },
  { name: "Paris (CET)", offset: 1 },
  { name: "Tokyo (JST)", offset: 9 },
  { name: "Sydney (AEST)", offset: 10 }
];

function initTimezones() {
  const select = document.getElementById('timezone1');
  select.innerHTML = '';
  
  timezones.forEach(tz => {
    const option = document.createElement('option');
    option.value = tz.offset;
    option.textContent = tz.name;
    select.appendChild(option);
  });
}

function addTimezone() {
  const select = document.getElementById('timezone1');
  const selectedValue = select.value;
  const selectedText = select.options[select.selectedIndex].text;
  
  const display = document.getElementById('timezoneDisplay');
  const clockDiv = document.createElement('div');
  clockDiv.className = 'timezone-clock';
  clockDiv.innerHTML = `
    <h5>${selectedText}</h5>
    <div class="clock-time" data-offset="${selectedValue}">00:00:00</div>
    <button class="tool-btn small-btn" onclick="removeTimezone(this)">Remove</button>
  `;
  display.appendChild(clockDiv);
  
  // Start updating this clock
  updateClock(clockDiv.querySelector('.clock-time'));
}

function removeTimezone(button) {
  button.parentElement.remove();
}

function updateClock(clockElement) {
  const offset = clockElement.dataset.offset;
  let now;
  
  if (offset === 'local') {
    now = new Date();
  } else {
    const utc = new Date();
    const offsetHours = parseInt(offset);
    now = new Date(utc.getTime() + offsetHours * 3600000);
  }
  
  const timeString = now.toLocaleTimeString();
  clockElement.textContent = timeString;
  
  // Update every second
  setTimeout(() => updateClock(clockElement), 1000);
}

function updateAllClocks() {
  document.querySelectorAll('.clock-time').forEach(clock => {
    updateClock(clock);
  });
}

// Initialize world clock
initTimezones();
setInterval(updateAllClocks, 1000);

// Meeting Planner (w-2)
function addParticipant() {
  const container = document.getElementById('participantTimezones');
  const count = container.children.length + 1;
  
  const div = document.createElement('div');
  div.className = 'participant';
  div.innerHTML = `
    <span>Participant ${count} Timezone</span>
    <select class="tool-select" name="participantTz">
      <option value="local">Local Time</option>
      <option value="UTC">UTC/GMT</option>
      ${timezones.filter(tz => !['local', 'UTC'].includes(tz.offset))
        .map(tz => `<option value="${tz.offset}">${tz.name}</option>`).join('')}
    </select>
    <button class="tool-btn small-btn" onclick="removeParticipant(this)">Remove</button>
  `;
  container.appendChild(div);
}

function removeParticipant(button) {
  button.parentElement.remove();
  // Renumber remaining participants
  document.querySelectorAll('.participant').forEach((div, index) => {
    div.querySelector('span').textContent = `Participant ${index + 1} Timezone`;
  });
}

function findMeetingTimes() {
  const yourOffset = document.getElementById('yourTimezone').value;
  const duration = parseFloat(document.getElementById('meetingDuration').value) || 1;
  const participants = Array.from(document.querySelectorAll('[name="participantTz"]')).map(select => select.value);
  
  // Simple demo - in a real app you'd calculate overlapping business hours
  const results = document.getElementById('meetingResults');
  results.innerHTML = `
    <p>Suggested Meeting Times (your local time):</p>
    <ul>
      <li>9:00 AM - 10:00 AM</li>
      <li>2:00 PM - 3:00 PM</li>
      <li>4:30 PM - 5:30 PM</li>
    </ul>
    <p>Note: This is a simplified demo. A full implementation would calculate actual overlapping business hours based on timezone differences.</p>
  `;
}

// Invoice Generator (w-3)
function addInvoiceItem() {
  const tbody = document.getElementById('invoiceItemRows');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input class="tool-input" type="text" name="itemDesc" placeholder="Item description"></td>
    <td><input class="tool-input" type="number" name="itemQty" min="1" value="1"></td>
    <td><input class="tool-input" type="number" name="itemPrice" min="0" step="0.01" placeholder="0.00"></td>
    <td class="item-total">0.00</td>
    <td><button class="tool-btn small-btn" onclick="removeInvoiceItem(this)">×</button></td>
  `;
  tbody.appendChild(row);
  
  // Add event listeners to calculate totals when values change
  row.querySelector('[name="itemQty"]').addEventListener('input', calculateInvoiceTotals);
  row.querySelector('[name="itemPrice"]').addEventListener('input', calculateInvoiceTotals);
}

function removeInvoiceItem(button) {
  button.closest('tr').remove();
  calculateInvoiceTotals();
}

function calculateInvoiceTotals() {
  const rows = document.querySelectorAll('#invoiceItemRows tr');
  let subtotal = 0;
  
  rows.forEach(row => {
    const qty = parseFloat(row.querySelector('[name="itemQty"]').value) || 0;
    const price = parseFloat(row.querySelector('[name="itemPrice"]').value) || 0;
    const total = qty * price;
    row.querySelector('.item-total').textContent = total.toFixed(2);
    subtotal += total;
  });
  
  const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
  const discount = parseFloat(document.getElementById('discountAmount').value) || 0;
  const tax = subtotal * taxRate / 100;
  const total = subtotal + tax - discount;
  
  // Update preview if it exists
  const preview = document.getElementById('invoicePreview');
  if (preview.innerHTML) {
    generateInvoice();
  }
}

function generateInvoice() {
  const from = document.getElementById('invoiceFrom').value || 'Your Company';
  const to = document.getElementById('invoiceTo').value || 'Client Name';
  const number = document.getElementById('invoiceNumber').value || 'INV-001';
  const date = document.getElementById('invoiceDate').value || new Date().toISOString().split('T')[0];
  const dueDate = document.getElementById('invoiceDueDate').value || '';
  const notes = document.getElementById('invoiceNotes').value || '';
  
  calculateInvoiceTotals();
  const subtotal = Array.from(document.querySelectorAll('.item-total'))
    .reduce((sum, cell) => sum + parseFloat(cell.textContent), 0);
  const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
  const discount = parseFloat(document.getElementById('discountAmount').value) || 0;
  const tax = subtotal * taxRate / 100;
  const total = subtotal + tax - discount;
  
  const items = Array.from(document.querySelectorAll('#invoiceItemRows tr')).map(row => {
    return {
      description: row.querySelector('[name="itemDesc"]').value || 'Item',
      qty: row.querySelector('[name="itemQty"]').value || 1,
      price: row.querySelector('[name="itemPrice"]').value || 0,
      total: row.querySelector('.item-total').textContent
    };
  });
  
  const preview = document.getElementById('invoicePreview');
  preview.innerHTML = `
    <div class="invoice">
      <div class="invoice-header">
        <div class="invoice-from">
          <h3>${from.split('\n')[0]}</h3>
          <p>${from.split('\n').slice(1).join('<br>')}</p>
        </div>
        <div class="invoice-info">
          <h2>INVOICE</h2>
          <p><strong>Invoice #:</strong> ${number}</p>
          <p><strong>Date:</strong> ${date}</p>
          ${dueDate ? `<p><strong>Due Date:</strong> ${dueDate}</p>` : ''}
        </div>
      </div>
      <div class="invoice-to">
        <h4>Bill To:</h4>
        <p>${to.replace(/\n/g, '<br>')}</p>
      </div>
      <table class="invoice-items">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td>${item.description}</td>
              <td>${item.qty}</td>
              <td>$${parseFloat(item.price).toFixed(2)}</td>
              <td>$${item.total}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Subtotal</td>
            <td>$${subtotal.toFixed(2)}</td>
          </tr>
          ${taxRate > 0 ? `
            <tr>
              <td colspan="3">Tax (${taxRate}%)</td>
              <td>$${tax.toFixed(2)}</td>
            </tr>
          ` : ''}
          ${discount > 0 ? `
            <tr>
              <td colspan="3">Discount</td>
              <td>-$${discount.toFixed(2)}</td>
            </tr>
          ` : ''}
          <tr class="total">
            <td colspan="3">Total Due</td>
            <td>$${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      ${notes ? `<div class="invoice-notes"><p>${notes.replace(/\n/g, '<br>')}</p></div>` : ''}
    </div>
  `;
}

function downloadInvoice() {
  const preview = document.getElementById('invoicePreview');
  if (!preview.innerHTML) {
    alert('Please generate an invoice first');
    return;
  }
  
  // In a real app, you would use a library like jsPDF or html2canvas to create a PDF
  alert('In a real implementation, this would download a PDF. This is just a demo.');
}

// Business Card Generator (w-4)
function generateBusinessCard() {
  const name = document.getElementById('cardName').value || 'Your Name';
  const title = document.getElementById('cardTitle').value || 'Your Title';
  const company = document.getElementById('cardCompany').value || 'Company Name';
  const contact = document.getElementById('cardContact').value || 'Phone | Email | Website';
  const logoUrl = document.getElementById('cardLogo').value;
  const layout = document.getElementById('cardLayout').value;
  const primaryColor = document.getElementById('cardPrimaryColor').value;
  const secondaryColor = document.getElementById('cardSecondaryColor').value;
  const font = document.getElementById('cardFont').value;
  
  const preview = document.getElementById('cardPreview');
  preview.innerHTML = '';
  
  const card = document.createElement('div');
  card.className = `business-card ${layout}`;
  card.style.backgroundColor = secondaryColor;
  card.style.color = primaryColor;
  card.style.fontFamily = font;
  
  if (logoUrl) {
    const logo = document.createElement('img');
    logo.src = logoUrl;
    logo.className = 'card-logo';
    card.appendChild(logo);
  }
  
  const nameEl = document.createElement('h3');
  nameEl.textContent = name;
  nameEl.className = 'card-name';
  card.appendChild(nameEl);
  
  const titleEl = document.createElement('p');
  titleEl.textContent = title;
  titleEl.className = 'card-title';
  card.appendChild(titleEl);
  
  const companyEl = document.createElement('p');
  companyEl.textContent = company;
  companyEl.className = 'card-company';
  card.appendChild(companyEl);
  
  const contactEl = document.createElement('div');
  contactEl.innerHTML = contact.replace(/\n/g, '<br>');
  contactEl.className = 'card-contact';
  card.appendChild(contactEl);
  
  preview.appendChild(card);
}

function downloadBusinessCard() {
  const preview = document.getElementById('cardPreview');
  if (!preview.innerHTML) {
    alert('Please generate a business card first');
    return;
  }
  
  // In a real app, you would use html2canvas to create an image
  alert('In a real implementation, this would download an image. This is just a demo.');
}

// Resume Builder (w-5)
function addResumeSection(type) {
  let container, html;
  
  if (type === 'work') {
    container = document.getElementById('workExperience');
    html = `
      <div class="work-entry">
        <input class="tool-input" type="text" name="workTitle" placeholder="Job Title">
        <input class="tool-input" type="text" name="workCompany" placeholder="Company">
        <input class="tool-input" type="text" name="workDuration" placeholder="Duration">
        <textarea class="tool-input" name="workDescription" placeholder="Description"></textarea>
        <button class="tool-btn small-btn" onclick="removeResumeSection(this, 'work')">Remove</button>
      </div>
    `;
  } else {
    container = document.getElementById('education');
    html = `
      <div class="education-entry">
        <input class="tool-input" type="text" name="educationDegree" placeholder="Degree">
        <input class="tool-input" type="text" name="educationInstitution" placeholder="Institution">
        <input class="tool-input" type="text" name="educationDuration" placeholder="Duration">
        <textarea class="tool-input" name="educationDescription" placeholder="Details"></textarea>
        <button class="tool-btn small-btn" onclick="removeResumeSection(this, 'education')">Remove</button>
      </div>
    `;
  }
  
  const div = document.createElement('div');
  div.innerHTML = html;
  container.appendChild(div);
}

function removeResumeSection(button, type) {
  button.closest(type === 'work' ? '.work-entry' : '.education-entry').remove();
}

function generateResume() {
  const template = document.getElementById('resumeTemplate').value;
  const name = document.getElementById('resumeName').value || 'Your Name';
  const title = document.getElementById('resumeTitle').value || 'Professional Title';
  const contact = document.getElementById('resumeContact').value || 'Phone | Email | Location';
  const summary = document.getElementById('resumeSummary').value || 'Professional summary goes here';
  const skills = document.getElementById('resumeSkills').value || 'Skill 1, Skill 2, Skill 3';
  
  const workExperiences = Array.from(document.querySelectorAll('.work-entry')).map(entry => {
    return {
      title: entry.querySelector('[name="workTitle"]').value || 'Job Title',
      company: entry.querySelector('[name="workCompany"]').value || 'Company',
      duration: entry.querySelector('[name="workDuration"]').value || 'Duration',
      description: entry.querySelector('[name="workDescription"]').value || 'Job description'
    };
  });
  
  const educationEntries = Array.from(document.querySelectorAll('.education-entry')).map(entry => {
    return {
      degree: entry.querySelector('[name="educationDegree"]').value || 'Degree',
      institution: entry.querySelector('[name="educationInstitution"]').value || 'Institution',
      duration: entry.querySelector('[name="educationDuration"]').value || 'Duration',
      description: entry.querySelector('[name="educationDescription"]').value || 'Details'
    };
  });
  
  const preview = document.getElementById('resumePreview');
  preview.innerHTML = `
    <div class="resume ${template}">
      <div class="resume-header">
        <h1>${name}</h1>
        <h2>${title}</h2>
        <div class="contact-info">${contact.replace(/\n/g, '<br>')}</div>
      </div>
      <div class="resume-section">
        <h3>Summary</h3>
        <p>${summary.replace(/\n/g, '<br>')}</p>
      </div>
      ${workExperiences.length > 0 ? `
        <div class="resume-section">
          <h3>Work Experience</h3>
          ${workExperiences.map(exp => `
            <div class="experience">
              <div class="experience-header">
                <h4>${exp.title}</h4>
                <div class="experience-details">
                  <span>${exp.company}</span>
                  <span>${exp.duration}</span>
                </div>
              </div>
              <p>${exp.description.replace(/\n/g, '<br>')}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}
      ${educationEntries.length > 0 ? `
        <div class="resume-section">
          <h3>Education</h3>
          ${educationEntries.map(edu => `
            <div class="education">
              <div class="education-header">
                <h4>${edu.degree}</h4>
                <div class="education-details">
                  <span>${edu.institution}</span>
                  <span>${edu.duration}</span>
                </div>
              </div>
              ${edu.description ? `<p>${edu.description.replace(/\n/g, '<br>')}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
      <div class="resume-section">
        <h3>Skills</h3>
        <p>${skills.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
  `;
}

function downloadResume() {
  const preview = document.getElementById('resumePreview');
  if (!preview.innerHTML) {
    alert('Please generate a resume first');
    return;
  }
  
  // In a real app, you would use a library like jsPDF to create a PDF
  alert('In a real implementation, this would download a PDF. This is just a demo.');
}

// Cover Letter Generator (w-6)
function addParagraph() {
  const container = document.getElementById('letterBodyParagraphs');
  const div = document.createElement('div');
  div.className = 'paragraph';
  div.innerHTML = `
    <textarea class="tool-input" name="letterBody" placeholder="Highlight your qualifications"></textarea>
    <button class="tool-btn small-btn" onclick="removeParagraph(this)">Remove</button>
  `;
  container.appendChild(div);
}

function removeParagraph(button) {
  button.parentElement.remove();
}

function generateCoverLetter() {
  const template = document.getElementById('letterTemplate').value;
  const yourInfo = document.getElementById('letterYourInfo').value || 'Your Name\nYour Address\nYour Contact Info';
  const date = document.getElementById('letterDate').value || new Date().toISOString().split('T')[0];
  const employerInfo = document.getElementById('letterEmployerInfo').value || 'Hiring Manager\nCompany Name\nCompany Address';
  const salutation = document.getElementById('letterSalutation').value || 'Dear Hiring Manager,';
  const opening = document.getElementById('letterOpening').value || 'I am writing to express my interest in the [Position Name] position at [Company Name].';
  const bodyParagraphs = Array.from(document.querySelectorAll('[name="letterBody"]')).map(
    textarea => textarea.value || 'Highlight your qualifications and experience.'
  );
  const closing = document.getElementById('letterClosing').value || 'I would welcome the opportunity to discuss how my skills and experience align with your needs. Thank you for your consideration.';
  const signature = document.getElementById('letterSignature').value || 'Sincerely,';
  
  const preview = document.getElementById('letterPreview');
  preview.innerHTML = `
    <div class="cover-letter ${template}">
      <div class="letter-header">
        <div class="your-info">${yourInfo.replace(/\n/g, '<br>')}</div>
        <div class="letter-date">${date}</div>
      </div>
      <div class="employer-info">${employerInfo.replace(/\n/g, '<br>')}</div>
      <div class="letter-content">
        <p class="salutation">${salutation}</p>
        <p class="opening">${opening.replace(/\n/g, '<br>')}</p>
        ${bodyParagraphs.map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`).join('')}
        <p class="closing">${closing.replace(/\n/g, '<br>')}</p>
        <p class="signature">${signature}<br>${yourInfo.split('\n')[0]}</p>
      </div>
    </div>
  `;
}

function downloadCoverLetter() {
  const preview = document.getElementById('letterPreview');
  if (!preview.innerHTML) {
    alert('Please generate a cover letter first');
    return;
  }
  
  // In a real app, you would use a library like jsPDF to create a PDF
  alert('In a real implementation, this would download a PDF. This is just a demo.');
}

// SMART Goal Generator (w-7)
function generateSmartGoal() {
  const idea = document.getElementById('goalIdea').value || 'Improve my skills';
  const specific = document.getElementById('goalSpecific').value || 'Learn a new programming language';
  const measurable = document.getElementById('goalMeasurable').value || 'Complete 3 projects';
  const achievable = document.getElementById('goalAchievable').value || 'Dedicate 5 hours per week';
  const relevant = document.getElementById('goalRelevant').value || 'Advance my career';
  const timebound = document.getElementById('goalTimebound').value || 'Within 3 months';
  
  const result = document.getElementById('goalResult');
  result.innerHTML = `
    <h3>Your SMART Goal</h3>
    <p><strong>Original Idea:</strong> ${idea}</p>
    <div class="smart-goal">
      <p><strong>S</strong>pecific: ${specific}</p>
      <p><strong>M</strong>easurable: ${measurable}</p>
      <p><strong>A</strong>chievable: ${achievable}</p>
      <p><strong>R</strong>elevant: ${relevant}</p>
      <p><strong>T</strong>ime-bound: ${timebound}</p>
    </div>
    <h4>Final SMART Goal:</h4>
    <p>"${specific} by ${timebound}, measured by ${measurable.toLowerCase()}, which is ${achievable.toLowerCase()} and will help me ${relevant.toLowerCase()}."</p>
  `;
}

function downloadSmartGoal() {
  const result = document.getElementById('goalResult');
  if (!result.innerHTML) {
    alert('Please generate a SMART goal first');
    return;
  }
  
  // In a real app, you would create a downloadable file
  alert('In a real implementation, this would download a goal plan. This is just a demo.');
}

// Email Signature Generator (w-8)
function generateEmailSignature() {
  const name = document.getElementById('signatureName').value || 'Your Name';
  const title = document.getElementById('signatureTitle').value || 'Your Title';
  const company = document.getElementById('signatureCompany').value || 'Company Name';
  const contact = document.getElementById('signatureContact').value || 'Phone | Email | Website';
  const social = document.getElementById('signatureSocial').value || '';
  const logoUrl = document.getElementById('signatureLogo').value;
  const layout = document.getElementById('signatureLayout').value;
  const textColor = document.getElementById('signatureTextColor').value;
  const accentColor = document.getElementById('signatureAccentColor').value;
  const font = document.getElementById('signatureFont').value;
  
  const preview = document.getElementById('signaturePreview');
  preview.innerHTML = '';
  
  const signature = document.createElement('div');
  signature.className = `email-signature ${layout}`;
  signature.style.color = textColor;
  signature.style.fontFamily = font;
  
  if (logoUrl) {
    const logo = document.createElement('img');
    logo.src = logoUrl;
    logo.className = 'signature-logo';
    signature.appendChild(logo);
  }
  
  const nameEl = document.createElement('div');
  nameEl.className = 'signature-name';
  nameEl.textContent = name;
  nameEl.style.color = accentColor;
  signature.appendChild(nameEl);
  
  const titleEl = document.createElement('div');
  titleEl.className = 'signature-title';
  titleEl.textContent = title;
  signature.appendChild(titleEl);
  
  const companyEl = document.createElement('div');
  companyEl.className = 'signature-company';
  companyEl.textContent = company;
  signature.appendChild(companyEl);
  
  const contactEl = document.createElement('div');
  contactEl.className = 'signature-contact';
  contactEl.innerHTML = contact.replace(/\n/g, '<br>');
  signature.appendChild(contactEl);
  
  if (social) {
    const socialEl = document.createElement('div');
    socialEl.className = 'signature-social';
    social.split('\n').forEach(url => {
      if (url.trim()) {
        const link = document.createElement('a');
        link.href = url.trim();
        link.textContent = url.trim();
        link.target = '_blank';
        link.style.color = accentColor;
        socialEl.appendChild(link);
        socialEl.appendChild(document.createElement('br'));
      }
    });
    signature.appendChild(socialEl);
  }
  
  preview.appendChild(signature);
  
  // Generate HTML code
  document.getElementById('signatureHtml').value = signature.outerHTML;
}

function copySignatureHtml() {
  const htmlTextarea = document.getElementById('signatureHtml');
  htmlTextarea.select();
  document.execCommand('copy');
  alert('HTML code copied to clipboard!');
}

// QR Code Business Card Generator (w-9)
function generateQrCard() {
  const name = document.getElementById('qrName').value || 'Your Name';
  const title = document.getElementById('qrTitle').value || 'Your Title';
  const company = document.getElementById('qrCompany').value || 'Company Name';
  const contact = document.getElementById('qrContact').value || 'Phone | Email | Website';
  const website = document.getElementById('qrWebsite').value || 'https://example.com';
  const logoUrl = document.getElementById('qrLogo').value;
  const cardColor = document.getElementById('qrCardColor').value;
  const textColor = document.getElementById('qrTextColor').value;
  const qrColor = document.getElementById('qrCodeColor').value;
  const style = document.getElementById('qrCardStyle').value;
  
  const preview = document.getElementById('qrCardPreview');
  preview.innerHTML = '';
  
  const card = document.createElement('div');
  card.className = `qr-card ${style}`;
  card.style.backgroundColor = cardColor;
  card.style.color = textColor;
  
  if (logoUrl) {
    const logo = document.createElement('img');
    logo.src = logoUrl;
    logo.className = 'qr-card-logo';
    card.appendChild(logo);
  }
  
  const nameEl = document.createElement('h3');
  nameEl.className = 'qr-card-name';
  nameEl.textContent = name;
  card.appendChild(nameEl);
  
  const titleEl = document.createElement('p');
  titleEl.className = 'qr-card-title';
  titleEl.textContent = title;
  card.appendChild(titleEl);
  
  const companyEl = document.createElement('p');
  companyEl.className = 'qr-card-company';
  companyEl.textContent = company;
  card.appendChild(companyEl);
  
  const contactEl = document.createElement('div');
  contactEl.className = 'qr-card-contact';
  contactEl.innerHTML = contact.replace(/\n/g, '<br>');
  card.appendChild(contactEl);
  
  const qrContainer = document.createElement('div');
  qrContainer.className = 'qr-code-container';
  
  // In a real app, you would generate an actual QR code
  const qrPlaceholder = document.createElement('div');
  qrPlaceholder.className = 'qr-code-placeholder';
  qrPlaceholder.style.backgroundColor = qrColor;
  qrPlaceholder.innerHTML = `
    <div class="qr-code-pattern"></div>
    <small>QR Code for: ${website}</small>
  `;
  qrContainer.appendChild(qrPlaceholder);
  card.appendChild(qrContainer);
  
  preview.appendChild(card);
}

function downloadQrCard() {
  const preview = document.getElementById('qrCardPreview');
  if (!preview.innerHTML) {
    alert('Please generate a card first');
    return;
  }
  
  // In a real app, you would use html2canvas to create an image
  alert('In a real implementation, this would download an image. This is just a demo.');
}

// Mind Map Generator (w-10)
function addMainBranch() {
  const centralTopic = document.getElementById('centralTopic').value || 'Central Topic';
  const branchesContainer = document.getElementById('mindmapBranches');
  
  const branchId = Date.now();
  const branchDiv = document.createElement('div');
  branchDiv.className = 'mindmap-branch';
  branchDiv.dataset.branchId = branchId;
  branchDiv.innerHTML = `
    <div class="branch-header">
      <input class="tool-input" type="text" value="${centralTopic}" placeholder="Branch topic">
      <button class="tool-btn small-btn" onclick="addSubBranch(${branchId})">+ Sub-branch</button>
      <button class="tool-btn small-btn" onclick="removeBranch(${branchId})">×</button>
    </div>
    <div class="sub-branches" id="subBranches-${branchId}"></div>
  `;
  
  branchesContainer.appendChild(branchDiv);
}

function addSubBranch(branchId) {
  const subBranchesContainer = document.getElementById(`subBranches-${branchId}`);
  const subBranchDiv = document.createElement('div');
  subBranchDiv.className = 'sub-branch';
  subBranchDiv.innerHTML = `
    <input class="tool-input" type="text" placeholder="Sub-topic">
    <button class="tool-btn small-btn" onclick="this.parentElement.remove()">×</button>
  `;
  subBranchesContainer.appendChild(subBranchDiv);
}

function removeBranch(branchId) {
  document.querySelector(`.mindmap-branch[data-branch-id="${branchId}"]`).remove();
}

function generateMindMap() {
  const canvas = document.getElementById('mindmapCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw central topic
  const centralTopic = document.getElementById('centralTopic').value || 'Central Topic';
  ctx.fillStyle = '#3a86ff';
  ctx.fillRect(canvas.width/2 - 100, 50, 200, 60);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(centralTopic, canvas.width/2, 80);
  
  // Draw branches
  const branches = document.querySelectorAll('.mindmap-branch');
  branches.forEach((branch, index) => {
    const angle = (index / branches.length) * Math.PI * 2;
    const x = canvas.width/2 + Math.cos(angle) * 150;
    const y = 150 + Math.sin(angle) * 150;
    
    // Draw branch line
    ctx.strokeStyle = '#3a86ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 110);
    ctx.lineTo(x, y - 30);
    ctx.stroke();
    
    // Draw branch node
    ctx.fillStyle = '#ffbe0b';
    ctx.fillRect(x - 80, y - 30, 160, 40);
    ctx.fillStyle = '#000000';
    ctx.font = '14px Arial';
    ctx.fillText(branch.querySelector('input').value || 'Branch', x, y - 10);
    
    // Draw sub-branches
    const subBranches = branch.querySelectorAll('.sub-branch');
    subBranches.forEach((subBranch, subIndex) => {
      const subX = x + (subIndex - (subBranches.length - 1)/2) * 120;
      const subY = y + 60;
      
      // Draw sub-branch line
      ctx.strokeStyle = '#ffbe0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y + 10);
      ctx.lineTo(subX, subY - 10);
      ctx.stroke();
      
      // Draw sub-branch node
      ctx.fillStyle = '#fb5607';
      ctx.fillRect(subX - 60, subY - 10, 120, 30);
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.fillText(subBranch.querySelector('input').value || 'Sub-topic', subX, subY + 5);
    });
  });
}

function downloadMindMap() {
  const canvas = document.getElementById('mindmapCanvas');
  if (!canvas) {
    alert('Please generate a mind map first');
    return;
  }
  
  // In a real app, you would create a downloadable image
  alert('In a real implementation, this would download an image. This is just a demo.');
}

function clearMindMap() {
  document.getElementById('mindmapBranches').innerHTML = '';
  const canvas = document.getElementById('mindmapCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// Paint Calculator (x-1)
function calculatePaint() {
  const length = parseFloat(document.getElementById('wallLength').value);
  const height = parseFloat(document.getElementById('wallHeight').value);
  const walls = parseInt(document.getElementById('wallCount').value);
  const coats = parseInt(document.getElementById('coatCount').value);
  const coverage = parseFloat(document.getElementById('paintCoverage').value);
  
  const totalArea = length * height * walls;
  const paintNeeded = (totalArea * coats) / coverage;
  
  document.getElementById('paintResults').innerHTML = `
    <p>Total Wall Area: <strong>${totalArea.toFixed(2)} sq ft</strong></p>
    <p>Paint Needed: <strong>${Math.ceil(paintNeeded)} gallons</strong></p>
    <p>For best results, buy <strong>${Math.ceil(paintNeeded * 1.1)} gallons</strong> (10% extra)</p>
  `;
}

// Concrete Calculator (x-2)
function calculateConcrete() {
  const length = parseFloat(document.getElementById('concreteLength').value);
  const width = parseFloat(document.getElementById('concreteWidth').value);
  const depth = parseFloat(document.getElementById('concreteDepth').value) / 12; // convert inches to feet
  
  const cubicYards = (length * width * depth) / 27;
  
  document.getElementById('concreteResults').innerHTML = `
    <p>Volume Needed: <strong>${cubicYards.toFixed(2)} cubic yards</strong></p>
    <p>Bags Needed (60lb): <strong>${Math.ceil(cubicYards * 45)} bags</strong></p>
    <p>Bags Needed (80lb): <strong>${Math.ceil(cubicYards * 30)} bags</strong></p>
  `;
}

// Fertilizer Calculator (x-3)
function calculateFertilizer() {
  const area = parseFloat(document.getElementById('fertilizerArea').value);
  const ratio = document.getElementById('fertilizerRatio').value;
  const rate = parseFloat(document.getElementById('applicationRate').value);
  
  const fertilizerNeeded = (area * rate) / 1000;
  const [n, p, k] = ratio.split('-').map(Number);
  
  document.getElementById('fertilizerResults').innerHTML = `
    <p>Fertilizer Needed: <strong>${fertilizerNeeded.toFixed(2)} lbs</strong></p>
    <p>Nutrients per 1000 sq ft:</p>
    <ul>
      <li>Nitrogen (N): <strong>${n * rate / 100} lbs</strong></li>
      <li>Phosphorus (P): <strong>${p * rate / 100} lbs</strong></li>
      <li>Potassium (K): <strong>${k * rate / 100} lbs</strong></li>
    </ul>
  `;
}

// Seed Calculator (x-4)
function calculateSeeds() {
  const length = parseFloat(document.getElementById('seedLength').value);
  const width = parseFloat(document.getElementById('seedWidth').value);
  const plantSpacing = parseFloat(document.getElementById('plantSpacing').value) / 12; // inches to feet
  const rowSpacing = parseFloat(document.getElementById('rowSpacing').value) / 12; // inches to feet
  
  const plantsPerRow = Math.floor(length / plantSpacing) + 1;
  const rows = Math.floor(width / rowSpacing) + 1;
  const totalPlants = plantsPerRow * rows;
  
  document.getElementById('seedResults').innerHTML = `
    <p>Plants Per Row: <strong>${plantsPerRow}</strong></p>
    <p>Number of Rows: <strong>${rows}</strong></p>
    <p>Total Plants: <strong>${totalPlants}</strong></p>
    <p>Buy <strong>${Math.ceil(totalPlants * 1.2)} seeds</strong> (20% extra)</p>
  `;
}

// Fabric Yardage Calculator (x-5)
function calculateFabric() {
  const projectType = document.getElementById('fabricProjectType').value;
  const fabricWidth = parseFloat(document.getElementById('fabricWidth').value);
  const patternRepeat = parseFloat(document.getElementById('patternRepeat').value);
  const itemCount = parseInt(document.getElementById('fabricItemCount').value);
  
  let yardage = 0;
  switch(projectType) {
    case 'curtains':
      yardage = 2.5 * itemCount;
      break;
    case 'dress':
      yardage = 3.5 * itemCount;
      break;
    case 'shirt':
      yardage = 2 * itemCount;
      break;
    case 'pants':
      yardage = 2.5 * itemCount;
      break;
    case 'quilt':
      yardage = 4 * itemCount;
      break;
  }
  
  // Adjust for pattern repeat
  if (patternRepeat > 0) {
    yardage += (patternRepeat / 36) * itemCount;
  }
  
  document.getElementById('fabricResults').innerHTML = `
    <p>Fabric Needed: <strong>${yardage.toFixed(1)} yards</strong></p>
    <p>Buy <strong>${Math.ceil(yardage * 1.1)} yards</strong> (10% extra)</p>
  `;
}

// Wallpaper Calculator (x-6)
function calculateWallpaper() {
  const length = parseFloat(document.getElementById('wallpaperLength').value);
  const height = parseFloat(document.getElementById('wallpaperHeight').value);
  const walls = parseInt(document.getElementById('wallpaperWallCount').value);
  const coverage = parseFloat(document.getElementById('rollCoverage').value);
  const patternRepeat = parseFloat(document.getElementById('wallpaperPatternRepeat').value) / 12; // inches to feet
  
  const totalArea = length * height * walls;
  let rolls = totalArea / coverage;
  
  // Adjust for pattern repeat
  if (patternRepeat > 0) {
    rolls *= 1.15;
  }
  
  document.getElementById('wallpaperResults').innerHTML = `
    <p>Total Wall Area: <strong>${totalArea.toFixed(2)} sq ft</strong></p>
    <p>Rolls Needed: <strong>${Math.ceil(rolls)}</strong></p>
    <p>Buy <strong>${Math.ceil(rolls * 1.1)} rolls</strong> (10% extra)</p>
  `;
}

// Tile Calculator (x-7)
function calculateTiles() {
  const length = parseFloat(document.getElementById('tileLength').value);
  const width = parseFloat(document.getElementById('tileWidth').value);
  const tileSize = document.getElementById('tileSize').value;
  const groutWidth = parseFloat(document.getElementById('groutWidth').value);
  const waste = parseFloat(document.getElementById('wastePercentage').value) / 100;
  
  const [tileLength, tileWidth] = tileSize.split('x').map(Number);
  const tileArea = (tileLength * tileWidth) / 144; // square inches to square feet
  const totalArea = length * width;
  
  let tiles = totalArea / tileArea;
  tiles *= (1 + waste);
  
  document.getElementById('tileResults').innerHTML = `
    <p>Total Area: <strong>${totalArea.toFixed(2)} sq ft</strong></p>
    <p>Tiles Needed: <strong>${Math.ceil(tiles)}</strong></p>
    <p>Grout Needed: <strong>${Math.ceil(totalArea / 20)} lbs</strong> (approx)</p>
  `;
}

// Garden Planner (x-8)
function planGarden() {
  const length = parseFloat(document.getElementById('gardenLength').value);
  const width = parseFloat(document.getElementById('gardenWidth').value);
  const plantType = document.getElementById('plantType').value;
  
  let spacing = 12;
  let plantsPerSqFt = 1;
  
  switch(plantType) {
    case 'tomato':
      spacing = 24;
      plantsPerSqFt = 0.25;
      break;
    case 'lettuce':
      spacing = 8;
      plantsPerSqFt = 2;
      break;
    case 'carrot':
      spacing = 3;
      plantsPerSqFt = 16;
      break;
    case 'pepper':
      spacing = 18;
      plantsPerSqFt = 0.5;
      break;
    case 'cucumber':
      spacing = 36;
      plantsPerSqFt = 0.11;
      break;
  }
  
  const totalPlants = Math.floor(length * width * plantsPerSqFt);
  
  document.getElementById('gardenResults').innerHTML = `
    <p>Garden Area: <strong>${length * width} sq ft</strong></p>
    <p>Plant Spacing: <strong>${spacing}" apart</strong></p>
    <p>Total Plants: <strong>${totalPlants}</strong></p>
  `;
  
  // Create simple grid visualization
  const grid = document.getElementById('gardenGrid');
  grid.innerHTML = '';
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${Math.floor(width * 12 / spacing)}, 1fr)`;
  grid.style.gap = '2px';
  grid.style.marginTop = '15px';
  
  for (let i = 0; i < totalPlants; i++) {
    const plant = document.createElement('div');
    plant.style.backgroundColor = '#4CAF50';
    plant.style.height = '15px';
    plant.style.borderRadius = '50%';
    grid.appendChild(plant);
  }
}

// Carpet Calculator (x-9)
function calculateCarpet() {
  const length = parseFloat(document.getElementById('carpetLength').value);
  const width = parseFloat(document.getElementById('carpetWidth').value);
  const rollWidth = parseFloat(document.getElementById('carpetRollWidth').value);
  const waste = parseFloat(document.getElementById('carpetWaste').value) / 100;
  
  const strips = Math.ceil(width / rollWidth);
  const stripLength = length * (1 + waste);
  const totalYards = (stripLength * strips * rollWidth) / 9;
  
  document.getElementById('carpetResults').innerHTML = `
    <p>Total Area: <strong>${(length * width).toFixed(2)} sq ft</strong></p>
    <p>Carpet Needed: <strong>${totalYards.toFixed(2)} sq yards</strong></p>
    <p>Buy <strong>${Math.ceil(totalYards * 1.1)} sq yards</strong> (10% extra)</p>
  `;
}

// Roof Pitch Calculator (x-10)
function calculateRoof() {
  const rise = parseFloat(document.getElementById('roofRise').value);
  const run = parseFloat(document.getElementById('roofRun').value);
  
  const pitch = rise / run;
  const angle = Math.atan(pitch) * (180 / Math.PI);
  const rafterLength = Math.sqrt(rise * rise + run * run);
  
  document.getElementById('roofResults').innerHTML = `
    <p>Roof Pitch: <strong>${rise}:${run} (${pitch.toFixed(3)})</strong></p>
    <p>Roof Angle: <strong>${angle.toFixed(2)}°</strong></p>
    <p>Rafter Length: <strong>${rafterLength.toFixed(2)} ft</strong></p>
  `;
}

// Initialize calculators
document.addEventListener('DOMContentLoaded', function() {
  calculatePaint();
  calculateConcrete();
  calculateFertilizer();
  calculateSeeds();
  calculateFabric();
  calculateWallpaper();
  calculateTiles();
  planGarden();
  calculateCarpet();
  calculateRoof();
});


// 8-Ball Fortune Teller (y-1)
const eightBallAnswers = [
  // Positive answers
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  
  // Neutral answers
  "Reply hazy try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  
  // Negative answers
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful"
];

function shakeEightBall() {
  const question = document.getElementById('eightBallQuestion').value;
  const answerElement = document.getElementById('eightBallAnswer');
  const ball = document.getElementById('eightBall');
  
  if (!question.trim()) {
    alert("Please ask a question first!");
    return;
  }
  
  // Add shaking animation
  ball.classList.add('shaking');
  
  // Clear answer during shake
  answerElement.textContent = "";
  
  // After animation, show answer
  setTimeout(() => {
    ball.classList.remove('shaking');
    const randomAnswer = eightBallAnswers[Math.floor(Math.random() * eightBallAnswers.length)];
    answerElement.textContent = randomAnswer;
    
    // Color code the answer
    if (eightBallAnswers.indexOf(randomAnswer) < 10) {
      answerElement.style.color = "#4CAF50"; // Green for positive
    } else if (eightBallAnswers.indexOf(randomAnswer) < 15) {
      answerElement.style.color = "#FFC107"; // Yellow for neutral
    } else {
      answerElement.style.color = "#F44336"; // Red for negative
    }
  }, 1000);
}

// Tarot Card Reader (y-2)
const tarotCards = [
  { name: "The Fool", meaning: "New beginnings, spontaneity, a leap of faith" },
  { name: "The Magician", meaning: "Manifestation, resourcefulness, power" },
  { name: "The High Priestess", meaning: "Intuition, mystery, subconscious mind" },
  { name: "The Empress", meaning: "Fertility, femininity, beauty, nature" },
  { name: "The Emperor", meaning: "Authority, structure, control, fatherhood" },
  { name: "The Hierophant", meaning: "Tradition, conformity, morality, ethics" },
  { name: "The Lovers", meaning: "Love, harmony, relationships, choices" },
  { name: "The Chariot", meaning: "Control, willpower, victory, assertion" },
  { name: "Strength", meaning: "Strength, courage, patience, control" },
  { name: "The Hermit", meaning: "Soul-searching, introspection, being alone" },
  { name: "Wheel of Fortune", meaning: "Good luck, karma, life cycles, destiny" },
  { name: "Justice", meaning: "Justice, fairness, truth, cause and effect" },
  { name: "The Hanged Man", meaning: "Sacrifice, waiting, uncertainty, letting go" },
  { name: "Death", meaning: "Endings, change, transformation, transition" },
  { name: "Temperance", meaning: "Balance, moderation, patience, purpose" },
  { name: "The Devil", meaning: "Addiction, materialism, playfulness, bondage" },
  { name: "The Tower", meaning: "Disaster, upheaval, sudden change, revelation" },
  { name: "The Star", meaning: "Hope, faith, purpose, renewal, spirituality" },
  { name: "The Moon", meaning: "Illusion, fear, anxiety, subconscious, intuition" },
  { name: "The Sun", meaning: "Positivity, fun, warmth, success, vitality" },
  { name: "Judgement", meaning: "Judgement, rebirth, inner calling, absolution" },
  { name: "The World", meaning: "Completion, integration, accomplishment, travel" }
];

function drawTarotCards() {
  const spread = document.getElementById('tarotSpread').value;
  const readingDiv = document.getElementById('tarotReading');
  
  // Clear previous reading
  readingDiv.innerHTML = "";
  
  // Shuffle cards
  const shuffledCards = [...tarotCards].sort(() => Math.random() - 0.5);
  
  let cardsToDraw = 1;
  let spreadName = "Single Card Reading";
  
  if (spread === "three") {
    cardsToDraw = 3;
    spreadName = "Three-Card Spread (Past, Present, Future)";
  } else if (spread === "celtic") {
    cardsToDraw = 10;
    spreadName = "Celtic Cross Spread";
  }
  
  readingDiv.innerHTML = `<h4>${spreadName}</h4>`;
  
  for (let i = 0; i < cardsToDraw; i++) {
    const card = shuffledCards[i];
    const isReversed = Math.random() > 0.7;
    
    const cardDiv = document.createElement('div');
    cardDiv.className = 'tarot-card';
    if (isReversed) cardDiv.classList.add('reversed');
    
    cardDiv.innerHTML = `
      <div class="tarot-card-name">${card.name} ${isReversed ? '(Reversed)' : ''}</div>
      <div class="tarot-card-meaning">${isReversed ? 
        `Reversed: ${card.meaning.replace(/\,/g, ', reversed')}` : 
        card.meaning}</div>
    `;
    
    readingDiv.appendChild(cardDiv);
  }
}

// Runes Reader (y-3)
const runes = [
  { symbol: "ᚠ", name: "Fehu", meaning: "Wealth, abundance, success, security" },
  { symbol: "ᚢ", name: "Uruz", meaning: "Strength, vitality, health, wild power" },
  { symbol: "ᚦ", name: "Thurisaz", meaning: "Conflict, defense, challenge, reaction" },
  { symbol: "ᚨ", name: "Ansuz", meaning: "Communication, wisdom, revelation, insight" },
  { symbol: "ᚱ", name: "Raidho", meaning: "Travel, movement, rhythm, progression" },
  { symbol: "ᚲ", name: "Kenaz", meaning: "Creativity, inspiration, knowledge, vision" },
  { symbol: "ᚷ", name: "Gebo", meaning: "Gift, partnership, generosity, balance" },
  { symbol: "ᚹ", name: "Wunjo", meaning: "Joy, comfort, pleasure, fellowship" },
  { symbol: "ᚺ", name: "Hagalaz", meaning: "Disruption, change, uncontrollable forces" },
  { symbol: "ᚾ", name: "Nauthiz", meaning: "Need, necessity, constraint, endurance" },
  { symbol: "ᛁ", name: "Isa", meaning: "Stillness, challenge, introspection" },
  { symbol: "ᛃ", name: "Jera", meaning: "Harvest, reward, cycles, fruition" },
  { symbol: "ᛇ", name: "Eihwaz", meaning: "Strength, reliability, dependability" },
  { symbol: "ᛈ", name: "Perthro", meaning: "Fate, chance, mystery, destiny" },
  { symbol: "ᛉ", name: "Algiz", meaning: "Protection, defense, connection with gods" },
  { symbol: "ᛊ", name: "Sowilo", meaning: "Success, energy, life force, honor" },
  { symbol: "ᛏ", name: "Tiwaz", meaning: "Justice, leadership, analysis, rationality" },
  { symbol: "ᛒ", name: "Berkana", meaning: "Growth, fertility, rebirth, renewal" },
  { symbol: "ᛖ", name: "Ehwaz", meaning: "Movement, progress, change, transportation" },
  { symbol: "ᛗ", name: "Mannaz", meaning: "Humanity, social order, intelligence" },
  { symbol: "ᛚ", name: "Laguz", meaning: "Water, flow, intuition, dreams" },
  { symbol: "ᛜ", name: "Ingwaz", meaning: "Internal growth, common virtue, gestation" },
  { symbol: "ᛟ", name: "Othala", meaning: "Inheritance, home, legacy, ancestry" },
  { symbol: "ᛞ", name: "Dagaz", meaning: "Breakthrough, awakening, awareness" }
];

function castRunes() {
  const question = document.getElementById('runesQuestion').value;
  const count = parseInt(document.getElementById('runesCount').value);
  const readingDiv = document.getElementById('runesReading');
  
  // Clear previous reading
  readingDiv.innerHTML = "";
  
  if (question.trim()) {
    readingDiv.innerHTML += `<p><strong>Your Focus:</strong> ${question}</p>`;
  }
  
  // Shuffle runes
  const shuffledRunes = [...runes].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < count; i++) {
    const rune = shuffledRunes[i];
    const isReversed = Math.random() > 0.7;
    
    const runeDiv = document.createElement('div');
    runeDiv.className = 'rune';
    if (isReversed) runeDiv.classList.add('reversed');
    
    runeDiv.innerHTML = `
      <div class="rune-symbol">${rune.symbol}</div>
      <div class="rune-name">${rune.name} ${isReversed ? '(Reversed)' : ''}</div>
      <div class="rune-meaning">${isReversed ? 
        `Reversed: ${rune.meaning.replace(/\,/g, ', reversed')}` : 
        rune.meaning}</div>
    `;
    
    readingDiv.appendChild(runeDiv);
  }
}

// Magic 8-Ball (y-4)
function shakeMagicEightBall() {
  const question = document.getElementById('magicEightBallQuestion').value;
  const answerElement = document.getElementById('magicEightBallAnswer');
  const ball = document.getElementById('magicEightBall');
  
  if (!question.trim()) {
    alert("Please ask a question first!");
    return;
  }
  
  // Add shaking animation
  ball.classList.add('shaking');
  
  // Clear answer during shake
  answerElement.textContent = "";
  
  // After animation, show answer
  setTimeout(() => {
    ball.classList.remove('shaking');
    const randomAnswer = eightBallAnswers[Math.floor(Math.random() * eightBallAnswers.length)];
    answerElement.textContent = randomAnswer;
    
    // Color code the answer
    if (eightBallAnswers.indexOf(randomAnswer) < 10) {
      answerElement.style.color = "#4CAF50"; // Green for positive
    } else if (eightBallAnswers.indexOf(randomAnswer) < 15) {
      answerElement.style.color = "#FFC107"; // Yellow for neutral
    } else {
      answerElement.style.color = "#F44336"; // Red for negative
    }
  }, 1000);
}

// Text Adventure Game (y-5)
const adventureLocations = {
  forest: {
    description: "You are in a dark forest. There's a path to the north and a cave entrance to the east.",
    exits: {
      north: "clearing",
      east: "cave"
    }
  },
  clearing: {
    description: "You emerge into a sunlit clearing with a small pond. A cottage stands to the west.",
    exits: {
      west: "cottage",
      south: "forest"
    },
    items: ["shiny key"]
  },
  cave: {
    description: "The cave is damp and dark. You can see a faint glimmer to the west.",
    exits: {
      west: "treasure",
      south: "forest"
    }
  },
  treasure: {
    description: "You found the treasure room! Gold and jewels glitter everywhere.",
    exits: {
      east: "cave"
    },
    win: true
  },
  cottage: {
    description: "A cozy cottage with a locked chest in the corner.",
    exits: {
      east: "clearing"
    },
    items: ["chest"]
  }
};

let currentLocation = "forest";
let inventory = [];

function startNewAdventure() {
  currentLocation = "forest";
  inventory = [];
  updateAdventureOutput("Welcome to the Text Adventure! " + adventureLocations.forest.description);
}

function processAdventureCommand() {
  const commandInput = document.getElementById('adventureCommand');
  const command = commandInput.value.toLowerCase().trim();
  commandInput.value = "";
  
  if (!command) return;
  
  const output = [];
  
  // Process movement commands
  if (["north", "south", "east", "west", "go north", "go south", "go east", "go west"].includes(command)) {
    const direction = command.split(" ").pop() || command;
    const location = adventureLocations[currentLocation];
    
    if (location.exits[direction]) {
      currentLocation = location.exits[direction];
      const newLocation = adventureLocations[currentLocation];
      output.push(newLocation.description);
      
      if (newLocation.win) {
        output.push("<strong>Congratulations! You found the treasure and won the game!</strong>");
      }
    } else {
      output.push("You can't go that way.");
    }
  }
  // Process look commands
  else if (command === "look") {
    output.push(adventureLocations[currentLocation].description);
    if (adventureLocations[currentLocation].items) {
      output.push("You see: " + adventureLocations[currentLocation].items.join(", "));
    }
  }
  // Process inventory command
  else if (command === "inventory") {
    if (inventory.length === 0) {
      output.push("You're not carrying anything.");
    } else {
      output.push("You have: " + inventory.join(", "));
    }
  }
  // Process take commands
  else if (command.startsWith("take ")) {
    const item = command.substring(5);
    const location = adventureLocations[currentLocation];
    
    if (location.items && location.items.includes(item)) {
      inventory.push(item);
      location.items = location.items.filter(i => i !== item);
      output.push(`You took the ${item}.`);
    } else {
      output.push(`There's no ${item} here to take.`);
    }
  }
  // Process use commands
  else if (command.startsWith("use ")) {
    const item = command.substring(4);
    
    if (!inventory.includes(item)) {
      output.push(`You don't have a ${item}.`);
    } 
    else if (item === "shiny key" && currentLocation === "cottage") {
      output.push("You unlock the chest with the shiny key and find a map to the treasure!");
      output.push("<strong>Congratulations! You solved the puzzle and won the game!</strong>");
    }
    else {
      output.push(`Nothing happens when you use the ${item}.`);
    }
  }
  // Process help command
  else if (command === "help") {
    showAdventureHelp();
    return;
  }
  // Unknown command
  else {
    output.push("I don't understand that command. Try 'help' for instructions.");
  }
  
  updateAdventureOutput(output.join("<br>"));
}

function showAdventureHelp() {
  const helpText = `
    <strong>Available commands:</strong><br>
    - north/south/east/west (or go [direction]) - Move in that direction<br>
    - look - Look around the current location<br>
    - inventory - Check your inventory<br>
    - take [item] - Pick up an item<br>
    - use [item] - Use an item from your inventory<br>
    - help - Show this help message<br><br>
    <strong>Game objective:</strong> Find the treasure!
  `;
  updateAdventureOutput(helpText);
}

function updateAdventureOutput(text) {
  const outputDiv = document.getElementById('adventureOutput');
  outputDiv.innerHTML += `<p>> ${text}</p>`;
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

// Initialize text adventure
startNewAdventure();

// Hangman Game (y-6)
const hangmanWords = {
  animals: ["elephant", "giraffe", "kangaroo", "penguin", "rhinoceros", "octopus"],
  countries: ["canada", "brazil", "japan", "australia", "germany", "egypt"],
  movies: ["inception", "titanic", "avatar", "jaws", "frozen", "gravity"]
};

let hangmanWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

const hangmanArt = [
  `
     +---+
     |   |
         |
         |
         |
         |
  =========
  `,
  `
     +---+
     |   |
     O   |
         |
         |
         |
  =========
  `,
  `
     +---+
     |   |
     O   |
     |   |
         |
         |
  =========
  `,
  `
     +---+
     |   |
     O   |
    /|   |
         |
         |
  =========
  `,
  `
     +---+
     |   |
     O   |
    /|\\  |
         |
         |
  =========
  `,
  `
     +---+
     |   |
     O   |
    /|\\  |
    /    |
         |
  =========
  `,
  `
     +---+
     |   |
     O   |
    /|\\  |
    / \\  |
         |
  =========
  `
];

function startHangmanGame() {
  const category = document.getElementById('hangmanCategory').value;
  const words = hangmanWords[category];
  hangmanWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongGuesses = 0;
  
  updateHangmanDisplay();
  createLetterButtons();
  
  document.getElementById('hangmanMessage').textContent = "";
}

function createLetterButtons() {
  const lettersDiv = document.getElementById('hangmanLetters');
  lettersDiv.innerHTML = "";
  
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(97 + i);
    const button = document.createElement('button');
    button.className = 'letter-btn';
    button.textContent = letter;
    button.onclick = () => guessLetter(letter);
    lettersDiv.appendChild(button);
  }
}

function guessLetter(letter) {
  if (guessedLetters.includes(letter)) return;
  
  guessedLetters.push(letter);
  
  if (!hangmanWord.includes(letter)) {
    wrongGuesses++;
  }
  
  updateHangmanDisplay();
  checkGameStatus();
}

function updateHangmanDisplay() {
  // Update hangman drawing
  document.getElementById('hangmanArt').textContent = hangmanArt[wrongGuesses];
  
  // Update word display
  let displayWord = "";
  for (const char of hangmanWord) {
    if (guessedLetters.includes(char)) {
      displayWord += char + " ";
    } else {
      displayWord += "_ ";
    }
  }
  document.getElementById('hangmanWord').textContent = displayWord.trim();
  
  // Update letter buttons
  const buttons = document.querySelectorAll('.letter-btn');
  buttons.forEach(button => {
    const letter = button.textContent;
    if (guessedLetters.includes(letter)) {
      button.disabled = true;
      button.style.backgroundColor = hangmanWord.includes(letter) ? "#4CAF50" : "#F44336";
    }
  });
}

function checkGameStatus() {
  const messageDiv = document.getElementById('hangmanMessage');
  
  // Check for win
  const isWin = [...hangmanWord].every(letter => guessedLetters.includes(letter));
  if (isWin) {
    messageDiv.textContent = "Congratulations! You won!";
    messageDiv.style.color = "#4CAF50";
    disableAllLetterButtons();
    return;
  }
  
  // Check for loss
  if (wrongGuesses >= maxWrongGuesses) {
    messageDiv.textContent = `Game over! The word was "${hangmanWord}".`;
    messageDiv.style.color = "#F44336";
    disableAllLetterButtons();
    return;
  }
}

function disableAllLetterButtons() {
  const buttons = document.querySelectorAll('.letter-btn');
  buttons.forEach(button => {
    button.disabled = true;
  });
}

// Tic-Tac-Toe (y-7)
let ticTacToeBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function startTicTacToeGame() {
  ticTacToeBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  
  renderTicTacToeBoard();
  document.getElementById('ticTacToeMessage').textContent = `Player ${currentPlayer}'s turn`;
}

function renderTicTacToeBoard() {
  const boardDiv = document.getElementById('ticTacToeBoard');
  boardDiv.innerHTML = "";
  
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'tic-tac-toe-cell';
    cell.dataset.index = i;
    cell.textContent = ticTacToeBoard[i];
    cell.onclick = () => handleCellClick(i);
    boardDiv.appendChild(cell);
  }
}

function handleCellClick(index) {
  if (!gameActive || ticTacToeBoard[index] !== "") return;
  
  ticTacToeBoard[index] = currentPlayer;
  renderTicTacToeBoard();
  
  if (checkWin()) {
    document.getElementById('ticTacToeMessage').textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }
  
  if (checkDraw()) {
    document.getElementById('ticTacToeMessage').textContent = "It's a draw!";
    gameActive = false;
    return;
  }
  
  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById('ticTacToeMessage').textContent = `Player ${currentPlayer}'s turn`;
  
  // Computer move if it's O's turn and game is in medium/hard mode
  const difficulty = document.getElementById('ticTacToeDifficulty').value;
  if (currentPlayer === "O" && difficulty !== "easy" && gameActive) {
    setTimeout(() => makeComputerMove(difficulty), 500);
  }
}

function makeComputerMove(difficulty) {
  let moveIndex;
  
  if (difficulty === "hard") {
    // Try to win if possible
    moveIndex = findWinningMove("O");
    if (moveIndex === -1) {
      // Block player's winning move
      moveIndex = findWinningMove("X");
      if (moveIndex === -1) {
        // Choose center if available
        if (ticTacToeBoard[4] === "") {
          moveIndex = 4;
        } else {
          // Choose random corner
          const corners = [0, 2, 6, 8].filter(i => ticTacToeBoard[i] === "");
          if (corners.length > 0) {
            moveIndex = corners[Math.floor(Math.random() * corners.length)];
          } else {
            // Choose random available move
            const availableMoves = ticTacToeBoard.map((cell, index) => cell === "" ? index : -1).filter(i => i !== -1);
            moveIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
          }
        }
      }
    }
  } else {
    // Medium difficulty - sometimes makes optimal moves, sometimes random
    if (Math.random() > 0.5) {
      moveIndex = findWinningMove("O");
      if (moveIndex === -1) {
        moveIndex = findWinningMove("X");
      }
    }
    
    if (moveIndex === undefined || moveIndex === -1) {
      const availableMoves = ticTacToeBoard.map((cell, index) => cell === "" ? index : -1).filter(i => i !== -1);
      moveIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
  }
  
  if (moveIndex !== undefined && moveIndex !== -1) {
    ticTacToeBoard[moveIndex] = "O";
    renderTicTacToeBoard();
    
    if (checkWin()) {
      document.getElementById('ticTacToeMessage').textContent = "Computer wins!";
      gameActive = false;
      return;
    }
    
    if (checkDraw()) {
      document.getElementById('ticTacToeMessage').textContent = "It's a draw!";
      gameActive = false;
      return;
    }
    
    currentPlayer = "X";
    document.getElementById('ticTacToeMessage').textContent = `Player ${currentPlayer}'s turn`;
  }
}

function findWinningMove(player) {
  // Check rows
  for (let i = 0; i < 9; i += 3) {
    const row = [ticTacToeBoard[i], ticTacToeBoard[i+1], ticTacToeBoard[i+2]];
    if (row.filter(cell => cell === player).length === 2 && row.includes("")) {
      return i + row.indexOf("");
    }
  }
  
  // Check columns
  for (let i = 0; i < 3; i++) {
    const col = [ticTacToeBoard[i], ticTacToeBoard[i+3], ticTacToeBoard[i+6]];
    if (col.filter(cell => cell === player).length === 2 && col.includes("")) {
      return i + (col.indexOf("") * 3);
    }
  }
  
  // Check diagonals
  const diag1 = [ticTacToeBoard[0], ticTacToeBoard[4], ticTacToeBoard[8]];
  if (diag1.filter(cell => cell === player).length === 2 && diag1.includes("")) {
    return diag1.indexOf("") * 4;
  }
  
  const diag2 = [ticTacToeBoard[2], ticTacToeBoard[4], ticTacToeBoard[6]];
  if (diag2.filter(cell => cell === player).length === 2 && diag2.includes("")) {
    return 2 + (diag2.indexOf("") * 2);
  }
  
  return -1;
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return ticTacToeBoard[a] && ticTacToeBoard[a] === ticTacToeBoard[b] && ticTacToeBoard[a] === ticTacToeBoard[c];
  });
}

function checkDraw() {
  return ticTacToeBoard.every(cell => cell !== "");
}

// Initialize Tic-Tac-Toe
startTicTacToeGame();

// Memory Game (y-8)
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let memoryGameActive = false;

function startMemoryGame() {
  const difficulty = document.getElementById('memoryDifficulty').value;
  let cardCount = 16; // 4x4
  
  if (difficulty === "medium") cardCount = 36; // 6x6
  else if (difficulty === "hard") cardCount = 64; // 8x8
  
  // Create pairs of cards
  const symbols = ["🍎", "🍌", "🍒", "🍓", "🍊", "🍋", "🍍", "🥝", "🥥", "🍇", "🍉", "🍈", "🍐", "🥭", "🫐", "🍏"];
  const pairsNeeded = cardCount / 2;
  const selectedSymbols = symbols.slice(0, pairsNeeded);
  
  memoryCards = [...selectedSymbols, ...selectedSymbols];
  
  // Shuffle cards
  for (let i = memoryCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [memoryCards[i], memoryCards[j]] = [memoryCards[j], memoryCards[i]];
  }
  
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  memoryGameActive = true;
  
  updateMemoryGameDisplay();
  renderMemoryBoard();
}

function renderMemoryBoard() {
  const boardDiv = document.getElementById('memoryGameBoard');
  boardDiv.innerHTML = "";
  
  const difficulty = document.getElementById('memoryDifficulty').value;
  const columns = difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 8;
  boardDiv.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  
  memoryCards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.index = index;
    card.dataset.symbol = symbol;
    card.dataset.flipped = "false";
    card.textContent = "?";
    card.onclick = () => flipMemoryCard(index);
    boardDiv.appendChild(card);
  });
  
  document.getElementById('memoryMoves').textContent = moves;
  document.getElementById('memoryPairs').textContent = matchedPairs;
  document.getElementById('memoryTotalPairs').textContent = memoryCards.length / 2;
}

function flipMemoryCard(index) {
  if (!memoryGameActive || flippedCards.length >= 2 || flippedCards.includes(index) || memoryCards[index] === null) {
    return;
  }
  
  const card = document.querySelector(`.memory-card[data-index="${index}"]`);
  card.textContent = memoryCards[index];
  card.dataset.flipped = "true";
  flippedCards.push(index);
  
  if (flippedCards.length === 2) {
    moves++;
    document.getElementById('memoryMoves').textContent = moves;
    
    const [firstIndex, secondIndex] = flippedCards;
    if (memoryCards[firstIndex] === memoryCards[secondIndex]) {
      // Match found
      matchedPairs++;
      document.getElementById('memoryPairs').textContent = matchedPairs;
      
      // Remove matched cards
      memoryCards[firstIndex] = null;
      memoryCards[secondIndex] = null;
      
      setTimeout(() => {
        document.querySelector(`.memory-card[data-index="${firstIndex}"]`).style.visibility = "hidden";
        document.querySelector(`.memory-card[data-index="${secondIndex}"]`).style.visibility = "hidden";
        flippedCards = [];
        
        // Check for win
        if (matchedPairs === memoryCards.length / 2) {
          memoryGameActive = false;
          setTimeout(() => alert(`Congratulations! You won in ${moves} moves!`), 500);
        }
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        document.querySelector(`.memory-card[data-index="${firstIndex}"]`).textContent = "?";
        document.querySelector(`.memory-card[data-index="${secondIndex}"]`).textContent = "?";
        document.querySelector(`.memory-card[data-index="${firstIndex}"]`).dataset.flipped = "false";
        document.querySelector(`.memory-card[data-index="${secondIndex}"]`).dataset.flipped = "false";
        flippedCards = [];
      }, 1000);
    }
  }
}

function updateMemoryGameDisplay() {
  document.getElementById('memoryMoves').textContent = moves;
  document.getElementById('memoryPairs').textContent = matchedPairs;
  document.getElementById('memoryTotalPairs').textContent = memoryCards.length / 2;
}

// Simon Game (y-9)
let simonSequence = [];
let playerSequence = [];
let level = 1;
let score = 0;
let strictMode = false;
let simonPlaying = false;

function startSimonGame() {
  simonSequence = [];
  playerSequence = [];
  level = 1;
  score = 0;
  simonPlaying = false;
  
  document.getElementById('simonLevel').textContent = level;
  document.getElementById('simonScore').textContent = score;
  document.getElementById('simonGameMessage').textContent = "";
  
  addToSimonSequence();
  playSimonSequence();
}

function toggleStrictMode() {
  strictMode = !strictMode;
  document.getElementById('simonStrictBtn').textContent = `Strict Mode: ${strictMode ? "On" : "Off"}`;
}

function addToSimonSequence() {
  const colors = ["green", "red", "yellow", "blue"];
  simonSequence.push(colors[Math.floor(Math.random() * 4)]);
}

function playSimonSequence() {
  simonPlaying = true;
  disableSimonButtons();
  
  let i = 0;
  const interval = setInterval(() => {
    if (i >= simonSequence.length) {
      clearInterval(interval);
      simonPlaying = false;
      enableSimonButtons();
      return;
    }
    
    const color = simonSequence[i];
    highlightSimonButton(color);
    i++;
  }, 800);
}

function highlightSimonButton(color) {
  const button = document.querySelector(`.simon-button.${color}`);
  button.classList.add('active');
  
  // Play sound (in a real app, you would use actual sound files)
  const sounds = {
    green: 523.25,
    red: 587.33,
    yellow: 659.25,
    blue: 783.99
  };
  
  // This is a simple beep using Web Audio API
  if (window.AudioContext) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = sounds[color];
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      button.classList.remove('active');
    }, 500);
  } else {
    setTimeout(() => button.classList.remove('active'), 500);
  }
}

function handleSimonButtonClick(color) {
  if (simonPlaying) return;
  
  highlightSimonButton(color);
  playerSequence.push(color);
  
  // Check if player's move matches the sequence
  if (playerSequence[playerSequence.length - 1] !== simonSequence[playerSequence.length - 1]) {
    // Wrong sequence
    document.getElementById('simonGameMessage').textContent = "Wrong sequence! Try again.";
    document.getElementById('simonGameMessage').style.color = "#F44336";
    
    if (strictMode) {
      setTimeout(startSimonGame, 1000);
    } else {
      setTimeout(() => {
        playerSequence = [];
        document.getElementById('simonGameMessage').textContent = "";
        playSimonSequence();
      }, 1000);
    }
    return;
  }
  
  // Check if player completed the sequence
  if (playerSequence.length === simonSequence.length) {
    // Level completed
    level++;
    score += level * 10;
    document.getElementById('simonLevel').textContent = level;
    document.getElementById('simonScore').textContent = score;
    document.getElementById('simonGameMessage').textContent = "Correct! Next level...";
    document.getElementById('simonGameMessage').style.color = "#4CAF50";
    
    playerSequence = [];
    addToSimonSequence();
    
    setTimeout(() => {
      document.getElementById('simonGameMessage').textContent = "";
      playSimonSequence();
    }, 1000);
  }
}

function disableSimonButtons() {
  document.querySelectorAll('.simon-button').forEach(button => {
    button.style.pointerEvents = "none";
    button.style.opacity = "0.6";
  });
}

function enableSimonButtons() {
  document.querySelectorAll('.simon-button').forEach(button => {
    button.style.pointerEvents = "auto";
    button.style.opacity = "1";
    button.onclick = () => handleSimonButtonClick(button.dataset.color);
  });
}

// Slot Machine Simulator (y-10)
const slotSymbols = ["🍒", "🍋", "🍊", "🍇", "🍉", "🔔", "7️⃣", "💰"];
let credits = 100;
let currentBet = 1;
let lastWin = 0;

function spinSlotMachine() {
  if (credits < currentBet) {
    document.getElementById('slotMachineMessage').textContent = "Not enough credits!";
    return;
  }
  
  credits -= currentBet;
  updateSlotDisplay();
  
  // Spin animation
  const reels = document.querySelectorAll('.slot-reel');
  reels.forEach(reel => {
    reel.innerHTML = "";
    reel.style.animation = "none";
    void reel.offsetWidth; // Trigger reflow
    reel.style.animation = "spin 0.5s 5";
  });
  
  setTimeout(() => {
    // Determine results
    const results = [
      slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
      slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
      slotSymbols[Math.floor(Math.random() * slotSymbols.length)]
    ];
    
    // Display results
    reels.forEach((reel, index) => {
      reel.innerHTML = `<div class="slot-symbol">${results[index]}</div>`;
    });
    
    // Check for wins
    const winAmount = calculateSlotWin(results);
    if (winAmount > 0) {
      credits += winAmount;
      lastWin = winAmount;
      document.getElementById('slotMachineMessage').textContent = `You won ${winAmount} credits!`;
    } else {
      document.getElementById('slotMachineMessage').textContent = "Try again!";
    }
    
    updateSlotDisplay();
  }, 2500);
}

function calculateSlotWin(results) {
  // Check for three of a kind
  if (results[0] === results[1] && results[1] === results[2]) {
    const symbol = results[0];
    const basePayout = {
      "🍒": 2,
      "🍋": 3,
      "🍊": 4,
      "🍇": 5,
      "🍉": 10,
      "🔔": 15,
      "7️⃣": 25,
      "💰": 50
    };
    return basePayout[symbol] * currentBet;
  }
  
  // Check for two of a kind
  if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
    return currentBet; // Return the bet amount
  }
  
  return 0;
}

function changeSlotBet(change) {
  const newBet = currentBet + change;
  if (newBet >= 1 && newBet <= 10) {
    currentBet = newBet;
    updateSlotDisplay();
  }
}

function resetSlotMachine() {
  credits = 100;
  currentBet = 1;
  lastWin = 0;
  updateSlotDisplay();
  document.getElementById('slotMachineMessage').textContent = "Game reset!";
}

function updateSlotDisplay() {
  document.getElementById('slotCredits').textContent = credits;
  document.getElementById('slotBet').textContent = currentBet;
  document.getElementById('slotLastWin').textContent = lastWin;
}


// Moon Phase Calculator (z-1)
function calculateMoonPhase() {
  const dateInput = document.getElementById('moonPhaseDate').value;
  const date = dateInput ? new Date(dateInput) : new Date();
  
  // Simple moon phase calculation (approximation)
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  // Calculate moon phase (0-29.5 days)
  const c = Math.floor(year / 100);
  const y = year % 100;
  let m = month + 1;
  if (m < 3) {
    y--;
    m += 12;
  }
  const a = Math.floor(y / 4);
  const b = Math.floor(c / 4);
  const e = Math.floor(365.25 * (y + 4716));
  const f = Math.floor(30.6001 * (m + 1));
  const jd = a + b + e + f + day - 1524.5;
  const daysSinceNew = (jd - 2451549.5) % 29.530588853;
  
  let phase;
  let phaseName;
  let illumination;
  
  if (daysSinceNew < 1.84566) {
    phase = 'new';
    phaseName = 'New Moon';
    illumination = 0;
  } else if (daysSinceNew < 5.53699) {
    phase = 'waxing-crescent';
    phaseName = 'Waxing Crescent';
    illumination = Math.round((daysSinceNew / 7.38265) * 100);
  } else if (daysSinceNew < 7.38265) {
    phase = 'first-quarter';
    phaseName = 'First Quarter';
    illumination = 50;
  } else if (daysSinceNew < 11.07399) {
    phase = 'waxing-gibbous';
    phaseName = 'Waxing Gibbous';
    illumination = 50 + Math.round(((daysSinceNew - 7.38265) / 7.38265) * 50);
  } else if (daysSinceNew < 13.82032) {
    phase = 'full';
    phaseName = 'Full Moon';
    illumination = 100;
  } else if (daysSinceNew < 17.51166) {
    phase = 'waning-gibbous';
    phaseName = 'Waning Gibbous';
    illumination = 100 - Math.round(((daysSinceNew - 13.82032) / 7.38265) * 50);
  } else if (daysSinceNew < 19.29799) {
    phase = 'last-quarter';
    phaseName = 'Last Quarter';
    illumination = 50;
  } else {
    phase = 'waning-crescent';
    phaseName = 'Waning Crescent';
    illumination = 50 - Math.round(((daysSinceNew - 19.29799) / (29.530588853 - 19.29799)) * 50);
  }
  
  // Update visual
  const moonVisual = document.getElementById('moonVisual');
  moonVisual.innerHTML = '';
  moonVisual.className = 'moon-visual ' + phase;
  
  // Update details
  document.getElementById('moonDetails').innerHTML = `
    <p><strong>${phaseName}</strong></p>
    <p>Illumination: ${illumination}%</p>
    <p>Date: ${date.toDateString()}</p>
  `;
}

// Tide Calculator (z-2)
function calculateTides() {
  const dateInput = document.getElementById('tideDate').value;
  const date = dateInput ? new Date(dateInput) : new Date();
  const location = document.getElementById('tideLocation').value;
  
  // Simple tide estimation based on moon phase (not accurate)
  const day = date.getDate();
  const hour = date.getHours();
  
  // Estimate high and low tides based on location and time
  let high1, high2, low1, low2;
  const offset = day % 24; // Simple pattern based on day of month
  
  switch(location) {
    case 'atlantic':
      high1 = (6 + offset) % 24;
      low1 = (12 + offset) % 24;
      high2 = (18 + offset) % 24;
      low2 = (0 + offset) % 24;
      break;
    case 'pacific':
      high1 = (4 + offset) % 24;
      low1 = (10 + offset) % 24;
      high2 = (16 + offset) % 24;
      low2 = (22 + offset) % 24;
      break;
    case 'gulf':
      high1 = (8 + offset) % 24;
      low1 = (2 + offset) % 24;
      high2 = (20 + offset) % 24;
      low2 = (14 + offset) % 24;
      break;
    case 'great_lakes':
      high1 = (5 + offset) % 24;
      low1 = (11 + offset) % 24;
      high2 = (17 + offset) % 24;
      low2 = (23 + offset) % 24;
      break;
  }
  
  // Update results
  document.getElementById('tideResults').innerHTML = `
    <p><strong>Tide Times for ${date.toDateString()}</strong></p>
    <p>First High Tide: ${high1}:00</p>
    <p>First Low Tide: ${low1}:00</p>
    <p>Second High Tide: ${high2}:00</p>
    <p>Second Low Tide: ${low2}:00</p>
  `;
  
  // Simple chart
  const tideChart = document.getElementById('tideChart');
  tideChart.innerHTML = `
    <p>Tide Pattern (approximate):</p>
    <div class="tide-chart-visual">
      <div class="tide-high">High<br>${high1}:00</div>
      <div class="tide-low">Low<br>${low1}:00</div>
      <div class="tide-high">High<br>${high2}:00</div>
      <div class="tide-low">Low<br>${low2}:00</div>
    </div>
    <p class="tide-note">Note: This is a simplified estimation. Actual tides may vary.</p>
  `;
}

// Sun Position Calculator (z-3)
function calculateSunPosition() {
  const dateTimeInput = document.getElementById('sunDateTime').value;
  const dateTime = dateTimeInput ? new Date(dateTimeInput) : new Date();
  const lat = parseFloat(document.getElementById('sunLatitude').value) || 40.7128;
  const lng = parseFloat(document.getElementById('sunLongitude').value) || -74.0060;
  
  // Simple sun position calculation (approximation)
  const time = dateTime.getHours() + dateTime.getMinutes() / 60;
  const dayOfYear = getDayOfYear(dateTime);
  const declination = 23.45 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81));
  const hourAngle = (time - 12) * 15;
  const elevation = Math.asin(
    Math.sin(lat * Math.PI / 180) * Math.sin(declination * Math.PI / 180) +
    Math.cos(lat * Math.PI / 180) * Math.cos(declination * Math.PI / 180) * Math.cos(hourAngle * Math.PI / 180)
  ) * 180 / Math.PI;
  
  const azimuth = Math.acos(
    (Math.sin(declination * Math.PI / 180) - Math.sin(elevation * Math.PI / 180) * Math.sin(lat * Math.PI / 180)) /
    (Math.cos(elevation * Math.PI / 180) * Math.cos(lat * Math.PI / 180))
  ) * 180 / Math.PI;
  
  const adjustedAzimuth = hourAngle > 0 ? 360 - azimuth : azimuth;
  
  // Update results
  document.getElementById('sunPositionResults').innerHTML = `
    <p><strong>Sun Position on ${dateTime.toLocaleString()}</strong></p>
    <p>Elevation: ${elevation.toFixed(2)}°</p>
    <p>Azimuth: ${adjustedAzimuth.toFixed(2)}°</p>
    <p>Location: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°W</p>
  `;
  
  // Update compass
  const sunCompass = document.getElementById('sunCompass');
  sunCompass.innerHTML = `
    <div class="compass-circle">
      <div class="compass-arrow" style="transform: rotate(${adjustedAzimuth}deg);">
        <div class="compass-sun" style="bottom: ${elevation / 90 * 100}%;"></div>
      </div>
      <div class="compass-n">N</div>
      <div class="compass-e">E</div>
      <div class="compass-s">S</div>
      <div class="compass-w">W</div>
    </div>
  `;
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Sunrise/Sunset Calculator (z-4)
function calculateSunriseSunset() {
  const dateInput = document.getElementById('sunriseDate').value;
  const date = dateInput ? new Date(dateInput) : new Date();
  const lat = parseFloat(document.getElementById('sunriseLatitude').value) || 40.7128;
  const lng = parseFloat(document.getElementById('sunriseLongitude').value) || -74.0060;
  
  // Simple sunrise/sunset calculation (approximation)
  const dayOfYear = getDayOfYear(date);
  const declination = 23.45 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81));
  
  const zenith = 90.833;
  const latRad = lat * Math.PI / 180;
  const decRad = declination * Math.PI / 180;
  
  const cosH = (Math.cos(zenith * Math.PI / 180) - Math.sin(latRad) * Math.sin(decRad)) / 
               (Math.cos(latRad) * Math.cos(decRad));
  
  let sunrise, sunset;
  if (cosH > 1 || cosH < -1) {
    // No sunrise/sunset (polar day or night)
    sunrise = sunset = cosH > 1 ? "No sunrise (Polar Night)" : "No sunset (Midnight Sun)";
  } else {
    const H = Math.acos(cosH) * 180 / Math.PI;
    const sunriseTime = 12 - H / 15 - (lng / 15);
    const sunsetTime = 12 + H / 15 - (lng / 15);
    
    sunrise = formatTime(sunriseTime);
    sunset = formatTime(sunsetTime);
  }
  
  // Update results
  document.getElementById('sunTimesResults').innerHTML = `
    <p><strong>Sun Times for ${date.toDateString()}</strong></p>
    <p>Sunrise: ${sunrise}</p>
    <p>Sunset: ${sunset}</p>
    <p>Location: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°W</p>
  `;
  
  // Simple daylight chart
  const daylightChart = document.getElementById('daylightChart');
  daylightChart.innerHTML = `
    <div class="daylight-bar">
      <div class="night-time" style="width: ${sunrise === "No sunrise (Polar Night)" ? 100 : sunset === "No sunset (Midnight Sun)" ? 0 : (parseFloat(sunrise.split(':')[0]) + parseFloat(sunrise.split(':')[1]) / 60) / 24 * 100}%;"></div>
      <div class="day-time" style="width: ${sunrise === "No sunrise (Polar Night)" ? 0 : sunset === "No sunset (Midnight Sun)" ? 100 : (parseFloat(sunset.split(':')[0]) + parseFloat(sunset.split(':')[1]) / 60 - parseFloat(sunrise.split(':')[0]) - parseFloat(sunrise.split(':')[1]) / 60) / 24 * 100}%;"></div>
      <div class="night-time" style="width: ${sunrise === "No sunrise (Polar Night)" ? 0 : sunset === "No sunset (Midnight Sun)" ? 0 : (24 - parseFloat(sunset.split(':')[0]) - parseFloat(sunset.split(':')[1]) / 60) / 24 * 100}%;"></div>
    </div>
    <div class="daylight-labels">
      <span>12 AM</span>
      <span>6 AM</span>
      <span>12 PM</span>
      <span>6 PM</span>
      <span>12 AM</span>
    </div>
  `;
}

function formatTime(time) {
  if (typeof time === 'string') return time;
  
  const hours = Math.floor(time);
  const minutes = Math.floor((time - hours) * 60);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

// Daylight Saving Time Checker (z-5)
function checkDST() {
  const dateInput = document.getElementById('dstDate').value;
  const date = dateInput ? new Date(dateInput) : new Date();
  const location = document.getElementById('dstLocation').value;
  
  let isDST = false;
  let startDate, endDate;
  const year = date.getFullYear();
  
  switch(location) {
    case 'us':
      // US DST: Second Sunday March to First Sunday November
      startDate = new Date(year, 2, 1);
      while (startDate.getDay() !== 0) startDate.setDate(startDate.getDate() + 1);
      startDate.setDate(startDate.getDate() + 7); // Second Sunday
      
      endDate = new Date(year, 10, 1);
      while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() + 1);
      
      isDST = date >= startDate && date < endDate;
      break;
      
    case 'eu':
      // EU DST: Last Sunday March to Last Sunday October
      startDate = new Date(year, 2, 31);
      while (startDate.getDay() !== 0) startDate.setDate(startDate.getDate() - 1);
      
      endDate = new Date(year, 9, 31);
      while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() - 1);
      
      isDST = date >= startDate && date < endDate;
      break;
      
    case 'uk':
      // Same as EU
      startDate = new Date(year, 2, 31);
      while (startDate.getDay() !== 0) startDate.setDate(startDate.getDate() - 1);
      
      endDate = new Date(year, 9, 31);
      while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() - 1);
      
      isDST = date >= startDate && date < endDate;
      break;
      
    case 'au':
      // Australia DST: First Sunday October to First Sunday April
      startDate = new Date(year, 9, 1);
      while (startDate.getDay() !== 0) startDate.setDate(startDate.getDate() + 1);
      
      endDate = new Date(year + 1, 3, 1);
      while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() + 1);
      
      isDST = date >= startDate && date < endDate;
      break;
      
    case 'nz':
      // New Zealand DST: Last Sunday September to First Sunday April
      startDate = new Date(year, 8, 30);
      while (startDate.getDay() !== 0) startDate.setDate(startDate.getDate() - 1);
      
      endDate = new Date(year + 1, 3, 1);
      while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() + 1);
      
      isDST = date >= startDate && date < endDate;
      break;
  }
  
  // Update results
  document.getElementById('dstResults').innerHTML = `
    <p><strong>Daylight Saving Time on ${date.toDateString()}</strong></p>
    <p>Status: <strong>${isDST ? 'Active' : 'Not Active'}</strong></p>
    <p>Location: ${getLocationName(location)}</p>
  `;
  
  document.getElementById('dstInfo').innerHTML = `
    <p>${isDST ? 'Clocks are set forward 1 hour.' : 'Standard time is in effect.'}</p>
    <p>${getDSTDates(year, location)}</p>
  `;
}

function getLocationName(location) {
  const names = {
    'us': 'United States',
    'eu': 'European Union',
    'uk': 'United Kingdom',
    'au': 'Australia',
    'nz': 'New Zealand'
  };
  return names[location] || location;
}

function getDSTDates(year, location) {
  let startDate, endDate;
  
  switch(location) {
    case 'us':
      startDate = new Date(year, 2, 1);
      while (startDate.getDay() !== 0) startDate.setDate(startDate.getDate() + 1);
      startDate.setDate(startDate.getDate() + 7);
      
      endDate = new Date(year, 10, 1);
      while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() + 1);
      break;
      
    case 'eu':
    case 'uk':
      startDate = new Date(year, 2, 31);
      while (startDate.getDay() !== 0) startDate.setDate(startDate.getDate() - 1);
      
      endDate = new Date(year, 9, 31);
      while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() - 1);
      break;
      
    case 'au':
      startDate = new Date(year, 9, 1);
      while (startDate.getDay() !== 0) startDate.setDate(startDate.getDate() + 1);
      
      endDate = new Date(year + 1, 3, 1);
      while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() + 1);
      break;
      
    case 'nz':
      startDate = new Date(year, 8, 30);
      while (startDate.getDay() !== 0) startDate.setDate(startDate.getDate() - 1);
      
      endDate = new Date(year + 1, 3, 1);
      while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() + 1);
      break;
  }
  
  return `DST Period: ${startDate.toDateString()} to ${endDate.toDateString()}`;
}

// Leap Year Checker (z-6)
function checkLeapYear() {
  const year = parseInt(document.getElementById('leapYear').value);
  
  let isLeap = false;
  if (year % 4 !== 0) {
    isLeap = false;
  } else if (year % 100 !== 0) {
    isLeap = true;
  } else if (year % 400 !== 0) {
    isLeap = false;
  } else {
    isLeap = true;
  }
  
  // Update results
  document.getElementById('leapYearResults').innerHTML = `
    <p><strong>${year} is ${isLeap ? '' : 'not '}a leap year</strong></p>
    <p>February has ${isLeap ? '29' : '28'} days</p>
    <p>Year has ${isLeap ? '366' : '365'} days</p>
  `;
  
  document.getElementById('leapYearInfo').innerHTML = `
    <p>Leap years are divisible by 4, but not by 100 unless also divisible by 400.</p>
    <p>Next leap year: ${getNextLeapYear(year)}</p>
    <p>Previous leap year: ${getPreviousLeapYear(year)}</p>
  `;
}

function getNextLeapYear(year) {
  let nextYear = year + 1;
  while (true) {
    if ((nextYear % 4 === 0 && nextYear % 100 !== 0) || nextYear % 400 === 0) {
      return nextYear;
    }
    nextYear++;
  }
}

function getPreviousLeapYear(year) {
  let prevYear = year - 1;
  while (prevYear >= 0) {
    if ((prevYear % 4 === 0 && prevYear % 100 !== 0) || prevYear % 400 === 0) {
      return prevYear;
    }
    prevYear--;
  }
  return "None";
}

// Season Calculator (z-7)
function calculateSeason() {
  const dateInput = document.getElementById('seasonDate').value;
  const date = dateInput ? new Date(dateInput) : new Date();
  const hemisphere = document.getElementById('seasonHemisphere').value;
  
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();
  
  let season;
  let seasonEmoji;
  
  if (hemisphere === 'northern') {
    if ((month === 12 && day >= 21) || month === 1 || month === 2 || (month === 3 && day < 20)) {
      season = 'Winter';
      seasonEmoji = '⛄';
    } else if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day < 21)) {
      season = 'Spring';
      seasonEmoji = '🌸';
    } else if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day < 23)) {
      season = 'Summer';
      seasonEmoji = '☀️';
    } else {
      season = 'Autumn';
      seasonEmoji = '🍂';
    }
  } else {
    if ((month === 12 && day >= 21) || month === 1 || month === 2 || (month === 3 && day < 20)) {
      season = 'Summer';
      seasonEmoji = '☀️';
    } else if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day < 21)) {
      season = 'Autumn';
      seasonEmoji = '🍂';
    } else if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day < 23)) {
      season = 'Winter';
      seasonEmoji = '⛄';
    } else {
      season = 'Spring';
      seasonEmoji = '🌸';
    }
  }
  
  // Update results
  document.getElementById('seasonResults').innerHTML = `
    <p><strong>Season on ${date.toDateString()}</strong></p>
    <p>${seasonEmoji} ${season} ${seasonEmoji}</p>
    <p>Hemisphere: ${hemisphere === 'northern' ? 'Northern' : 'Southern'}</p>
  `;
  
  // Update visual
  const seasonVisual = document.getElementById('seasonVisual');
  seasonVisual.innerHTML = '';
  seasonVisual.className = 'season-visual ' + season.toLowerCase();
}

// Zodiac Sign Calculator (z-8)
function calculateZodiac() {
  const dateInput = document.getElementById('zodiacDate').value;
  const date = dateInput ? new Date(dateInput) : new Date();
  
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();
  
  let sign;
  let symbol;
  let dates;
  let traits;
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    sign = 'Aries';
    symbol = '♈';
    dates = 'March 21 - April 19';
    traits = 'Courageous, energetic, willful, commanding, leading.';
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    sign = 'Taurus';
    symbol = '♉';
    dates = 'April 20 - May 20';
    traits = 'Pleasure seeking, loves control, dependable, grounded.';
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    sign = 'Gemini';
    symbol = '♊';
    dates = 'May 21 - June 20';
    traits = 'Cerebral, chatty, loves learning and education, charming.';
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    sign = 'Cancer';
    symbol = '♋';
    dates = 'June 21 - July 22';
    traits = 'Emotional, group oriented, seeks security, family.';
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    sign = 'Leo';
    symbol = '♌';
    dates = 'July 23 - August 22';
    traits = 'Generous, organized, protective, beautiful.';
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    sign = 'Virgo';
    symbol = '♍';
    dates = 'August 23 - September 22';
    traits = 'Particular, logical, practical, sense of duty, critical.';
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    sign = 'Libra';
    symbol = '♎';
    dates = 'September 23 - October 22';
    traits = 'Balanced, seeks beauty, sense of justice.';
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    sign = 'Scorpio';
    symbol = '♏';
    dates = 'October 23 - November 21';
    traits = 'Passionate, exacting, loves extremes, combative, reflective.';
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    sign = 'Sagittarius';
    symbol = '♐';
    dates = 'November 22 - December 21';
    traits = 'Happy, absent minded, creative, adventurous.';
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    sign = 'Capricorn';
    symbol = '♑';
    dates = 'December 22 - January 19';
    traits = 'Timeless, driven, calculating, ambitious.';
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    sign = 'Aquarius';
    symbol = '♒';
    dates = 'January 20 - February 18';
    traits = 'Forward thinking, communicative, people oriented, stubborn, generous.';
  } else {
    sign = 'Pisces';
    symbol = '♓';
    dates = 'February 19 - March 20';
    traits = 'Likeable, energetic, passionate, sensitive.';
  }
  
  // Update results
  document.getElementById('zodiacResults').innerHTML = `
    <p><strong>Your Zodiac Sign</strong></p>
    <p>${symbol} ${sign} ${symbol}</p>
    <p>Dates: ${dates}</p>
    <p>Birthday: ${date.toDateString()}</p>
  `;
  
  document.getElementById('zodiacTraits').innerHTML = `
    <p><strong>Key Traits:</strong> ${traits}</p>
    <p><strong>Element:</strong> ${getZodiacElement(sign)}</p>
    <p><strong>Compatible With:</strong> ${getZodiacCompatibility(sign)}</p>
  `;
}

function getZodiacElement(sign) {
  const elements = {
    'Aries': 'Fire',
    'Taurus': 'Earth',
    'Gemini': 'Air',
    'Cancer': 'Water',
    'Leo': 'Fire',
    'Virgo': 'Earth',
    'Libra': 'Air',
    'Scorpio': 'Water',
    'Sagittarius': 'Fire',
    'Capricorn': 'Earth',
    'Aquarius': 'Air',
    'Pisces': 'Water'
  };
  return elements[sign] || 'Unknown';
}

function getZodiacCompatibility(sign) {
  const compatibility = {
    'Aries': 'Leo, Sagittarius, Gemini, Aquarius',
    'Taurus': 'Virgo, Capricorn, Cancer, Pisces',
    'Gemini': 'Libra, Aquarius, Aries, Leo',
    'Cancer': 'Scorpio, Pisces, Taurus, Virgo',
    'Leo': 'Aries, Sagittarius, Gemini, Libra',
    'Virgo': 'Taurus, Capricorn, Cancer, Scorpio',
    'Libra': 'Gemini, Aquarius, Leo, Sagittarius',
    'Scorpio': 'Cancer, Pisces, Virgo, Capricorn',
    'Sagittarius': 'Aries, Leo, Libra, Aquarius',
    'Capricorn': 'Taurus, Virgo, Scorpio, Pisces',
    'Aquarius': 'Gemini, Libra, Sagittarius, Aries',
    'Pisces': 'Cancer, Scorpio, Capricorn, Taurus'
  };
  return compatibility[sign] || 'Unknown';
}

// Chinese Zodiac Calculator (z-9)
function calculateChineseZodiac() {
  const year = parseInt(document.getElementById('chineseZodiacYear').value);
  
  const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
  
  const animalIndex = (year - 4) % 12;
  const elementIndex = Math.floor((year - 4) % 10 / 2);
  
  const animal = animals[animalIndex];
  const element = elements[elementIndex];
  
  // Update results
  document.getElementById('chineseZodiacResults').innerHTML = `
    <p><strong>Chinese Zodiac for ${year}</strong></p>
    <p>${getChineseZodiacEmoji(animal)} ${element} ${animal} ${getChineseZodiacEmoji(animal)}</p>
    <p>Year ${year} was the year of the ${element.toLowerCase()} ${animal.toLowerCase()}</p>
  `;
  
  document.getElementById('chineseZodiacTraits').innerHTML = `
    <p><strong>${animal} Traits:</strong> ${getChineseZodiacTraits(animal)}</p>
    <p><strong>${element} Influence:</strong> ${getChineseElementTraits(element)}</p>
    <p><strong>Compatible With:</strong> ${getChineseZodiacCompatibility(animal)}</p>
  `;
}

function getChineseZodiacEmoji(animal) {
  const emojis = {
    'Rat': '🐀',
    'Ox': '🐂',
    'Tiger': '🐅',
    'Rabbit': '🐇',
    'Dragon': '🐉',
    'Snake': '🐍',
    'Horse': '🐎',
    'Goat': '🐐',
    'Monkey': '🐒',
    'Rooster': '🐓',
    'Dog': '🐕',
    'Pig': '🐖'
  };
  return emojis[animal] || '';
}

function getChineseZodiacTraits(animal) {
  const traits = {
    'Rat': 'Quick-witted, resourceful, versatile, kind.',
    'Ox': 'Diligent, dependable, strong, determined.',
    'Tiger': 'Brave, confident, competitive, unpredictable.',
    'Rabbit': 'Quiet, elegant, kind, responsible.',
    'Dragon': 'Confident, intelligent, enthusiastic.',
    'Snake': 'Enigmatic, intelligent, wise.',
    'Horse': 'Animated, active, energetic.',
    'Goat': 'Calm, gentle, sympathetic.',
    'Monkey': 'Sharp, smart, curious.',
    'Rooster': 'Observant, hardworking, courageous.',
    'Dog': 'Lovely, honest, prudent.',
    'Pig': 'Compassionate, generous, diligent.'
  };
  return traits[animal] || 'Unknown';
}

function getChineseElementTraits(element) {
  const traits = {
    'Wood': 'Creative, idealistic, curious.',
    'Fire': 'Dynamic, passionate, bold.',
    'Earth': 'Reliable, balanced, patient.',
    'Metal': 'Resolute, persistent, disciplined.',
    'Water': 'Intuitive, sensitive, reflective.'
  };
  return traits[element] || 'Unknown';
}

function getChineseZodiacCompatibility(animal) {
  const compatibility = {
    'Rat': 'Dragon, Monkey, Ox',
    'Ox': 'Snake, Rooster, Rat',
    'Tiger': 'Horse, Dog, Pig',
    'Rabbit': 'Goat, Pig, Dog',
    'Dragon': 'Monkey, Rat, Rooster',
    'Snake': 'Rooster, Ox, Monkey',
    'Horse': 'Tiger, Dog, Goat',
    'Goat': 'Rabbit, Horse, Pig',
    'Monkey': 'Rat, Dragon, Snake',
    'Rooster': 'Ox, Snake, Dragon',
    'Dog': 'Tiger, Horse, Rabbit',
    'Pig': 'Rabbit, Goat, Tiger'
  };
  return compatibility[animal] || 'Unknown';
}

// Birthstone Finder (z-10)
function findBirthstone() {
  const month = parseInt(document.getElementById('birthstoneMonth').value);
  
  const stones = [
    { name: 'Garnet', color: 'Deep red', month: 1, emoji: '🔴' },
    { name: 'Amethyst', color: 'Purple', month: 2, emoji: '🟣' },
    { name: 'Aquamarine', color: 'Light blue', month: 3, emoji: '🔵' },
    { name: 'Diamond', color: 'Clear', month: 4, emoji: '💎' },
    { name: 'Emerald', color: 'Green', month: 5, emoji: '🟢' },
    { name: 'Pearl', color: 'White', month: 6, emoji: '⚪' },
    { name: 'Ruby', color: 'Red', month: 7, emoji: '🔴' },
    { name: 'Peridot', color: 'Light green', month: 8, emoji: '🟢' },
    { name: 'Sapphire', color: 'Blue', month: 9, emoji: '🔵' },
    { name: 'Opal', color: 'Multi-color', month: 10, emoji: '🌈' },
    { name: 'Topaz', color: 'Yellow', month: 11, emoji: '🟡' },
    { name: 'Turquoise', color: 'Blue-green', month: 12, emoji: '🔷' }
  ];
  
  const stone = stones[month - 1];
  
  // Update results
  document.getElementById('birthstoneResults').innerHTML = `
    <p><strong>Birthstone for ${getMonthName(month)}</strong></p>
    <p>${stone.emoji} ${stone.name} ${stone.emoji}</p>
    <p>Color: ${stone.color}</p>
  `;
  
  document.getElementById('birthstoneInfo').innerHTML = `
    <p><strong>Meaning:</strong> ${getBirthstoneMeaning(stone.name)}</p>
    <p><strong>Alternative Stones:</strong> ${getAlternativeStones(month)}</p>
  `;
}

function getMonthName(month) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1];
}

function getBirthstoneMeaning(name) {
  const meanings = {
    'Garnet': 'Symbolizes trust and lasting friendship.',
    'Amethyst': 'Represents sincerity and peace of mind.',
    'Aquamarine': 'Symbolizes youth, hope and health.',
    'Diamond': 'Represents innocence and constancy.',
    'Emerald': 'Symbolizes success in love.',
    'Pearl': 'Represents purity and humility.',
    'Ruby': 'Symbolizes contentment and dignity.',
    'Peridot': 'Represents marital happiness.',
    'Sapphire': 'Symbolizes clear thinking.',
    'Opal': 'Represents hope and innocence.',
    'Topaz': 'Symbolizes friendship and fidelity.',
    'Turquoise': 'Represents prosperity and success.'
  };
  return meanings[name] || 'Unknown';
}

function getAlternativeStones(month) {
  const alternatives = {
    1: 'Rose Quartz',
    2: 'Onyx',
    3: 'Bloodstone',
    4: 'Quartz',
    5: 'Chrysoprase',
    6: 'Moonstone',
    7: 'Carnelian',
    8: 'Sardonyx',
    9: 'Lapis Lazuli',
    10: 'Tourmaline',
    11: 'Citrine',
    12: 'Tanzanite'
  };
  return alternatives[month] || 'None';
}

// Initialize all tools
document.addEventListener('DOMContentLoaded', function() {
  calculateMoonPhase();
  calculateTides();
  calculateSunPosition();
  calculateSunriseSunset();
  checkDST();
  checkLeapYear();
  calculateSeason();
  calculateZodiac();
  calculateChineseZodiac();
  findBirthstone();
});


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
          // Virtual Bubble Wrap
          const bubbleWrapGrid = document.getElementById('bubbleWrapGrid');
          const popCount = document.getElementById('popCount');
          let pops = 0;

          for (let i = 0; i < 100; i++) {
          const bubble = document.createElement('div');
          bubble.classList.add('bubble');
          bubble.addEventListener('click', () => {
          bubble.style.backgroundColor = '#ccc';
          bubble.style.pointerEvents = 'none';
          pops++;
          popCount.textContent = pops;
          });
          bubbleWrapGrid.appendChild(bubble);
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
          