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

async function getTrendingMoviesPreview() { //Solicitud API para tener las tendencias de peliculas//
    //const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    //const data = await res.json();
    
    const { data } = await api('trending/movie/day'); //con axios//
    const movies = data.results; //con axios//

      movies.forEach(movie => {   //Crear por pelicula, una imagen de la pelicula, clase y alt, el src con la url de la imagen a crear//
      const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList') //selecciona el trending preview que tiene clase contenedora trendingPreview-movieList//
      
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');
  
      const movieImg = document.createElement('img'); //Crear imagen //
      movieImg.classList.add('movie-img'); //crear la clase//
      movieImg.setAttribute('alt', movie.title); //2 argumentos.. 1.- atributo (alt) y luego el 2.- el valor del atributo (movie.title)
      movieImg.setAttribute( //2 argumentos al atributo.. 1.- scr y 2.- valor del atributo (url w300 es ancho de los pixeles) y el poster path
        'src',
        'https://image.tmdb.org/t/p/w300' + movie.poster_path,
      );
  
      movieContainer.appendChild(movieImg); //llama la imagen//
      trendingPreviewMoviesContainer.appendChild(movieContainer); //llama al contenedor //
    });
  }

  async function getCategegoriesPreview() { //Solicitud API para tener la lista de peliculas filtradas por categoria//
    //const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    //const data = await res.json();
  
    //const categories = data.genres; //se busca filtrar por el genero de la categoria por eso es data.genres//
    const { data } = await api('genre/movie/list'); //con axios//
    const categories = data.genres;  //con axios//

    categories.forEach(category => {
      const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
      
      const categoryContainer = document.createElement('div');
      categoryContainer.classList.add('category-container');
  
      const categoryTitle = document.createElement('h3'); //crear titulo h3//
      categoryTitle.classList.add('category-title');  //agrega la clase categoria titulo//
      categoryTitle.setAttribute('id', 'id' + category.id); //permite tener los colores en cada una de las categorias//
      const categoryTitleText = document.createTextNode(category.name); //crea un titulo del texto con el nombre de la categoria//
  
      categoryTitle.appendChild(categoryTitleText);
      categoryContainer.appendChild(categoryTitle);
      previewCategoriesContainer.appendChild(categoryContainer);
    });
  }
  
  getTrendingMoviesPreview(); //llama la funcion creada (Solicitud API para tener las tendencias de peliculas)//
  getCategegoriesPreview(); //llama la funcion creada (Solicitud API para tener las categorias de las peliculas)//
