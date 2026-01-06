import express from 'express'
import { config } from 'dotenv'
import carRouter from './routes/cars.route.js'
import CustomerRouter from './routes/customers.route.js'
import orderRouter from './routes/orders.route.js'
import paymentRouter from './routes/payments.route.js'
import smartQueryRouter from './routes/smartQuery.route.js'
config()

let PORT = process.env.PORT || 4545

const app = express()
app.use(express.json())
app.use('/api', carRouter)
app.use('/api', CustomerRouter)
app.use('/api', orderRouter)
app.use('/api', paymentRouter)
app.use('/api', smartQueryRouter)

app.listen(PORT, ()=>console.log(`server is runned on ${PORT}...`))