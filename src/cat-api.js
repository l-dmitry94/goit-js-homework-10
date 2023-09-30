import axios from 'axios';

export const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};


axios.defaults.headers.common['x-api-key'] =
  'live_nxqY5arkN4nOHU5fGQPW6s3cKzzajEtEYQiPEEeYeiSNiHsZYsmEbhme5qUSQ2AK';

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  showLoader();
  hideError();
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(response => {
      hideLoader();
      return response.data;
    })
    .catch(() => {
      showError();
      hideLoader();
    });
}

export function fetchCatByBreed(breedId) {
  showLoader();
  hideError();
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      hideLoader();
      return response.data[0];
    })
    .catch(() => {
      showError();
      hideLoader();
    });
}

export function hideError() {
  refs.error.hidden = true;
}

export function showError() {
  refs.error.hidden = false;
}

function hideLoader() {
  refs.loader.hidden = true;
}

function showLoader() {
  refs.loader.hidden = false;
}
