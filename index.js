let seleccionados = [];
// cada vez que el valor del elemento input cambia
buscador.addEventListener("input", () => {
  //vacia el array de los nombres seleccionados
  seleccionados.length = 0;
  //para más eficiencia crea un nuevo fragmento
  let fragment = document.createDocumentFragment();
  //recuoera el valor del input y guardalo en una variable
  let elValor = buscador.value;
  //si hay un valor
  if (elValor.length > 0) {
  // busca en el json si el nombre incluye (o empieza por) el valor
    peliculas.forEach(j => {
      //if(j.nombre.startsWith(elValor))
      if (j.Title.includes(elValor)) {
        // si lo incluye agregalo al array de los seleccionados
        seleccionados.push(j.Title);
      }
    });
    //para cada elemento selccionado
    seleccionados.forEach(s => {
    //crea un nuevo elemento p
      let p = document.createElement("p");
      //cuyo innerHTML es el nombre seleccionado
      p.innerHTML = s;
      //y agregalo al fragmento
      fragment.appendChild(p);
    });
    //vacía el resultado 
    resultado.innerHTML = "";
    //agrega el fragmento al resultado
    resultado.appendChild(fragment);
  }
});


const contenedor = document.getElementById('contenedor');

let peliculas =[];

fetch('peliculas.json').then((data)=>{
    return data.json()
 })
 .then((data) => {
    peliculas = data;
 });

 const mostrarPeliculas = (peliculas) => {

    const peliculasDiv = peliculas.map((pelicula, peliculaIndex)=>{
        const peliculaDiv = document.createElement('div');
        peliculaDiv.classList.add('pelicula');
    
        const index = document.createElement('p')
        index.textContent = 'No.' + (peliculaIndex +1);
        peliculaDiv.appendChild(index);

        const poster = document.createElement('img');
        poster.src=pelicula.Poster;
        peliculaDiv.appendChild(poster);
    
        const tituloP=document.createElement('p');
        tituloP.textContent = pelicula.Title;
        peliculaDiv.appendChild(tituloP);
    
        const añoP = document.createElement('p');
        añoP.textContent = pelicula.Year;
        peliculaDiv.appendChild(añoP);
    
        const tipoP = document.createElement('P');
        tipoP.textContent = pelicula.Rated;
        peliculaDiv.appendChild(tipoP);
    
        const lanzamientoP = document.createElement('P');
        lanzamientoP.textContent = pelicula.Released;
        peliculaDiv.appendChild(lanzamientoP);
    
        const tiempoP = document.createElement('P');
        tiempoP.textContent = pelicula.Runtime;
        peliculaDiv.appendChild(tiempoP);

        
        const div_rate = document.createElement('div'); 

        const ratingsDIv = pelicula.Ratings.map((rating) => {
            const ratingDiv = document.createElement('div');
        
            const sourceP = document.createElement('spam');
            sourceP.textContent = rating.Source;
            ratingDiv.appendChild(sourceP);
        
            const valueP = document.createElement('spam');
            valueP.textContent = rating.Value;
            ratingDiv.appendChild(valueP);
                
            return ratingDiv
        });
        ratingsDIv.forEach((element) =>{
            div_rate.appendChild(element);
        });
        
        peliculaDiv.appendChild(div_rate);
        return peliculaDiv
    });
    peliculasDiv.forEach((element) => {
      contenedor.appendChild(element);  
    });  

   
};    
     

 //top3 peliculas mejor rating
 const top3 = () => {

    contenedor.innerHTML='';
    peliculas.sort((a, b) =>{
        if(a.Metascore < b.Metascore){
            return 1;
        }   else if (b.Metascore < a.Metascore){
            return -1;
        }   else {
            return 0;
        }
    });
    const top_3 =peliculas.slice(0, 3);
    
    mostrarPeliculas(top_3);
};

//Convertir string a fecha

//Dividir la fecha en partes
const stringToDate = (cadenaFecha) => {
    const parteFecha = cadenaFecha.split(" ");

    //Obtener partes individuales
    const dia = parseInt(parteFecha[0],10);
    const mesTexto = parteFecha[1];
    const year = parseInt(parteFecha[2],10);
    const meses =[
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const mes = meses.indexOf(mesTexto); //Indice del mes
    return new Date (year, mes, dia);
};

const lanzamiento = () => {

    contenedor.innerHTML='';

    peliculas.sort((a, b) => {
        const fechaA = stringToDate(a.Released);
        const fechaB = stringToDate(b.Released);
        if(fechaA < fechaB){
            return 1;
        }   else if (fechaB < fechaA){
            return -1;
        }   else {
            return 0;
        }
    });
    
    mostrarPeliculas(peliculas);

};

const alfabetico = () => {
    contenedor.innerHTML='';
    
    peliculas.sort((a, b) =>{
        if(a.Title < b.Title){
            return -1;
        }   else if (b.Title < a.Title){
            return 1;
        }   else {
            return 0;
        }
    });
    
    mostrarPeliculas(peliculas);
};

const ejercicio1Button = document.getElementById('button1');
ejercicio1Button.addEventListener('click', top3);

const ejercicio2Button = document.getElementById('button2');
ejercicio2Button.addEventListener('click', lanzamiento);

const ejercicio3Button = document.getElementById('button3');
ejercicio3Button.addEventListener('click', alfabetico);



let loadMoreBtn1 = document.querySelector('#load-more-1');
let currentItem1 = 4;

loadMoreBtn1.onclick = () => {
    let boxes = [...document.querySelectorAll(
        '.box-container-1 .box-1'
    )];
    for(var i = currentItem1; i < currentItem1 + 4; i++) {
        boxes[i].style.display = 'inline-block'; 
    }
    currentItem1 += 4;
    if(currentItem1 >= boxes.length) {
        loadMoreBtn1.style.display ='none'
    }
    
}

let loadMoreBtn2 = document.querySelector('#load-more-2');
let currentItem2 = 4;

loadMoreBtn2.onclick = () => {
    let boxes = [...document.querySelectorAll(
        '.box-container-2 .box-2'
    )];
    for(var i = currentItem2; i < currentItem2 + 4; i++) {
        boxes[i].style.display = 'inline-block'; 
    }
    currentItem2 += 4;
    if(currentItem2 >= boxes.length) {
        loadMoreBtn2.style.display ='none'
    }
    
}

let loadMoreBtn3 = document.querySelector('#load-more-3');
let currentItem3 = 4;

loadMoreBtn3.onclick = () => {
    let boxes = [...document.querySelectorAll(
        '.box-container-3 .box-3'
    )];
    for(var i = currentItem3; i < currentItem3 + 4; i++) {
        boxes[i].style.display = 'inline-block'; 
    }
    currentItem3 += 4;
    if(currentItem3 >= boxes.length) {
        loadMoreBtn3.style.display ='none'
    }
    
}