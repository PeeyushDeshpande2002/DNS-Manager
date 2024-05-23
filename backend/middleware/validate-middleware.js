export const validate = (schema) => async(req, res, next)=>{
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        //res.status(400).json({msg: "Validation failed"})
        //console.log(err.errors);
        const status = 422;
        const message = "Fill the form correctly"
        const errorDetails = err.errors[0].message;

        const error = {
            status,
            message,
            errorDetails
        };
        console.log(error);
        next(error);

}}
