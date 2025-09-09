import { Router } from 'express'
import { pool } from '../db.js'


const router = Router()


router.get('/', async (req,res)=>{
const [rows] = await pool.query('SELECT * FROM scores ORDER BY points DESC LIMIT 10')
res.json(rows)
})


router.post('/', async (req,res)=>{
const {name, points} = req.body
await pool.query('INSERT INTO scores (name, points) VALUES (?,?)',[name, points])
res.json({ok:true})
})


export default router