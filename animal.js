function renderAnimal() {
  const selectedAnimalName = localStorage.getItem("selectedAnimal");
  const animals = JSON.parse(localStorage.getItem("animals"));

  if (!selectedAnimalName || !animals) {
    console.error("Error: Animal details not found.");
    return;
  }

  const selectedAnimal = animals.find(
    (animal) => animal.name === selectedAnimalName
  );

  if (!selectedAnimal) {
    console.error("Error: Selected animal not found.");
    return;
  }

  document.getElementById("name").textContent = selectedAnimal.name;
  document.getElementById(
    "weight"
  ).textContent = `Weight: ${selectedAnimal.weight}`;
  document.getElementById(
    "height"
  ).textContent = `Height: ${selectedAnimal.height}`;
  document.getElementById(
    "color"
  ).textContent = `Color: ${selectedAnimal.color}`;
  document.getElementById(
    "habitat"
  ).textContent = `Habitat: ${selectedAnimal.habitat}`;
  document.getElementById("isPredator").textContent = `Is Predator: ${
    selectedAnimal.isPredator ? "Yes" : "No"
  }`;

  // Display the animal image
  const imageDiv = document.getElementById("image");
  const image = document.createElement("img");
  image.src = `images/${selectedAnimal.name}.jpg`;
  image.alt = selectedAnimal.name;
  imageDiv.appendChild(image);
}

function renderRelatedAnimals() {
  const selectedAnimalName = localStorage.getItem("selectedAnimal");
  const animals = JSON.parse(localStorage.getItem("animals"));

  console.log("Selected Animal Name:", selectedAnimalName);
  console.log("All Animals:", animals);

  const selectedAnimal = animals.find(
    (animal) => animal.name === selectedAnimalName
  );

  if (!selectedAnimal) {
    console.error("Error: Selected animal not found.");
    return;
  }

  const selectedAnimalHabitat = selectedAnimal.habitat;

  if (!selectedAnimalHabitat || !animals) {
    console.error("Error: Animal details not found.");
    return;
  }

  // Filter out animals with the same habitat and exclude the selected animal
  const relatedAnimals = animals.filter(
    (animal) =>
      animal.habitat === selectedAnimalHabitat &&
      animal.name !== selectedAnimalName
  );

  console.log("Related Animals:", relatedAnimals);

  const relatedAnimalsDiv = document.getElementById("related-animals");
  relatedAnimalsDiv.innerHTML = ""; // Clear previous content

  relatedAnimals.forEach((animal) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.style.width = "180px"; // Set width to 120px
    cardDiv.style.height = "360px"; // Set height to 200px
    cardDiv.style.margin = "5px"; // Add some margin between cards
    cardDiv.style.background = "white";
    cardDiv.style.display = "flex";
    cardDiv.style.flexDirection = "column";
    cardDiv.style.alignItems = "center";
    cardDiv.style.borderRadius = "10px";

    const image = document.createElement("img");
    image.src = `images/${animal.name}.jpg`;
    image.alt = animal.name;
    image.style.width = "100px"; // Make the image fill the card horizontally
    image.style.height = "100px"; // Adjust the height of the image as needed
    image.style.marginTop = "10px";

    cardDiv.appendChild(image);

    const name = document.createElement("p");
    name.textContent = `Name: ${animal.name}`;
    name.style.textAlign = "center"; // Center-align the text
    name.style.height = "10px"; // Adjust the height of the image as needed
    cardDiv.appendChild(name);

    const predator = document.createElement("p");
    predator.textContent = `Is Predator: ${animal.isPredator ? "Yes" : "No"}`;
    predator.style.textAlign = "center"; // Center-align the text
    predator.style.height = "10px"; // Adjust the height of the image as needed

    cardDiv.appendChild(predator);

    const weight = document.createElement("p");
    weight.textContent = `Weight: ${animal.weight}`;
    weight.style.textAlign = "center"; // Center-align the text
    weight.style.height = "10px"; // Adjust the height of the image as needed

    cardDiv.appendChild(weight);

    const height = document.createElement("p");
    height.textContent = `Height: ${animal.height}`;
    height.style.textAlign = "center"; // Center-align the text
    height.style.height = "10px"; // Adjust the height of the image as needed
    cardDiv.appendChild(height);

    const color = document.createElement("p");
    color.textContent = `Color: ${animal.color}`;
    color.style.textAlign = "center"; // Center-align the text
    color.style.height = "10px"; // Adjust the height of the image as needed
    cardDiv.appendChild(color);

    const habitat = document.createElement("p");
    habitat.textContent = `Habitat: ${animal.habitat}`;
    habitat.style.textAlign = "center";
    habitat.style.height = "10px";
    cardDiv.appendChild(habitat);

    relatedAnimalsDiv.appendChild(cardDiv);
  });
}

