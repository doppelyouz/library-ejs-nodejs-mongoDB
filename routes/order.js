const { Router} = require("express")
const Order = require("../model/Order")
const Book = require("../model/Book")
const Visitor = require("../model/Visitor")

const router = Router() 

router.get("/", async (req, res)=>{
  const orders = await Order.find().populate("book").populate("visitor");
  const books = await Book.find();
  const visitors = await Visitor.find();

  res.status(200).render("cards.ejs", {
    orders, 
    books, 
    visitors
  });
})

router.get("/all", async (req, res)=>{
    const orders = await Order.find().populate("book").populate("visitor")
    res.status(200).json(orders)
})

router.post("/create", async (req, res)=>{
    const order = new Order({
        book: req.body.book,
        visitor: req.body.visitor
    })

    await order.save()
    res.status(200).json(order)
})

module.exports = router
