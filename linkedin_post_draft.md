
# 📝 Borrador Post LinkedIn — RAG Chat

---

## Opción 1 — Post técnico + demo (recomendado)

**Heading:**
Construí un sistema RAG para chatear con documentos 📄🤖

**Body:**

Hace unos días me propuse armar algo simple pero potente: un chat donde podés subir un PDF y preguntarle cualquier cosa sobre su contenido. No es magia, es RAG (Retrieval-Augmented Generation).

El stack:

🧠 **FastAPI** — backend liviano, endpoints REST + SSE streaming
⚛️ **Next.js 16** — frontend con streaming en vivo, dark theme
🌿 **Gemini 2.5 Flash + gemini-embedding-001** — embeddings + respuestas
🗄️ **Qdrant** — base vectorial para búsqueda semántica

Cómo funciona:
1. Subís un PDF → se chunkeea en fragmentos de 1024 caracteres
2. Gemini genera embeddings de cada fragmento → se guardan en Qdrant
3. Hacés una pregunta → se embeddea, busca los 5 fragmentos más relevantes
4. Gemini responde con el contexto como fuente

Lo que más me gusta del resultado:

→ **Streaming en vivo** — la respuesta aparece carácter por carácter, como ChatGPT
→ **Sources visibles** — cada respuesta muestra qué documento se usó
→ **Manejo de errores** — badge de estado de API, rate limiting, fallback automático
→ **Developer-first aesthetic** — dark mode, acento verde esmeralda, glassmorphism

El proyecto es open source: github.com/pato6604/rag-chat

Próximos pasos: Qdrant cloud (persistencia entre sesiones), hybrid search (vectorial + BM25), autenticación.

¿Qué stack usan ustedes para proyectos de RAG? Los leo 👇

---

## Opción 2 — Post corto + tech stack focus

**Heading:**
RAG Chat con FastAPI + Next.js 16 + Gemini + Qdrant 🚀

**Body:**

Subís un PDF, le preguntás cualquier cosa, y te responde al instante con las fuentes exactas.

Así funciona por dentro:

• El documento se divide en chunks de 1024 caracteres
• Gemini genera embeddings (vectores de 3072 dimensiones)
• Qdrant almacena y busca los fragmentos más relevantes
• Gemini 2.5 Flash responde con ese contexto — en streaming

El frontend (Next.js 16) muestra la respuesta en vivo desde un endpoint SSE, con manejo de errores y badge de estado de API.

Todo corre gratis con Google AI Studio.
Código abierto: github.com/pato6604/rag-chat

---

## Recomendaciones para publicar

- **Día/hora**: martes, miércoles o jueves a las 10-11am (hora Argentina)
- **Media**: subir el video como nativo (no link de YouTube), dura max 1 minuto
- **Comentario fijado**: poner el link a GitHub en el primer comentario
- **Tags sugeridos**: #RAG #FastAPI #NextJS #Gemini #Qdrant #MachineLearning #LLM #OpenSource
- **Etiquetar**: a comunidades como @SomosCodigo, @ArgentinaPrograma, @Midudev si tenés conexión
