// Ottieni l'ID del prodotto dalla query string nell'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');

// API
// URL dell'API per ottenere i dettagli del prodotto
const apiUrl = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
// Token di autorizzazione per l'API
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmODk4M2I5YzBmNzAwMTQ0ODUwNTQiLCJpYXQiOjE2ODYwNzk4NzUsImV4cCI6MTY4NzI4OTQ3NX0.rUudpnckoFxoSB1xIqgCj3b3fIqvRgcxHtwMPt4Jm50';

// Funzione asincrona per ottenere i dettagli del prodotto dall'API
async function getProductDetails() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (response.ok) {
      const product = await response.json();
      displayProductDetails(product);
    } else {
      console.error('Errore durante il recupero dei dettagli del prodotto:', response.status);
    }
  } catch (error) {
    console.error('Errore durante il recupero dei dettagli del prodotto:', error);
  }
}

// Funzione per visualizzare i dettagli del prodotto nella pagina
function displayProductDetails(product) {
  const productContainer = document.getElementById('productDetails');
  const productImageContainer = document.getElementById('productImage');

  // Dichiarazione della variabile coverImageTemplate
  let coverImageTemplate = '';

  // Determina il template dell'immagine di copertina in base al brand del prodotto
  switch (product.brand) {
    case 'Category // Playstation':
      coverImageTemplate = 'ps5_cover_template';
      break;
    case 'Category // Xbox':
      coverImageTemplate = 'xbox_cover_template';
      break;
    case 'Category // Nintendo':
      coverImageTemplate = 'nintendo_cover_template';
      break;
    case 'Category // PC':
      coverImageTemplate = 'pc_cover_template';
      break;
    default:
      coverImageTemplate = '';
      break;
  }

  // Generazione degli elementi HTML per visualizzare i dettagli del prodotto
  const productElement = document.createElement('div');
  productElement.classList.add('mb-4');
  productElement.innerHTML = `
    <h1 class="my-3">${product.name}</h1>
    <h3 class="my-3">${product.price}.99€</h3>
    <p class="my-3">${product.description}</p>
    <a href="#" class="btn btn-outline-warning my-1"><small>Out of stock</small><i class="fa-solid fa-cart-shopping ms-2"></i></a>
    <p class="card-text ${getBrandClass(product.brand)} text-white rounded p-2 my-3">
      <small>${product.brand}</small>
    </p>
  `;

  const productImage = document.createElement('div');
  productImage.classList.add('position-relative', 'shadow-hover');
  productImage.innerHTML = `
    <div class="position-relative shadow-hover mx-3">
      <img src="${product.imageUrl}" class="img-fluid" alt="${product.name}">
      <img src="assets/cover/${coverImageTemplate}.png" class="img-fluid position-absolute top-0 start-0" alt="${product.name}">
    </div>
  `;

  // Aggiunta dei prodotti al contenitore nella pagina
  productContainer.appendChild(productElement);
  productImageContainer.appendChild(productImage);
}

// Richiedi i dettagli del prodotto quando la pagina viene caricata
document.addEventListener('DOMContentLoaded', getProductDetails);

// Funzione per restituire la classe di stile in base al brand del prodotto
function getBrandClass(brand) {
  switch (brand) {
    case 'Category // Playstation':
      return 'bg-primary';
    case 'Category // Nintendo':
      return 'bg-danger';
    case 'Category // Xbox':
      return 'bg-success';
    case 'Category // PC':
      return 'bg-secondary';
    default:
      return 'bg-primary';
  }
}