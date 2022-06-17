//axios//
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      'api_key': API_KEY,
    },
  });

//async function getTrendingMoviesPreview() { //Solicitud API para tener las tendencias de peliculas//
    //const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY); //con fetch
    //const data = await res.json();   //con fe
    
//    const { data } = await api('trending/movie/day'); //con axios//
//    const movies = data.results; //con axios//

//    trendingMoviesPreviewList.innerHTML = ""; //borra el contenido cada vez que carguemos la informacion para que no de error//

// Utils

   function createMovies(movies, container) {
   container.innerHTML = '';


      movies.forEach(movie => {   //Crear por pelicula, una imagen de la pelicula, clase y alt, el src con la url de la imagen a crear//
     // const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList') //selecciona el trending preview que tiene clase contenedora trendingPreview-movieList//
      
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');
      movieContainer.addEventListener('click', () => {
        location.hash = '#movie=' + movie.id;
      });
  
      const movieImg = document.createElement('img'); //Crear imagen //
      movieImg.classList.add('movie-img'); //crear la clase//
      movieImg.setAttribute('alt', movie.title); //2 argumentos.. 1.- atributo (alt) y luego el 2.- el valor del atributo (movie.title)
      movieImg.setAttribute( //2 argumentos al atributo.. 1.- scr y 2.- valor del atributo (url w300 es ancho de los pixeles) y el poster path
        'src',
        'https://image.tmdb.org/t/p/w300' + movie.poster_path,
      );
  
      movieContainer.appendChild(movieImg); //llama la imagen//
      //trendingPreviewMoviesContainer.appendChild(movieContainer); //llama al contenedor //
      //trendingMoviesPreviewList.appendChild(movieContainer);
      container.appendChild(movieContainer);
    });
  }

  //async function getCategegoriesPreview() { //Solicitud API para tener la lista de peliculas filtradas por categoria//
    //const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    //const data = await res.json();
  
    //const categories = data.genres; //se busca filtrar por el genero de la categoria por eso es data.genres//
   // const { data } = await api('genre/movie/list'); //con axios//
   // const categories = data.genres;  //con axios//

    //categories.forEach(category => {
    //  const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
      
  //  categoriesPreviewList.innerHTML = ""; //borra el contenido cada vez que carguemos la informacion para que no de error//
    
    function createCategories(categories, container) { //sirve para crear categorias//
    container.innerHTML = "";  
  
    categories.forEach(category => {  

      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');
  
      const categoryTitle = document.createElement('h3'); //crear titulo h3//
      categoryTitle.classList.add('category-title');  //agrega la clase categoria titulo//
      categoryTitle.setAttribute('id', 'id' + category.id); //permite tener los colores en cada una de las categorias//
      
      categoryTitle.addEventListener('click', () => { //Cada vez que el usuario le de click a una categoria hara que cambie a la vista de categoria//
      location.hash = `#category=${category.id}-${category.name}`; //me agrega en la url #category=n°id-genero, se agrega el id y la categoria para que el usuario lo pueda reconocer//
      });
      const categoryTitleText = document.createTextNode(category.name); //crea un titulo del texto con el nombre de la categoria//
  
      categoryTitle.appendChild(categoryTitleText);
      categoryContainer.appendChild(categoryTitle);
     // previewCategoriesContainer.appendChild(categoryContainer);
     //categoriesPreviewList.appendChild(categoryContainer);
     container.appendChild(categoryContainer);
    });
  }
  
// Llamados a la API //sirve para reducir codigo//

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(movies)
 
    createMovies(movies, trendingMoviesPreviewList);
  }
 
  async function getCategegoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
 
    createCategories(categories, categoriesPreviewList)  ;
  }

  //getTrendingMoviesPreview(); //llama la funcion creada (Solicitud API para tener las tendencias de peliculas)//
  //getCategegoriesPreview(); //llama la funcion creada (Solicitud API para tener las categorias de las peliculas)//

  async function getMoviesByCategory(id) { //Solicitud API funcion para tener las lista de peliculas que pertenecen a cierto genero//
    const { data } = await api('discover/movie', {
      params: {
        with_genres: id, //los parametros a enviar que son los id y permiten filtrar las peliculas//
      },
    });
    const movies = data.results;
 
    //genericSection.innerHTML = "";
    //movies.forEach(movie => {
    //  const movieContainer = document.createElement('div');
    //  movieContainer.classList.add('movie-container');
 
    //  const movieImg = document.createElement('img');
    //  movieImg.classList.add('movie-img');
    //  movieImg.setAttribute('alt', movie.title);
    //  movieImg.setAttribute(
    //    'src',
    //    'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    //  );
 
    //  movieContainer.appendChild(movieImg); //inserta las imagenes en la seccion de peliculas por categoria//
    //  genericSection.appendChild(movieContainer); //inserta la seccion de genero//

    createMovies(movies, genericSection);
//    });
  }

  async function getMoviesBySearch(query) { //Solicitud API funcion para buscar la peliculas en el buscador//
    const { data } = await api('search/movie', {
      params: {
        query,
      },
    });
    const movies = data.results;
 
    createMovies(movies, genericSection);
  }
 
  async function getTrendingMovies() { //Solicitud API funcion para ver las tendencias//
    const { data } = await api('trending/movie/day');
    const movies = data.results;
  
    createMovies(movies, genericSection);
  }

  async function getMovieById(id) { //Solicitud API funcion para ver el detalle de la pelicula//
    const { data: movie } = await api('movie/' + id);
  
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path; //imagen de la pelicula//
    console.log(movieImgUrl)
    headerSection.style.background = `    
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
      ),
      url(${movieImgUrl}) 
    `; //header section muestra la imagen que va en grande y le baja el tono a la imagen //
    
    movieDetailTitle.textContent = movie.title;  //titulo de la pelicula luego del . aparece title (esto se busca en la página de la API)//
    movieDetailDescription.textContent = movie.overview;  //descripción de la pelicula//
    movieDetailScore.textContent = movie.vote_average;  //puntuación de la pelicula//
  
    createCategories(movie.genres, movieDetailCategoriesList); //permite que en el contenedor movieDetailCategoriesList aparezca la lista de generos que tiene la pelicula//
  
    getRelatedMoviesId(id);
  }
  
  async function getRelatedMoviesId(id) { //Solicitud API funcion para mostrar las peliculas similares//
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;
  
    createMovies(relatedMovies, relatedMoviesContainer); //ocupar funcion para crear peliculas, permite que en el contenedor relatedMoviesContainer aparezcan las peliculas similares//
  }

  