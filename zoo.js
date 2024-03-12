function renderAvailableAnimals(animals) {
  const animalPlaceholder = document.getElementById("animal-cards");
  animalPlaceholder.innerHTML = ""; // Clear existing cards

  const animalCards = animals.map(getAnimalHTMLCard);
  animalPlaceholder.append(...animalCards);

  document.querySelectorAll(".animal-card").forEach((card) => {
    console.log(card);
    card.addEventListener("click", () => {
      console.log("CLICKED");
      const animalName = card.querySelector(".card-text").textContent;
      updateAnimalVisitCount(animalName); // Update visit count
      localStorage.setItem("selectedAnimal", animalName);
      window.location.href = "animal.html"; // Navigate to animal.html
    });
  });
}

function saveFiltersToLocalStorage() {
  const nameInput = document.querySelector("#name");
  const weightInput = document.querySelector("#Aweight");
  const heightInput = document.querySelector("#Aheight");
  const colorInput = document.querySelector("#Acolor");
  const habitatInputs = document.querySelectorAll("[name='habitat']");

  localStorage.setItem("name-filter", nameInput.value);
  localStorage.setItem("weight-filter", weightInput.value);
  localStorage.setItem("height-filter", heightInput.value);
  localStorage.setItem("color-filter", colorInput.value);

  let selectedHabitat;
  habitatInputs.forEach((input) => {
    if (input.checked) {
      selectedHabitat = input.value;
    }
  });
  localStorage.setItem("habitat-filter", selectedHabitat);
}

function loadFiltersFromLocalStorage() {
  const nameInput = document.querySelector("#name");
  const weightInput = document.querySelector("#Aweight");
  const heightInput = document.querySelector("#Aheight");
  const colorInput = document.querySelector("#Acolor");
  const habitatInputs = document.querySelectorAll("[name='habitat']");

  nameInput.value = localStorage.getItem("name-filter") || "";
  weightInput.value = localStorage.getItem("weight-filter") || "";
  heightInput.value = localStorage.getItem("height-filter") || "";
  colorInput.value = localStorage.getItem("color-filter") || "";
  const selectedHabitat = localStorage.getItem("habitat-filter");

  if (selectedHabitat) {
    habitatInputs.forEach((input) => {
      if (input.value === selectedHabitat) {
        input.checked = true;
      }
    });
  }
}

function setFilter() {
  // Get filter values from inputs
  const nameFilter = document.querySelector("#name").value.toLowerCase();
  const weightFilter = parseFloat(document.querySelector("#Aweight").value);
  const heightFilter = parseFloat(document.querySelector("#Aheight").value);
  const colorFilter = document.querySelector("#Acolor").value.toLowerCase();
  const habitatFilter = document.querySelector(
    "[name='habitat']:checked"
  )?.value;

  // Filter animals based on all applied filters
  const filteredAnimals = animals.filter((animal) => {
    return (
      (animal.name.toLowerCase().includes(nameFilter) || nameFilter === "") &&
      (isNaN(weightFilter) || animal.weight >= weightFilter) &&
      (isNaN(heightFilter) || animal.height >= heightFilter) &&
      (animal.color.toLowerCase() === colorFilter || colorFilter === "") &&
      (animal.habitat === habitatFilter || habitatFilter === undefined)
    );
  });

  // Save filters to localStorage
  saveFiltersToLocalStorage();

  // Render filtered animals
  renderAvailableAnimals(filteredAnimals);
}

window.onload = function () {
  generateDataset();

  // Get reference to input fields
  const nameInput = document.querySelector("#name");
  const weightInput = document.querySelector("#weight");
  const heightInput = document.querySelector("#height");
  const colorInput = document.querySelector("#color");
  const habitatInputs = document.querySelectorAll("[name='habitat']");

  // Add event listeners to input fields
  nameInput.addEventListener("input", () => {
    setFilter();
  });

  weightInput.addEventListener("input", () => {
    setFilter();
  });

  heightInput.addEventListener("input", () => {
    setFilter();
  });

  colorInput.addEventListener("input", () => {
    setFilter();
  });

  habitatInputs.forEach((input) => {
    input.addEventListener("change", () => {
      setFilter();
    });
  });

  // Call setFilter initially to apply any saved filters
  setFilter();
};

let animalsForView = [...animals];

const getAnimalTemplate = (animal) => {
  return `
    <div class="card"> 
      <img class="animal-image" src="images/${animal.name}.jpg" alt="${animal.name}" />
      <div class="card-body">
        <p class="card-text">${animal.name}</p>
        <p class="card-text">Weight: ${animal.weight}</p>
        <p class="card-text">Height: ${animal.height}</p>
        <p class="card-text">Color: ${animal.color}</p>
        <p class="card-text">Habitat: ${animal.habitat}</p>
        <p class="card-text">Is Predator: ${animal.isPredator}</p>
      </div>
    </div>`;
};

const getAnimalHTMLCard = (animal) => {
  const template = getAnimalTemplate(animal);
  const wrapper = document.createElement("div");
  wrapper.className = "animal-card";
  wrapper.innerHTML = template;
  return wrapper;
};

function clearFiltersFromLocalStorage() {
  localStorage.removeItem("name-filter");
  localStorage.removeItem("weight-filter");
  localStorage.removeItem("height-filter");
  localStorage.removeItem("color-filter");
  localStorage.removeItem("habitat-filter");

  // Reload the page to reflect the changes
  window.location.reload();
}

// Function to initialize the visit count for each animal in local storage
function initializeAnimalVisits() {
  const animals = JSON.parse(localStorage.getItem("animals"));
  const visits = {};
  animals.forEach((animal) => {
    visits[animal.name] = 0;
  });
  localStorage.setItem("animalVisits", JSON.stringify(visits));
}

// Function to update the visit count for a specific animal
function updateAnimalVisitCount(animalName) {
  const visits = JSON.parse(localStorage.getItem("animalVisits")) || {};
  visits[animalName] = (visits[animalName] || 0) + 1;
  localStorage.setItem("animalVisits", JSON.stringify(visits));
}

const renderAnimals = () => {
  const clearFiltersButton = document.getElementById("clearFilters");
  const animalCards = animalsForView.map(getAnimalHTMLCard);
  const animalPlaceholder = document.getElementById("animal-cards");
  animalPlaceholder.append(...animalCards);

  // Add event listener to navigate to animal.html on card click
  animalPlaceholder.querySelectorAll(".animal-card").forEach((card) => {
    card.addEventListener("click", () => {
      const animalName = card.querySelector(".card-text").textContent;
      localStorage.setItem("selectedAnimal", animalName);
      window.location.href = "animal.html";
    });
  });

  clearFiltersButton.addEventListener("click", clearFiltersFromLocalStorage);
};

document.addEventListener("DOMContentLoaded", () => {
  // Render animals and load filters from local storage
  loadFiltersFromLocalStorage();
  renderAnimals();

  // Add event listener to navigate to animal.html on card click
  document.querySelectorAll(".animal-card").forEach((card) => {
    console.log(card);
    card.addEventListener("click", () => {
      console.log("CLICKED");
      const animalName = card.querySelector(".card-text").textContent;
      updateAnimalVisitCount(animalName); // Update visit count
      localStorage.setItem("selectedAnimal", animalName);
      window.location.href = "animal.html";
    });
  });
});
