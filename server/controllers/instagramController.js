// Caché en memoria para no saturar la API
let cache = {
  data: null,
  lastFetch: null
};

const CACHE_DURATION = 1000 * 60 * 60; // 1 hora en milisegundos

export const getInstagramFeed = async (req, res, next) => {
  try {
    const now = Date.now();

    // 1. Revisar si tenemos datos en caché válidos
    if (cache.data && cache.lastFetch && (now - cache.lastFetch < CACHE_DURATION)) {
      console.log('Obteniendo feed de Instagram desde la caché ⚡');
      return res.json(cache.data);
    }

    // 2. Si no hay caché, hacer la petición a Behold.so (o la URL que usemos)
    // Para desarrollo, si no hay URL, usamos datos de prueba (mock) para poder armar la UI
    const feedUrl = process.env.INSTAGRAM_FEED_URL;
    
    if (!feedUrl) {
      console.log('⚠️ No hay INSTAGRAM_FEED_URL. Usando datos de prueba para desarrollo.');
      // Mockups premium si no hay URL configurada
      const mockData = Array(6).fill().map((_, i) => ({
        id: `mock_${i}`,
        mediaUrl: `https://picsum.photos/seed/${i + 10}/800/1000`, 
        thumbnailUrl: `https://picsum.photos/seed/${i + 10}/800/1000`,
        permalink: 'https://www.instagram.com/estudio_romina_gomez/',
        mediaType: i % 3 === 0 ? 'VIDEO' : 'IMAGE'
      }));
      
      cache.data = mockData;
      cache.lastFetch = now;
      return res.json(mockData);
    }

    console.log('Obteniendo feed de Instagram desde la API externa 🌐');
    const response = await fetch(feedUrl);
    
    if (!response.ok) {
      throw new Error(`Error en la API externa de Instagram: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Behold.so devuelve un objeto con 'posts', otras APIs pueden devolver 'data' o un array.
    const rawItems = Array.isArray(data) ? data : (data.posts || data.data || []);

    const formattedData = rawItems.map(post => ({
      id: post.id || Math.random().toString(36).substring(7),
      mediaUrl: post.mediaUrl || post.media_url || post.url,
      // Si es video, Behold.so suele mandar thumbnailUrl. Si no, usamos mediaUrl.
      thumbnailUrl: post.thumbnailUrl || post.thumbnail_url || post.mediaUrl || post.media_url || post.url,
      permalink: post.permalink || 'https://www.instagram.com/estudio_romina_gomez/',
      mediaType: (post.mediaType || post.media_type || 'IMAGE').toUpperCase()
    })).filter(post => post.thumbnailUrl).slice(0, 6); // Tomamos solo los últimos 6 válidos

    // 3. Guardar en caché
    cache.data = formattedData;
    cache.lastFetch = now;

    res.json(formattedData);
  } catch (error) {
    console.error('❌ Error al obtener el feed de Instagram:', error.message);
    
    // Si falla pero tenemos caché vieja, devolvemos la caché vieja para que no se rompa la web
    if (cache.data) {
       console.log('Usando caché antigua como respaldo.');
       return res.json(cache.data);
    }
    
    next(error);
  }
};
