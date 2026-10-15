// Proxy al backend de prótesis. El back (Render) solo acepta CORS desde
// localhost:3000, así que desde el dominio de producción el navegador no puede
// llamarlo directo. Desde el servidor de Next no hay CORS: reenviamos acá.

const API_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://bbm-server-hfq1.onrender.com"
).replace(/\/+$/, "");

// Cold start de Render (~1 min) + generación en Blender
export const maxDuration = 300;

// Solo dejamos pasar los endpoints que usa el front
const ALLOWED = /^(health|prosthesis\/(socket\/parameters|requests(\/[0-9a-f-]+\/generate)?|generated\/[^/]+))$/i;

async function forward(request: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const joined = path.map(encodeURIComponent).join("/");
  if (!ALLOWED.test(path.join("/"))) {
    return Response.json({ detail: "Not Found" }, { status: 404 });
  }

  const search = new URL(request.url).search;
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  try {
    const upstream = await fetch(`${API_URL}/${joined}${search}`, {
      method: request.method,
      headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer(),
      cache: "no-store",
    });

    const out = new Headers();
    for (const h of ["content-type", "content-disposition"]) {
      const v = upstream.headers.get(h);
      if (v) out.set(h, v);
    }
    return new Response(upstream.body, { status: upstream.status, headers: out });
  } catch (err) {
    return Response.json(
      { detail: `No se pudo contactar al servidor de prótesis (${err instanceof Error ? err.message : "error"})` },
      { status: 502 }
    );
  }
}

export const GET = forward;
export const POST = forward;
