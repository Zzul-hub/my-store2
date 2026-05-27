const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', '..', 'data.json');

function readData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch(e) {}
  return [
    { id: '1', name: 'Класичні штани', category: 'pants', price: 1200, images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop'], description: 'Елегантні класичні штани.' },
    { id: '2', name: 'В\'язана кофта', category: 'sweaters', price: 950, images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop'], description: 'Тепла кофта.' },
    { id: '3', name: 'Бавовняна футболка', category: 'tshirts', price: 450, images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop'], description: 'Базова футболка.' },
    { id: '4', name: 'Літня сукня', category: 'dresses', price: 1350, images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop'], description: 'Легка сукня.' },
    { id: '5', name: 'Діловий костюм', category: 'suits', price: 4500, images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=600&fit=crop'], description: 'Діловий костюм.' }
  ];
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod === 'GET') {
    const data = readData();
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  }

  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
      writeData(data);
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    } catch(e) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid data' }) };
    }
  }

  return { statusCode: 405, headers, body: 'Method not allowed' };
};