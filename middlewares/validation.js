import { body } from "express-validator";

const validation=[
    body('bookname')
        .trim()
        .notEmpty()
        .withMessage("Please Enter Book Name"),
    body('author')
        .trim()
        .notEmpty()
        .withMessage("Please Enter Author Name"),
    body('price')
        .trim()
        .notEmpty()
        .withMessage("Please Enter Price"),
    body('pages')
        .trim()
        .notEmpty()
        .withMessage("Please Enter pages"),
]

export default validation;
