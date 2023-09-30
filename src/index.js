import { fetchBreeds, fetchCatByBreed, refs, showError } from './cat-api.js';

fetchBreeds()
  .then(data => {
    const option = data
      .map(cat => {
        return `<option value="${cat.id}">${cat.name}</option>`;
      })
      .join('');

    refs.select.innerHTML = option;
  })
  .catch(() => showError());

refs.select.addEventListener('change', catInfo);

function catInfo() {
  const selectedValue = refs.select.value;
  const cat = {
    catImg: '',
    catTitle: '',
    catDescr: '',
    catTemp: '',
  };

  fetchCatByBreed(selectedValue)
    .then(({ breeds, url }) => {
      cat.catImg = url;
      cat.catTitle = breeds[0].name;
      cat.catDescr = breeds[0].description;
      cat.catTemp = breeds[0].temperament;
      refs.catInfo.innerHTML = createMarkup(cat);
    })
    .catch(() => showError());
}

function createMarkup({ catImg, catTitle, catDescr, catTemp }) {
  return `
    <img class="cat-img" src="${catImg}" alt="${catTitle}">
    <div class="cat-info-block">
      <h2 class="cat-title">${catTitle}</h2>
      <p class="cat-descr">${catDescr}</p>
      <p class="cat-temp">
        <b class="cat-temp-title">Temperament: </b>
        ${catTemp};
      </p>
    </div>
    `;
}

new SlimSelect({
  select: refs.select
})