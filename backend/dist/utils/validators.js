import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const results = await validation.run(req);
            if (!results.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            next();
        }
        else {
            res.status(422).json({ errors: errors.array() });
        }
    };
};
export const loginValidator = [
    body("email").trim().isEmail().notEmpty().withMessage("Email is required."),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .notEmpty()
        .withMessage("Password is required and should be at least 6 characters long."),
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required."),
    body("email").trim().isEmail().notEmpty().withMessage("Email is required."),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .notEmpty()
        .withMessage("Password is required and should be at least 6 characters long."),
];
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required."),
];
//# sourceMappingURL=validators.js.map