// Retrieve data from local storage for feedingRecords
const feedingData = localStorage.getItem("feedingRecord");
const animalVisitsData = localStorage.getItem("animalVisits");

const feedingDashboardData = JSON.parse(feedingData);
const animalVisitsDashboardData = JSON.parse(animalVisitsData);

console.log(feedingDashboardData);
console.log(animalVisitsDashboardData);

// Function to display visited animals for feedingRecords
function showVisitedAnimals() {
  const visitedAnimalsDiv = document.getElementById("visited-animals");
  visitedAnimalsDiv.innerHTML = "<h2>Visited Animals</h2>";

  for (const animal in animalVisitsDashboardData) {
    const visits = animalVisitsDashboardData[animal];
    const animalElement = document.createElement("p");
    animalElement.textContent = `${animal}: ${visits} visits`;
    visitedAnimalsDiv.appendChild(animalElement);
  }
}

// Function to display fed animals for feedingRecords
function showFeededAnimals() {
  const feededAnimalsDiv = document.getElementById("feeded-animals");
  feededAnimalsDiv.innerHTML = "<h2>Fed Animals</h2>";

  for (const animal in feedingDashboardData) {
    const feedings = feedingDashboardData[animal];
    const animalElement = document.createElement("p");
    animalElement.textContent = `${animal}: ${feedings} feedings`;
    feededAnimalsDiv.appendChild(animalElement);
  }
}

// Function to display favorite animal for feedingRecords
function showFavoriteAnimal() {
  const favoriteAnimalDiv = document.getElementById("favorite-animal");
  favoriteAnimalDiv.innerHTML = "<h2>Favorite Animal</h2>";

  // Find the animal with the highest number of feedings
  let maxFeedings = 0;
  let favoriteAnimal = "";

  for (const animal in feedingDashboardData) {
    if (feedingDashboardData[animal] > maxFeedings) {
      maxFeedings = feedingDashboardData[animal];
      favoriteAnimal = animal;
    }
  }

  const favoriteAnimalElement = document.createElement("p");
  favoriteAnimalElement.textContent = `Favorite Animal: ${favoriteAnimal}`;
  favoriteAnimalDiv.appendChild(favoriteAnimalElement);
}

// Call the functions to display data for feedingRecords
showVisitedAnimals();
showFeededAnimals();
showFavoriteAnimal();
