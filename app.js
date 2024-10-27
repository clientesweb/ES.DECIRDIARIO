// Configuración de la API de Instagram
const INSTAGRAM_ACCESS_TOKEN = 'TU_TOKEN_DE_ACCESO_DE_INSTAGRAM';
const  INSTAGRAM_USER_ID = 'TU_ID_DE_USUARIO_DE_INSTAGRAM';

// Sistema de gestión de contenidos simplificado
class CMS {
    constructor() {
        this.editableElements = document.querySelectorAll('.cms-editable');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.editableElements.forEach(element => {
            element.addEventListener('blur', () => this.saveContent(element));
        });
    }

    saveContent(element) {
        const content = element.innerHTML;
        const id = element.id;
        // Aquí se enviaría el contenido al servidor para guardarlo
        console.log(`Guardando contenido para ${id}:`, content);
    }
}

// Sistema de búsqueda
class SearchSystem {
    constructor() {
        this.searchForm = document.getElementById('search-form');
        this.searchInput = this.searchForm.querySelector('input[type="search"]');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.searchForm.addEventListener('submit', (e) => this.handleSearch(e));
        this.searchInput.addEventListener('input', () => this.handleSearchInput());
    }

    handleSearch(e) {
        e.preventDefault();
        const query = this.searchInput.value;
        // Aquí se realizaría la búsqueda real en el servidor
        console.log('Realizando búsqueda:', query);
    }

    handleSearchInput() {
        const query = this.searchInput.value;
        if (query.length > 2) {
            this.showSearchResults(query);
        } else {
            this.hideSearchResults();
        }
    }

    showSearchResults(query) {
        // Aquí se mostrarían los resultados de búsqueda en tiempo real
        console.log('Mostrando resultados para:', query);
    }

    hideSearchResults() {
        // Aquí se ocultarían los resultados de búsqueda
        console.log('Ocultando resultados de búsqueda');
    }
}

// Caché del lado del cliente
class ClientCache {
    constructor() {
        this.cache = {};
    }

    set(key, value, ttl = 3600000) { // TTL por defecto: 1 hora
        const now = new Date().getTime();
        this.cache[key] = {
            value: value,
            expiry: now + ttl
        };
    }

    get(key) {
        const cached = this.cache[key];
        if (!cached) return null;
        const now = new Date().getTime();
        if (now > cached.expiry) {
            delete this.cache[key];
            return null;
        }
        return cached.value;
    }
}

// Funciones para cargar contenido
async function loadFeaturedNews() {
    const slider = document.getElementById('news-slider');
    const cachedNews = clientCache.get('featuredNews');
    
    if (cachedNews) {
        renderFeaturedNews(cachedNews);
    } else {
        try {
            // En un caso real, estos datos vendrían de una API
            const featuredNews = [
                { id: 1, title: "Descubrimiento científico revolucionario", image: "https://via.placeholder.com/800x400?text=Noticia+1", summary: "Un equipo de científicos ha logrado un avance significativo en la lucha contra el cáncer." },
                { id: 2, title: "Nueva política económica anunciada", image: "https://via.placeholder.com/800x400?text=Noticia+2", summary: "El gobierno anuncia medidas para impulsar la economía y crear nuevos empleos." },
                { id: 3, title: "Avances en inteligencia artificial", image: "https://via.placeholder.com/800x400?text=Noticia+3", summary: "Una IA supera a humanos en tareas de razonamiento complejo, marcando un hito en el campo." },
                { id: 4, title: "Récord en energías renovables", image: "https://via.placeholder.com/800x400?text=Noticia+4", summary: "El país alcanza un nuevo récord en la producción de energía a partir de fuentes renovables." },
            ];
            clientCache.set('featuredNews', featuredNews);
            renderFeaturedNews(featuredNews);
        } catch (error) {
            console.error('Error al cargar noticias destacadas:', error);
            slider.innerHTML = '<p>No se pudieron cargar las noticias destacadas. Por favor, inténtalo de nuevo más tarde.</p>';
        }
    }
}

function renderFeaturedNews(news) {
    const slider = document.getElementById('news-slider');
    slider.innerHTML = '';
    news.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.className = 'flex-none w-full';
        newsCard.innerHTML = `
            <img src="${item.image}" alt="" class="w-full h-64 object-cover">
            <div class="p-4 bg-white">
                <h3 class="text-xl font-bold mb-2">${item.title}</h3>
                <p class="mb-4">${item.summary}</p>
                <a href="noticia.html?id=${item.id}" class="text-secondary hover:underline">Leer más</a>
            </div>
        `;
        slider.appendChild(newsCard);
    });
    initializeSlider();
}

// Función para inicializar el slider
function initializeSlider() {
    const slider = document.getElementById('news-slider');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    let currentIndex = 0;

    function showSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slider.children.length) % slider.children.length;
        showSlide(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slider.children.length;
        showSlide(currentIndex);
    });
}

