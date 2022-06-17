searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value; //para que busque lo que solicita el usuario en la url se escribira #search=loqueescribioelusuario//
  });
 
  trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
  });
 
  arrowBtn.addEventListener('click', () => {
    history.back();
    //location.hash = '#home';
  });

window.addEventListener('DOMContentLoaded', navigator, false); //cuando cargue la aplicacion se ejecuta la funcion navigator//
window.addEventListener('hashchange', navigator, false); //cuando cambie el hash # de la url se ejecuta la funcion navigator//

function navigator() { //navegador//
  console.log({ location });
  
  if (location.hash.startsWith('#trends')) {  //si empieza en la seccion de trends que muestre la seccion de tendencias//
    trendsPage();
  } else if (location.hash.startsWith('#search=')) { //si la url tiene search=, entonces estamos en la seccion de busqueda//
    searchPage();
  } else if (location.hash.startsWith('#movie=')) { //si la url tiene movie=, entonces estamos en la seccion de detalles de la pelicula//
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) { //si la url tiene category=, entonces estamos en la seccion de categorias//
    categoriesPage(); 
  } else { //sino estamos en el inicio de la pagina (home) //
    homePage();
  }
}

document.body.scrollTop = 0; //permite que cuando abramos otra vista muestre primero la parte de arriba de la página//
//document.documentElement.scrollTop = 0; para safari


function homePage() { //pagina de inicio (lo que queremos ocultar o remover o mostrar siempre)//
  console.log('Home!!');

  headerSection.classList.remove('header-container--long'); //que no aparezca la imagen de la pelicula en el header//
  headerSection.style.background = ''; //limpiar estilos background//
  arrowBtn.classList.add('inactive'); //que no aparezca la flecha en la parte superior izquierda//
  arrowBtn.classList.remove('header-arrow--white'); 
  headerTitle.classList.remove('inactive'); //que aparezca el titulo Platzi movie//
  headerCategoryTitle.classList.add('inactive'); //que no aparezca el titulo de las categorias en el header//
  searchForm.classList.remove('inactive'); //que aparezca el formulario de busqueda//

  trendingPreviewSection.classList.remove('inactive'); //que aparezca la lista de tendencias//
  categoriesPreviewSection.classList.remove('inactive'); //que aparezca la lista de categorias//
  genericSection.classList.add('inactive'); //que no aparezca la lista de generos//
  movieDetailSection.classList.add('inactive'); //que no aparezca el detalle de la pelicula//

  getTrendingMoviesPreview();
  getCategegoriesPreview();
}

function categoriesPage() { //pagina de categorias (lo que queremos ocultar o remover o agregar)//
  console.log('categories!!');

   headerSection.classList.remove('header-container--long'); //que no aparezca la imagen de la pelicula en el header//
   headerSection.style.background = ''; //limpiar estilos background//
   arrowBtn.classList.remove('inactive'); //que aparezca la flecha en la parte superior izquierda//
   arrowBtn.classList.remove('header-arrow--white'); //que aparezca la flecha en morado//
   headerTitle.classList.add('inactive'); //que no aparezca el titulo Platzi movie//
   headerCategoryTitle.classList.remove('inactive'); //que aparezca el titulo de las categorias en el header//
   searchForm.classList.add('inactive'); //que no aparezca el formulario de busqueda//

   trendingPreviewSection.classList.add('inactive');
   categoriesPreviewSection.classList.add('inactive');
   genericSection.classList.remove('inactive');
   movieDetailSection.classList.add('inactive');

     // ['#category', 'id-name']
     const [_, categoryData] = location.hash.split('='); //cada vez que en la url haya un = va a ser el primer elemento(category)//
     const [categoryId, categoryName] = categoryData.split('-'); //separar el id de la categoria y el nombre de la categoria con un - //
  
     headerCategoryTitle.innerHTML = categoryName; //escribir como titulo el nombre de la categoria//
  
     getMoviesByCategory(categoryId); //abrir la funcion getMoviesByCategory con los id de la categoria seleccionada//
   
}

function movieDetailsPage() { //pagina con detalles de la pelicula (lo que queremos ocultar o remover o agregar)//
  console.log('Movie!!');

  headerSection.classList.add('header-container--long'); //que aparezca la imagen de la pelicula en el header//
  // headerSection.style.background = '';
  arrowBtn.classList.remove('inactive'); //que aparezca la flecha en la parte superior izquierda (blanca)//
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive'); //que no aparezca el titulo Platzi movie//
  headerCategoryTitle.classList.add('inactive'); //que no aparezca el titulo de las categorias en el header//
  searchForm.classList.add('inactive');  //que no aparezca el formulario de busqueda//

  trendingPreviewSection.classList.add('inactive'); //que aparezca la lista de tendencias o titulos similares//
  categoriesPreviewSection.classList.add('inactive'); //que aparezca la lista de categorias//
  genericSection.classList.add('inactive');  //que aparezca la lista de generos//
  movieDetailSection.classList.remove('inactive'); //que aparezca el detalle de la pelicula//

    // ['#movie', '234567']
    const [_, movieId] = location.hash.split('=');  //cada vez que en la url haya un = luego ira el id de la pelicula//
    getMovieById(movieId);  //abrir la funcion getMoviesByID con los id de la categoria seleccionada para ver el detalle de la pelicula e imagen//
}

function searchPage() { //buscador (lo que queremos ocultar o remover o agregar)//
  console.log('Search!!');

  headerSection.classList.remove('header-container--long');
   headerSection.style.background = '';
   arrowBtn.classList.remove('inactive');
   arrowBtn.classList.remove('header-arrow--white');
   headerTitle.classList.add('inactive');
   headerCategoryTitle.classList.add('inactive'); //que no aparezca el titulo de la categoria//
   searchForm.classList.remove('inactive');

   trendingPreviewSection.classList.add('inactive');
   categoriesPreviewSection.classList.add('inactive');
   genericSection.classList.remove('inactive');
   movieDetailSection.classList.add('inactive');

     // ['#search', 'platzi']
     const [_, query] = location.hash.split('='); //tiene resultado un array, y agrega un = despues del search//
     getMoviesBySearch(query); //llama a la funcion de busqueda creada en main.js//
}

function trendsPage() { //tendencias (lo que queremos ocultar o remover o agregar)//
  console.log('TRENDS!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  headerCategoryTitle.innerHTML = 'Tendencias';

  getTrendingMovies();
 }

