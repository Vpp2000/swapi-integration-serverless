import { ZodError } from "zod";
import { HEADERS } from "../helpers/constants";
import { HttpError } from "./http_error";
import { ErrorMessageOptions, generateErrorMessage } from "zod-error";
import { HttpStatusCode } from "axios";

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
                statusCode: HttpStatusCode.BadRequest,
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
                statusCode: e.statusCode,
                HEADERS,
                body: JSON.stringify({
                    message: "Something went wrong",
                    detail: e.message }),
            };
        }

        else {
            return {
                statusCode: 500,
                HEADERS,
                body: JSON.stringify({
                    message: "Something went wrong",
                    detail: `Error pending to be analyzed: ${e.message}`
                }),
            }
        }
    };
}
