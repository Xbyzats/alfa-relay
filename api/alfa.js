module.exports = async (req, res) => {
  const { keyword = 'gula', start = 0, limit = 30 } = req.query;
  const url = `https://webcommerce-gw.alfagift.id/v2/products/searches?keyword=${encodeURIComponent(keyword)}&start=${start}&limit=${limit}`;

  try {
    const response = await fetch(url, {
      headers: {
        'accept': 'application/json',
        'accept-language': 'id',
        'devicemodel': 'chrome',
        'devicetype': 'Web',
        'fingerprint': 'GEw2irAJxZ6XmMo3ICJaTwqAIEdD7pjRCe/QHuN6uHGhsiH2x3bBewEu10+IlxVo',
        'origin': 'https://alfagift.id',
        'referer': 'https://alfagift.id/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        'fccode': req.headers['fccode'] || '',
        'storecode': req.headers['storecode'] || '',
        'latitude': req.headers['latitude'] || '',
        'longitude': req.headers['longitude'] || '',
        ...(req.headers['token'] ? { 'token': req.headers['token'] } : {})
      }
    });

    const text = await response.text();
    try {
      const json = JSON.parse(text);
      return res.status(response.status).json(json);
    } catch {
      return res.status(response.status).send(text);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
