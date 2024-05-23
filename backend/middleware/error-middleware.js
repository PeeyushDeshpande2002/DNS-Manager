export const errorMiddleware = (err, req, res, next)=>{
    const status = err.status||500;
    const message = err.message||"Backend Error";
    const errorDetails = err.errorDetails || "Error due to backend problem";

    return res.status(status).json({message, errorDetails});
}