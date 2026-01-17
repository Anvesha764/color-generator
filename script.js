const button = document.getElementById("generateBtn");
const colorBox = document.querySelector(".color-box");
const title = document.querySelector("h1");
const text = colorBox.querySelector("span");

button.addEventListener("click", () => {
  const rgb = generateRGBColor();
  const hex = rgbToHex(rgb);

  // Update UI
  colorBox.style.backgroundColor = rgb;
  title.innerText = rgb;
  text.innerText = `${rgb} | ${hex}`;

  // Adjust text color for visibility
  const textColor = getContrastColor(rgb);
  text.style.color = textColor;

  console.log(`Generated: ${rgb} (${hex})`);
});

// Copy color on click
colorBox.addEventListener("click", () => {
  const colorText = text.innerText;
  navigator.clipboard.writeText(colorText);
  text.innerText = "Copied to clipboard! ✅";

  setTimeout(() => {
    text.innerText = colorText;
  }, 1200);
});

// ---------- FUNCTIONS ----------

// Generate random RGB color
function generateRGBColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

// Convert RGB to HEX
function rgbToHex(rgb) {
  const values = rgb.match(/\d+/g).map(Number);
  return (
    "#" +
    values
      .map((value) => value.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

// Decide black or white text based on brightness
function getContrastColor(rgb) {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);

  // Perceived brightness formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 125 ? "#000000" : "#FFFFFF";
}
// Generate a color when page loads
button.click();

