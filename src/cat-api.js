import axios from 'axios';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css"

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
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(response => {
      hideLoader();
      return response.data;
    })
    .catch(() => {
      Notiflix.Notify.failure(refs.error.textContent)
      hideLoader();
    });
}

export function fetchCatByBreed(breedId) {
  showLoader();
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      hideLoader();
      return response.data[0];
    })
    .catch(() => {
      Notiflix.Notify.failure(refs.error.textContent)
      hideLoader();
    });
}

function hideLoader() {
  refs.loader.classList.add("hidden");
}

function showLoader() {
  refs.loader.classList.remove("hidden");

}