function feedAnimal() {
  const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
  const selectedAnimalName = localStorage.getItem("selectedAnimal");
  const animals = JSON.parse(localStorage.getItem("animals"));
  const selectedAnimal = animals.find(
    (animal) => animal.name === selectedAnimalName
  );

  if (!selectedAnimal) {
    console.error("Error: Selected animal not found.");
    return;
  }

  if (!currentVisitor) {
    console.error("Error: Visitor details not found.");
    return;
  }

  const feedingRecord = JSON.parse(localStorage.getItem("feedingRecord")) || {};

  // Initialize feeding count for the selected animal if it doesn't exist
  if (!feedingRecord[selectedAnimalName]) {
    feedingRecord[selectedAnimalName] = 0;
  }

  console.log(currentVisitor);

  if (currentVisitor.coins < 2) {
    console.error("Error: Not enough coins to feed the animal.");
    if (selectedAnimal.isPredator) {
      visitorGotEaten(currentVisitor);
    } else {
      animalEscaped(selectedAnimalName, animals);
    }
  } else {
    // Deduct coins for feeding
    currentVisitor.coins -= 2;
    localStorage.setItem("currentVisitor", JSON.stringify(currentVisitor));

    // Update feeding record
    feedingRecord[selectedAnimalName]++;
    localStorage.setItem("feedingRecord", JSON.stringify(feedingRecord));
  }
}

function visitorGotEaten(currentVisitor) {
  const dialog = document.createElement("dialog");
  const message = document.createElement("p");
  message.textContent =
    "Not enough coins to feed the animal. You have been eaten by a predator!";
  const button = document.createElement("button");
  button.textContent = "OK";

  dialog.appendChild(message);
  dialog.appendChild(button);

  const visitors = JSON.parse(localStorage.getItem("visitors"));
  const updatedVisitors = visitors.filter(
    (visitor) => visitor.name !== currentVisitor.name
  );
  localStorage.setItem("visitors", JSON.stringify(updatedVisitors));

  localStorage.removeItem("currentVisitor");
  localStorage.removeItem("selectedAnimal");
  localStorage.removeItem("feedingRecord");
  localStorage.removeItem("animalVisits");

  button.addEventListener("click", () => {
    // If the user clicks OK, redirect to the login page

    window.location.href = "login.html";
  });

  document.body.appendChild(dialog);
  dialog.showModal();
}

function animalEscaped(selectedAnimalName, animals) {
  const dialog = document.createElement("dialog");
  const message = document.createElement("p");
  message.textContent =
    "Not enough coins to feed the animal. An animal has escaped from the zoo!";
  const button = document.createElement("button");
  button.textContent = "OK";

  dialog.appendChild(message);
  dialog.appendChild(button);

  // If the user clicks OK, remove the animal from animals and go back to the zoo
  const updatedAnimals = animals.filter(
    (animal) => animal.name !== selectedAnimalName
  );
  localStorage.setItem("animals", JSON.stringify(updatedAnimals));

  // Clear the selectedAnimal from localStorage
  localStorage.removeItem("selectedAnimal");

  button.addEventListener("click", () => {
    // Redirect to the zoo page
    window.location.href = "zoo.html";
  });

  document.body.appendChild(dialog);
  dialog.showModal();
}

// Call the functions to render the animal details and related animals when the page loads
document.addEventListener("DOMContentLoaded", () => {
  renderAnimal();
  renderRelatedAnimals();

  // Add event listener to the "Feed me" button
  const feedButton = document.getElementById("feed-animal");
  feedButton.addEventListener("click", feedAnimal);
});
