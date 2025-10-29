import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { httpAction } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const http = httpRouter();

auth.addHttpRoutes(http);

http.use(async(ctx , req) => {
    return { userId : await getAuthUserId(ctx)}
})

http.route({
    path: "/api/chat",
    method: "POST",
    handler: httpAction(async(ctx, req) => {
        try {
            const userId = await auth.getAuthUserId(ctx)
            
        } catch (error) {
            
        }
    })
})


export default http;
