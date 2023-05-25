import { ZodError } from "zod";
import { HEADERS } from "../helpers/constants";

export class ErrorsHandler {
    public static handleError = (e: Error) => {
        if (e instanceof ZodError) {
            return {
                statusCode: 400,
                HEADERS,
                body: JSON.stringify({
                    errors: e.errors,
                }),
            };
        }

        else if (e instanceof SyntaxError) {
            return {
                statusCode: 400,
                HEADERS,
                body: JSON.stringify({ error: `invalid request body format : "${e.message}"` }),
            };
        }

        else {
            return {
                statusCode: 400,
                HEADERS,
                body: JSON.stringify({ error: `Error pending to be analyzed: ${e.message}` }),
            }
        }
    };
}
