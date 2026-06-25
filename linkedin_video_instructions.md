
# 🎬 Video Demo — RAG Chat (LinkedIn)

## Duración: 45-60 segundos

### Escena 1 — Apertura (5s)
Mostrar `http://localhost:3000` recién cargado.
- Se ve la UI oscura con acento verde esmeralda
- Sidebar colapsada, el chat vacío con el mensaje de bienvenida

### Escena 2 — Upload de documento (10s)
- Click en "Subir documento"
- Seleccionar cualquier PDF que tengas a mano (un paper, documento técnico, etc.)
- Aparece el mensaje: `"documento.pdf" indexado (X chunks)`

### Escena 3 — Pregunta con streaming (20-25s)
- Escribir: **"¿De qué trata este documento?"**
- **Lo importante**: mostrar que la respuesta aparece **carácter por carácter** en vivo
- Repetir con una segunda pregunta como **"Hacé un resumen en 3 puntos"**
- Mostrar las **sources** (etiquetas verdes con el nombre del archivo) al final

### Escena 4 — Error handling demo (5-10s, opcional)
- Si querés mostrar el badge de estado de API: señalar el **punto verde** en el header
- Si Gemini no responde: mostrar el mensaje de error con el triángulo

### Escena 5 — Cierre (5s)
- Mostrar el código en VSCode rapidamente
- O el repo en GitHub: `github.com/pato6604/rag-chat`

## Recomendaciones técnicas

- **Grabar con OBS Studio** (gratis) en 1920x1080
- Cerrar apps que muestren notificaciones
- Si la cuota de Gemini se agota, esperar 1 minuto o recargar
- Hablar en español argentino, natural, como si se lo explicaras a un colega

## Guión sugerido (para voiceover)

```
"Armé un sistema RAG para chatear con documentos técnicos.
Stack: FastAPI + Next.js 16 + Gemini + Qdrant.

Subo un PDF, el sistema lo chunkeea, lo convierte a embeddings con Gemini,
y lo guarda en Qdrant — una base vectorial en memoria.

Después puedo preguntarle cualquier cosa y responde en vivo,
streaming carácter por carácter, citando las fuentes exactas.

Todo corre gratis con Google AI Studio y está deployeado en Vercel + Railway.
Código abierto en GitHub."
```
