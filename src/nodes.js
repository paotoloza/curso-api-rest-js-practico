// Crear cada una de las secciones
const $ = (id) => document.querySelector(id); //Permite no tener que repetir el document.querySelector() tantas veces, lo reemplaza por $//

const headerSection = $('#header');
const trendingPreviewSection = $('#trendingPreview');
const categoriesPreviewSection = $('#categoriesPreview');
const genericSection = $('#genericList');
const movieDetailSection = $('#movieDetail');

// Lists & Containers
const searchForm = document.querySelector('#searchForm');
const trendingMoviesPreviewList = document.querySelector('.trendingPreview-movieList');
const categoriesPreviewList = document.querySelector('.categoriesPreview-list');
const movieDetailCategoriesList = document.querySelector('#movieDetail .categories-list');
const relatedMoviesContainer = document.querySelector('.relatedMovies-scrollContainer');

// Elements
const headerTitle = document.querySelector('.header-title');
const arrowBtn = document.querySelector('.header-arrow');
const headerCategoryTitle = document.querySelector('.header-title--categoryView');

const searchFormInput = document.querySelector('#searchForm input');
const searchFormBtn = document.querySelector('#searchBtn');

const trendingBtn = document.querySelector('.trendingPreview-btn');

const movieDetailTitle = document.querySelector('.movieDetail-title');
const movieDetailDescription = document.querySelector('.movieDetail-description');
const movieDetailScore = document.querySelector('.movieDetail-score');