const { Router} = require("express")
const Order = require("../model/Order")


const router = Router() 

router.get("/", async (req, res)=>{
  const orders = await Order.find();
  res.status(200).render("cards.ejs", {
    orders
  });
})

router.get("/all", async (req, res)=>{
    const orders = await Order.find().populate("book").populate("visitor")

    res.status(200).json(orders)
})

router.post("/create", async (req, res)=>{
    const order = new Order({
        book: "63a071884dd55fddc77da4a1",
        visitor: "63a06afd4147cae1c21a7922"
    })

    await order.save()
    res.status(200).json(order)
})

module.exports = router
