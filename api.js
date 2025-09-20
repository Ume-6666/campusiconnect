const API_BASE = localStorage.getItem('API_BASE') || 'http://localhost:8080';

async function apiJson(path, method='GET', body=null, auth=false) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = 'Bearer ' + token;
  }
  const res = await fetch(API_BASE + path, {
    method, headers, body: body ? JSON.stringify(body) : null
  });
  const data = await res.json().catch(()=>({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

async function apiForm(path, formData, auth=false) {
  const headers = {};
  if (auth) {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = 'Bearer ' + token;
  }
  const res = await fetch(API_BASE + path, { method:'POST', headers, body: formData });
  const data = await res.json().catch(()=>({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

function setStatus(el, msg, ok=true) {
  if (!el) return;
  el.textContent = msg;
  el.className = ok ? 'text-green-600' : 'text-red-600';
}

export { API_BASE, apiJson, apiForm, setStatus };
