import cors from 'cors'
import express from 'express'
import { ChatController } from "./controllers/chat.controller";
import { config } from "./config";

/**
 * On créé une nouvelle "application" express
 */
const app = express()

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json())

/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
app.use(cors())

// log every access
app.use((req, res, next) => {
  console.log('🔒 ' + req.method + ' ' + req.originalUrl)
  next()
})


/**
 * Toutes les routes CRUD pour les animaux seronts préfixées par `/pets`
 */
app.use('/v1/chat', ChatController)

app.use((req, res) => {
  console.log('🚫 ' + req.method + ' ' + req.originalUrl)
  res.status(404).send('🚫 ' + req.method + ' ' + req.originalUrl + ' not found')
})


/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
app.listen(config.API_PORT, () => console.log('Silence, ça tourne.'))