async function loadRecentNews() {
    const newsGrid = document.getElementById('news-grid');
    const cachedNews = clientCache.get('recentNews');
    
    if (cachedNews) {
        renderRecentNews(cachedNews);
    } else {
        try {
            // En un caso real, estos datos vendrían de una API
            const recentNews = [
                { id: 5, title: "Éxito en misión espacial", category: "Ciencia", image: "https://via.placeholder.com/400x300?text=Noticia+5" },
                { id: 6, title: "Nuevo récord en deportes", category: "Deportes", image: "https://via.placeholder.com/400x300?text=Noticia+6" },
                { id: 7, title: "Avances en medicina regenerativa", category: "Salud", image: "https://via.placeholder.com/400x300?text=Noticia+7" },
                { id: 8, title: "Innovación en tecnología verde", category: "Tecnología", image: "https://via.placeholder.com/400x300?text=Noticia+8" }
            ];
            clientCache.set('recentNews', recentNews);
            renderRecentNews(recentNews);
        } catch (error) {
            console.error('Error al cargar noticias recientes:', error);
            newsGrid.innerHTML = '<p>No se pudieron cargar las noticias recientes. Por favor, inténtalo de nuevo más tarde.</p>';
        }
    }
}

function renderRecentNews(news) {
    const newsGrid = document.getElementById('news-grid');
    newsGrid.innerHTML = '';
    news.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card bg-white rounded-lg shadow-md overflow-hidden';
        newsCard.innerHTML = `
            <img src="${item.image}" alt="" class="w-full h-48 object-cover">
            <div class="p-4">
                <span class="text-xs font-semibold text-accent uppercase">${item.category}</span>
                <h3 class="text-lg font-bold mt-2">${item.title}</h3>
                <a href="noticia.html?id=${item.id}" class="mt-4 inline-block text-secondary hover:underline">Leer más</a>
            </div>
        `;
        newsGrid.appendChild(newsCard);
    });
}

async function loadInstagramFeed() {
    const instagramGrid = document.getElementById('instagram-grid');
    const cachedFeed = clientCache.get('instagramFeed');
    
    if (cachedFeed) {
        renderInstagramFeed(cachedFeed);
    } else {
        try {
            const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}`);
            const data = await response.json();
            const posts = data.data.slice(0, 9); // Tomamos los primeros 9 posts
            clientCache.set('instagramFeed', posts, 3600000); // Cache por 1 hora
            renderInstagramFeed(posts);
        } catch (error) {
            console.error('Error al cargar el feed de Instagram:', error);
            instagramGrid.innerHTML = '<p>No se pudo cargar el feed de Instagram. Por favor, inténtalo de nuevo más tarde.</p>';
        }
    }
}

function renderInstagramFeed(posts) {
    const instagramGrid = document.getElementById('instagram-grid');
    instagramGrid.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'instagram-post aspect-square';
        postElement.innerHTML = `
            <a href="${post.permalink}" target="_blank" rel="noopener noreferrer">
                <img src="${post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}" alt="${post.caption || 'Instagram post'}" class="w-full h-full object-cover">
            </a>
        `;
        instagramGrid.appendChild(postElement);
    });
}

async function loadPopularNews() {
    const popularList = document.getElementById('popular-list');
    const cachedNews = clientCache.get('popularNews');
    
    if (cachedNews) {
        renderPopularNews(cachedNews);
    } else {
        try {
            // En un caso real, estos datos vendrían de una API
            const popularNews = [
                { id: 9, title: "Los 10 destinos turísticos más populares del 2023" },
                { id: 10, title: "Cómo la tecnología está cambiando nuestros hábitos de consumo" },
                { id: 11, title: "Los beneficios ocultos del ejercicio regular" },
                { id: 12, title: "El auge de las criptomonedas: ¿moda o revolución financiera?" }
            ];
            clientCache.set('popularNews', popularNews);
            renderPopularNews(popularNews);
        } catch (error) {
            console.error('Error al cargar noticias populares:', error);
            popularList.innerHTML = '<p>No se pudieron cargar las noticias populares. Por favor, inténtalo de nuevo más tarde.</p>';
        }
    }
}

function renderPopularNews(news) {
    const popularList = document.getElementById('popular-list');
    popularList.innerHTML = '';
    news.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <a href="noticia.html?id=${item.id}" class="block bg-white rounded-lg shadow-md p-4 hover:bg-gray-50 transition duration-300">
                ${item.title}
            </a>
        `;
        popularList.appendChild(listItem);
    });
}

// Manejar el menú móvil
document.getElementById('mobile-menu-button').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Manejar el formulario de suscripción
document.getElementById('subscribe-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // En un caso real, aquí se enviaría la información a un servidor
    alert('¡Gracias por suscribirte!');
    e.target.reset();
});

// Manejar el botón "Cargar más"
document.getElementById('load-more').addEventListener('click', () => {
    // En un caso real, aquí se cargarían más noticias de una API
    alert('Cargando más noticias...');
});

// Inicializar funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const cms = new CMS();
    const searchSystem = new SearchSystem();
    const clientCache = new ClientCache();

    loadFeaturedNews();
    loadRecentNews();
    loadInstagramFeed();
    loadPopularNews();
});

// Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration.scope);
            })
            .catch(error => {
                console.log('Error al registrar el Service Worker:', error);
            });
    });
}