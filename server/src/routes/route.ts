import Router  from "express";

const router = Router()

router.get("/", (req,res)=>{
    res.send("Chat server is running");
})

export default router