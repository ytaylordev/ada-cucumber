/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
'use strict';

/************VARIABLES*************/

//HTMl Elements - header
const plusIcon = getEl('.js-plus-icon');

//HTMl Elements - main
const hideNewFormArea = getEl('.js-hide-form-area');
const pepinoListElement = getEl('.js-pepino-list');

//HTMl Elements - new form
const newFormElement = getEl('.js-new-form');
const inputImgElement = getEl('.js-pepino-img');
const inputNameElement = getEl('.js-pepino-name');
const inputDescElement = getEl('.js-pepino-desc');
const labelErrorElement = getEl('.js-new-form-error');
const addButton = getEl('.js-button-add');
const cancelButton = getEl('.js-button-cancel');

//HTML Elements - search form
const searchFormElement = getEl('.js-search-form');
const inputSearchNameElement = getEl('.js-search-input-name');
const inputSearchDescElement = getEl('.js-search-input-desc');
const labelSearchErrorElement = getEl('.js-search-form-error');
const searchButton = getEl('.js-search-button');

//Pepinos
const pepino1 = getPepino(
  './assets/images/pepino-clasico.jpg',
  'Pepino clásico',
  'El que te encuentras en el Mercadona.'
);
const pepino2 = getPepino(
  './assets/images/alficoz.jpg',
  'Alficoz',
  'Va palante como los de Alicante.'
);
const pepino3 = getPepino(
  './assets/images/pepino-mar.jpg',
  'Pepino de mar',
  'La foto está borrosa porque son muy feos.'
);
const pepino4 = getPepino(
  './assets/images/benedict-cucumberbatch.jpg',
  'Benedict Cucumberbatch',
  'An English pepino indeed.'
);

const allPepinos = [pepino1, pepino2, pepino3, pepino4];

/*END VARIABLES*/

/************FUNCTIONS*************/
function getEl(className) {
  let result = {};
  if (document.querySelector(className)) {
    result = document.querySelector(className);
  } else {
    console.log(
      `No existe ningún elemento con clase, id o tag llamado ${className}`
    );
  }
  return result;
}

function getPepino(imgSrc, name, desc) {
  const pepino = {
    imgSrc: imgSrc,
    name: name,
    desc: desc,
    renderPepinoItem: function () {
      const pepinoItem = `<li class="card">
            <article>
              <img class="card_img" src=${this.imgSrc} alt=${this.name} />
              <h3 class="card_title">${this.name}</h3>
              <p class="card_description">
              ${this.desc}
              </p>
            </article>
          </li>`;
      return pepinoItem;
    },
  };
  return pepino;
}

function addNewPepino(imgSrc, name, desc) {
  allPepinos[allPepinos.length] = getPepino(imgSrc, name, desc);
}

function renderPepinos(pepinosArray) {
  pepinoListElement.innerHTML = '';
  pepinosArray.forEach((element) => {
    pepinoListElement.innerHTML += element.renderPepinoItem();
  });
}

function cleanNewForm() {
  labelErrorElement.innerHTML = '';
  inputImgElement.value = '';
  inputNameElement.value = '';
  inputDescElement.value = '';
}

function cleanSearchForm() {
  searchFormElement.reset();
}

function plusIconClickHandler() {
  newFormElement.classList.toggle('collapsed');
  labelSearchErrorElement.innerHTML = '';
}

function hideNewFormAreaClickHandler() {
  if (!newFormElement.classList.contains('collapsed')) {
    newFormElement.classList.add('collapsed');
  }
}

function addButtonClickHandler(event) {
  //añadir nuevo pepino si está todo relleno, si no mostrar un mensaje de error
  event.preventDefault();
  const valueImg = inputImgElement.value;
  const valueName = inputNameElement.value;
  const valueDesc = inputDescElement.value;
  if (valueImg === '' || valueName === '' || valueDesc === '') {
    labelErrorElement.innerHTML = 'Porfa, rellena todos los campos';
  } else {
    labelErrorElement.innerHTML = '';
    addNewPepino(valueImg, valueName, valueDesc);
    renderPepinos(allPepinos);
    cleanNewForm();
    newFormElement.classList.add('collapsed');
  }
}

function cancelButtonClickHandler(event) {
  event.preventDefault();
  cleanNewForm();
  newFormElement.classList.add('collapsed');
}

function searchByTwoParams(name, desc, searchArray) {
  const foundArray = [];
  let i = 0;
  searchArray.forEach((element) => {
    const currentName = element.name.toLowerCase();
    const currentDesc = element.desc.toLowerCase();
    if (currentName.includes(name) && currentDesc.includes(desc)) {
      foundArray[i] = element;
      i++;
    }
  });
  return foundArray;
}

function searchByName(name, searchArray) {
  const foundArray = [];
  let i = 0;
  searchArray.forEach((element) => {
    const currentName = element.name.toLowerCase();
    if (currentName.includes(name)) {
      foundArray[i] = element;
      i++;
    }
  });
  return foundArray;
}

function searchByDesc(desc, searchArray) {
  const foundArray = [];
  let i = 0;
  searchArray.forEach((element) => {
    const currentDesc = element.desc.toLowerCase();
    if (currentDesc.includes(desc)) {
      foundArray[i] = element;
      i++;
    }
  });
  return foundArray;
}

function searchButtonClickHandler(event) {
  {
    event.preventDefault();
    const valueName = inputSearchNameElement.value.toLowerCase();
    const valueDesc = inputSearchDescElement.value.toLowerCase();

    labelSearchErrorElement.innerHTML = '';
    let foundPepinos = [];

    if (valueName && valueDesc) {
      foundPepinos = searchByTwoParams(valueName, valueDesc, allPepinos);
      renderPepinos(foundPepinos);
    } else if (valueName && !valueDesc) {
      foundPepinos = searchByName(valueName, allPepinos);
      renderPepinos(foundPepinos);
    } else if (!valueName && valueDesc) {
      foundPepinos = searchByDesc(valueDesc, allPepinos);
      renderPepinos(foundPepinos);
    } else {
      labelSearchErrorElement.innerHTML = 'Rellena alguno de los campos';
      renderPepinos(allPepinos);
    }
  }
}

/*END FUNCTIONS*/

/************RENDER PEPINOS AT START*************/

renderPepinos(allPepinos);

/*END RENDER PEPINOS AT START*/

/************EVENTS*************/

plusIcon.addEventListener('click', plusIconClickHandler);

hideNewFormArea.addEventListener('click', hideNewFormAreaClickHandler);

addButton.addEventListener('click', (event) => addButtonClickHandler(event));

cancelButton.addEventListener('click', (event) =>
  cancelButtonClickHandler(event)
);

searchButton.addEventListener('click', (event) =>
  searchButtonClickHandler(event)
);

/*END EVENTS*/
