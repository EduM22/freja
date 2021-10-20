import { listenAndServe } from "https://deno.land/std@0.112.0/http/mod.ts";

// Create a pattern that matches paths starting with /books/, followed by an integer.
const pattern = new URLPattern({ pathname: "/books/:id(\\d+)" });

function handler(req: Request): Response {
    const url = req.url;

    const match = pattern.exec(url);
    if (match) {
        console.log(match.pathname);
        const bookId = match.pathname.groups.id;
        return new Response(`Book: ${bookId}`)
    }

    return new Response("Not Found\nTry /books/123", { status: 404 });
}

await listenAndServe(":8080", handler);
