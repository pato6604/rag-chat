Eres un implementador de código.

# Contexto
Proyecto **Esperanto** — un sistema RAG con backend FastAPI y frontend Next.js.
- Directorio: `C:\Users\Patricio Quintana\rag-project` (Windows, git-bash)
- Backend: FastAPI en backend/app/
- Frontend: Next.js en frontend/
- Qdrant actual: en memoria (`:memory:`) — NO persistente
- Streaming SSE: ya implementado en backend y frontend
- Puerto actual: 8002

# Tarea: Separar entornos Dev/Prod + mejorar manejo de errores

## Parte 1 — Config de entornos (dev/prod)

### 1.1 Backend `config.py`
Modificar `backend/app/config.py` para:
- Agregar variable `QDRANT_MODE` (default: `"local"`) que se lee del entorno
- Cuando `QDRANT_MODE=local`: Qdrant persiste a disco en `qdrant_path` (ya existe como `./qdrant_db`), NO en `:memory:`
- Cuando `QDRANT_MODE=cloud`: Qdrant se conecta a `QDRANT_URL` + `QDRANT_API_KEY` (para cuando configure Qdrant Cloud después)
- El puerto del backend debe leerse de env `PORT` (default 8000)
- `CORS_ORIGINS` desde env (formato comma-separated, default `http://localhost:3000`)
- Mejorar la lectura de `GOOGLE_API_KEY`: priorizar env var, después .env en backend/, después fallback a hermes .env
- La `gemini_base_url` también debe ser configurable via env var `GEMINI_BASE_URL` (default: el actual de Gemini)

### 1.2 Backend `.env` file
Crear `backend/.env.example` con todas las variables documentadas:
```
# Google AI
GOOGLE_API_KEY=tu_key_aqui

# Qdrant
QDRANT_MODE=local        # "local" o "cloud"
# QDRANT_URL=https://xxx.cloud.qdrant.io:6333   # Solo si QDRANT_MODE=cloud
# QDRANT_API_KEY=xxx                              # Solo si QDRANT_MODE=cloud

# Backend
PORT=8000
CORS_ORIGINS=http://localhost:3000

# Gemini
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai
```

### 1.3 Backend `rag_engine.py`
Modificar `_get_qdrant()` para:
- Si `QDRANT_MODE=local`: usar `QdrantClient(path=settings.qdrant_path)` (persistente a disco)
- Si `QDRANT_MODE=cloud`: usar `QdrantClient(url=settings.qdrant_url, api_key=settings.qdrant_api_key)`
- NOTA: ya existe el field `qdrant_path` en settings, solo hay que usarlo correctamente

### 1.4 Frontend `.env.example`
Crear `frontend/.env.example`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Parte 2 — Manejo de errores mejorado

### 2.1 Backend `routes/chat.py`
- Agregar timeout de 30s en el streaming endpoint
- Capturar `TimeoutError` aparte y devolver un mensaje user-friendly
- Mejorar mensaje de error de RateLimit: "Gemini está recargando, esperá 30 segundos y volvé a preguntar"
- Agregar logging básico de errores con `print()` o `logging`

### 2.2 Frontend `page.tsx`
- Agregar un timeout de 60s en la conexión SSE (si no llega data en 60s, mostrar error)
- Mejorar el mensaje de error de Gemini rate limit para que sea más visible
- Asegurar que `loading` state se desactive correctamente en todos los casos de error
- Mostrar indicador visual de streaming mientras se reciben chunks (opcional: dots animados)

## Parte 3 — Scripts actualizados

### 3.1 `start_backend.sh`
Actualizar para:
```bash
cd "/c/Users/Patricio Quintana/rag-project/backend"
source venv/Scripts/activate
python -m uvicorn app.main:app --reload --port ${PORT:-8000}
```

### 3.2 `start_frontend.sh`
Actualizar para que use el puerto correcto:
```bash
cd "/c/Users/Patricio Quintana/rag-project/frontend"
npx next dev -p 3000
```

## Restricciones
- NO toques nada de la UI más allá de lo mencionado
- NO toques el streaming SSE (ya funciona)
- NO cambies los modelos (Gemini 2.5 Flash, gemini-embedding-001)
- NO borres archivos existentes
- TODOS los comentarios y mensajes en español

## Verificación
1. Corré: `cd backend && python -c "from app.config import settings; print(f'Mode: {settings.QDRANT_MODE}, Port: {settings.port}')"`
2. Verificá que el backend arranque: `cd backend && python -m uvicorn app.main:app --port 8000`
3. Verificá que el frontend compile: `cd frontend && npx next build 2>&1 | tail -5`
4. Probá subir un PDF/TXT, preguntar algo, y verificar que los errores se muestren bien
