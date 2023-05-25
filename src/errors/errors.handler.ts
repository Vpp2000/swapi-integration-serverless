import { ZodError } from "zod";
import { HEADERS } from "../helpers/constants";
import { HttpError } from "./http_error";
import { ErrorMessageOptions, generateErrorMessage } from "zod-error";

export class ErrorsHandler {
    public static handleError = (e: Error) => {
        if (e instanceof ZodError) {
            const options: ErrorMessageOptions = {
                delimiter: {
                    error: ' ||| ',
                },
                transform: ({ errorMessage, index }) => `Error #${index + 1}: ${errorMessage}`,
            };

            return {
                statusCode: 400,
                HEADERS,
                body: JSON.stringify({
                    message: "Schema error",
                    detail: generateErrorMessage(e.errors, options)
                }),
            };
        }

        else if (e instanceof HttpError) {
            console.log(e.getErrorMessage());

            return {
                statusCode: 400,
                HEADERS,
                body: JSON.stringify({
                    message: "Something went wrong",
                    detail: e.message }),
            };
        }

        else {
            return {
                statusCode: 400,
                HEADERS,
                body: JSON.stringify({
                    message: "Something went wrong",
                    detail: `Error pending to be analyzed: ${e.message}`
                }),
            }
        }
    };
}
