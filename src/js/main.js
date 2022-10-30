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

const pepinos = [pepino1, pepino2, pepino3, pepino4];

/*END VARIABLES*/

/************FUNCTIONS*************/
function getEl(className) {
  let result = '';
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
  pepinos[pepinos.length] = getPepino(imgSrc, name, desc);
}

function renderAllPepinos() {
  pepinoListElement.innerHTML = '';
  pepinos.forEach((element) => {
    pepinoListElement.innerHTML += element.renderPepinoItem();
  });
}

function cleanNewForm() {
  labelErrorElement.innerHTML = '';
  inputImgElement.value = '';
  inputNameElement.value = '';
  inputDescElement.value = '';
}

function plusIconClickHandler() {
  newFormElement.classList.toggle('collapsed');
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
    renderAllPepinos();
    newFormElement.classList.add('collapsed');
  }
}

function cancelButtonClickHandler(event) {
  event.preventDefault();
  cleanNewForm();
  newFormElement.classList.add('collapsed');
}

/*END FUNCTIONS*/

/************RENDER PEPINOS AT START*************/

renderAllPepinos();

/*END RENDER PEPINOS AT START*/

/************EVENTS*************/

plusIcon.addEventListener('click', plusIconClickHandler);

hideNewFormArea.addEventListener('click', hideNewFormAreaClickHandler);

addButton.addEventListener('click', (event) => addButtonClickHandler(event));

cancelButton.addEventListener('click', (event) =>
  cancelButtonClickHandler(event)
);

// searchFormElement.addEventListener('click', (event) => {
//   const valueName = inputSearchNameElement.value;
//   const valueDesc = inputSearchDescElement.value;
// });

/*END EVENTS*/
