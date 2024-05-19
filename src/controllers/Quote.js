import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const registerQuote = async (req, res)=>{
    const {quote,author,description} = req.body

    const newQuote = await prisma.quote.create({
        data :{
            quote,author,description
        }

    })
    console.log(newQuote);
}