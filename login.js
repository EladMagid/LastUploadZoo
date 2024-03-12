window.onload = function () {
  generateDataset();
};

let visitorsForView = [...visitors];
const dialog = document.querySelector("#visitors-dialog");

const getvisitorsHTMLCard = (visitor) => {
  const template = getVisitorTemplate(visitor);
  const wrapper = document.createElement("div");
  wrapper.className = "visitors-card";
  wrapper.innerHTML = template;
  wrapper.addEventListener("click", () => {
    handlevisitorClick(visitor);
  });
  return wrapper;
};

const getCloseModalHTMLButton = () => {
  const closeButton = document.createElement("button");
  closeButton.innerText = " Close modal";
  closeButton.addEventListener("click", () => dialog.close());
  return closeButton;
};

const getChooseVisitorButton = (visitor) => {
  const chooseButton = document.createElement("button");
  chooseButton.className = "choose";
  chooseButton.innerText = "Choose Visitor";
  chooseButton.addEventListener("click", () => {
    dialog.close();
    loginAsvisitor(visitor.name);
  });
  return chooseButton;
};

const getVisitorTemplate = (visitor) => {
  return `<div class="card"> 
            <img class="card-img-top" src="./images/Man.jpg" alt="${visitor.name}"/>
            <div class="card-body">
              <p class="card-text"><p>${visitor.name}</p>
              <p class="card-text">${visitor.coins}</p>
            </div>
          </div>`;
};

const handlevisitorClick = (visitor) => {
  dialog.innerHTML = "";
  const element = document.createElement("div");
  element.innerHTML = getVisitorTemplate(visitor);
  dialog.append(
    getCloseModalHTMLButton(),
    getChooseVisitorButton(visitor),
    getvisitorsHTMLCard(visitor)
  );
  dialog.showModal();
};

const getSearchBox = () => {
  const queryInput = document.createElement("input");
  queryInput.id = "query-input";
  queryInput.placeholder = "Search Visitors";
  queryInput.className = "form-control my-4";
  queryInput.oninput = (e) => {
    visitorsForView = visitors.filter((visitor) =>
      visitor.name.includes(e.target.value)
    );
    rendervisitors();
  };
  return queryInput;
};
const getEmptyCardsHTMLTemplate = () => {
  const templateWrapper = document.createElement("div");
  templateWrapper.className = "empty-result";

  const template = `
    <h2>No visitors Found</h2>
    <p>We're sorry, but no visitors match your search.</p>
    <button id="clear-filter-btn" class="btn btn-dark">Clear search text</button>`;
  templateWrapper.innerHTML = template;
  templateWrapper.children["clear-filter-btn"].addEventListener(
    "click",
    clearSearchBox
  );
  return templateWrapper;
};

const clearSearchBox = () => {
  const input = document.getElementById("query-input");
  input.value = "";
  visitorsForView = [...visitors];
  rendervisitors();
};

const rendervisitors = () => {
  const visitorCards = visitorsForView.map(getvisitorsHTMLCard);
  const visitorsPlaceholder = document.getElementById("placeholder");
  visitorsPlaceholder.innerHTML = "";

  if (!visitorCards.length) {
    visitorsPlaceholder.appendChild(getEmptyCardsHTMLTemplate());
  }
  visitorsPlaceholder.append(...visitorCards);
};

document.body.insertAdjacentElement("afterbegin", getSearchBox());
window.addEventListener("load", rendervisitors());

function loginAsvisitor(visitorName) {
  const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
  const messageDiv = document.getElementById("message");

  if (currentVisitor) {
    const disconnect = confirm(
      `${currentVisitor.name} is already a selected guest. Do you want to disconnect?`
    );
    if (disconnect) {
      localStorage.removeItem("currentVisitor");
      localStorage.removeItem("selectedAnimal");
      localStorage.removeItem("feedingRecord");
      localStorage.removeItem("animalVisits");
      initializeAnimalVisits();
      messageDiv.textContent = `Visitor ${currentVisitor.name} has been disconnected.`;
      alert("Visitor disconnected.");
    } else {
      messageDiv.textContent = `There is already a selected guest (${currentVisitor.name}).`;
      alert("User chose not to disconnect.");
      return;
    }
  }

  const selectedVisitor = visitors.find(
    (visitor) => visitor.name === visitorName
  );
  if (selectedVisitor) {
    localStorage.setItem("currentVisitor", JSON.stringify(selectedVisitor));
    initializeAnimalVisits();
    messageDiv.textContent = `Visitor ${selectedVisitor.name} logged in.`;
    alert(`Visitor ${selectedVisitor.name} logged in.`);
  } else {
    messageDiv.textContent = `Visitor ${visitorName} not found.`;
    alert(`Visitor ${visitorName} not found.`);
  }
}

function initializeAnimalVisits() {
  const animals = JSON.parse(localStorage.getItem("animals"));
  const animalVisits = {};

  animals.forEach((animal) => {
    animalVisits[animal.name] = 0; // Initialize visit count to 0 for each animal
  });

  localStorage.setItem("animalVisits", JSON.stringify(animalVisits));
}

// בדיקה אם קיים מבקר מחובר בעת טעינת העמוד
window.addEventListener("load", () => {
  const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
  if (currentVisitor) {
    message.textContent = `Welcome to the Zoo, ${currentVisitor.name}!`;
  }
});

const getVisitorToZooButton = () => {
  const ZooButton = document.createElement("button");
  ZooButton.innerText = "Go to the zoo";
  ZooButton.className = "zoobutton";
  ZooButton.addEventListener("click", () => {
    initializeAnimalVisits();
    window.location.href = "./zoo.html";
  });
  document.body.appendChild(ZooButton);
};
getVisitorToZooButton();
