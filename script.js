//your code here
// Get all necessary DOM elements
const images = document.querySelectorAll("img");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const para = document.getElementById("para");

// Helper function to shuffle an array
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Helper function to generate random index
function getRandomIndex() {
  return Math.floor(Math.random() * 5);
}

let selectedImages = [];
let isImageSelected = false;
let identicalImage = null;

// Render the images and randomly select one to repeat
function renderImages() {
  const imgClasses = ["img1", "img2", "img3", "img4", "img5"];
  const randomIndex = getRandomIndex(); // Randomly choose an image to repeat
  identicalImage = imgClasses[randomIndex]; // Store the image to repeat

  // Shuffle the classes to randomize image order
  const shuffledClasses = shuffleArray([...imgClasses, identicalImage]);

  images.forEach((img, index) => {
    img.classList.remove(...img.classList); // Clear existing classes
    img.classList.add(shuffledClasses[index]); // Add new class (image source)
    img.onclick = () => handleImageClick(img);
  });
}

// Handle image click
function handleImageClick(img) {
  if (!isImageSelected) {
    img.classList.add("selected"); // Add selected class for visual feedback
    selectedImages.push(img);
    isImageSelected = true;
  } else if (selectedImages.length === 1 && !selectedImages.includes(img)) {
    img.classList.add("selected");
    selectedImages.push(img);
    checkImages(); // Check if the selected images match
  }
  // Show the reset button once one image is clicked
  resetButton.style.display = "block";
}

// Check if the two selected images are identical
function checkImages() {
  const [first, second] = selectedImages;
  if (first.classList.contains(second.classList[0])) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  // Show the verify button after two images are selected
  verifyButton.style.display = "block";
}

// Reset the state to initial
function resetState() {
  images.forEach((img) => img.classList.remove("selected"));
  selectedImages = [];
  isImageSelected = false;
  para.textContent = "";
  resetButton.style.display = "none";
  verifyButton.style.display = "none";
  renderImages(); // Re-randomize the images and repeat the process
}

// Event listeners for buttons
resetButton.addEventListener("click", resetState);
verifyButton.addEventListener("click", () => {
  // Hide verify button after verification
  verifyButton.style.display = "none";
});

window.onload = renderImages; // Call renderImages function on page load
