import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { httpAction } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { openai } from "@ai-sdk/openai";

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
    path: "/api/chat",
    method: "POST",
    handler: httpAction(async(ctx, req) => {
        try {
            const userId = await getAuthUserId(ctx);
            if(!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

            const {messages} : {messages: UIMessage[]} = await req.json();

            const lastMessage = messages.slice(-10)

            const stream = await streamText({
                model: openai("gpt-3.5-turbo"),
                system: "You are a helpful assistant that helps users organize their notes.",
                messages: convertToModelMessages(lastMessage),
            })

            return stream.toUIMessageStreamResponse({
                headers: new Headers({
                    "Access-Control-Allow-Origin": "*",
                    Vary: "Origin",
                })
            });
            
            // Return the stream as the HTTP response body so the client can consume it
            // return new Response(stream, {
            //     headers: { "Content-Type": "text/plain; charset=utf-8" },
            // });
        
        } catch (error) {
            console.error("Error in /api/chat:", error);
            return Response.json({ error: "Internal Server Error" }, { status: 500 });
        }
    })
})

http.route({
    path: "/api/chat",
    method: "OPTIONS",
    handler : httpAction(async(_, request) => {
        const headers = request.headers;

        if(
            headers.get("Origin") !== null &&
            headers.get("Access-Control-Request-Method") !== null &&
            headers.get("Access-Control-Request-Headers") !== null
        ) {
            return new Response(null, {
                headers: new Headers({
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Access-Control-Allow-Headers": headers.get("Access-Control-Request-Headers")!,
                    "Access-Control-Max-Age": "86400",
                })
            })
        }
        return new Response(null);
    })
})


export default http;
