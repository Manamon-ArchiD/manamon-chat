import { Router } from 'express'
import pool from '../repository/db.repository'

/**
 * Nous créeons un `Router` Express, il nous permet de créer des routes en dehors du fichier `src/index.ts`
 */
const ChatController = Router()

ChatController.get('/', async (req, res) => {

  try {
    const result = await pool.query("SELECT * FROM chat");
    const users = result.rows;
    return res
      .status(200)
      .json(users)
  } catch (err) {
    next(err);
  }
})

ChatController.get('/message/:user1/:user2', async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const result = await pool.query("SELECT * FROM chat WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) ORDER BY created_at", [user1, user2]);
    const users = result.rows;
    return res
      .status(200)
      .json(users)
  } catch (err) {
    console.log(err)
  }
})

ChatController.post('/message', async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const result = await pool.query("INSERT INTO chat (sender_id, receiver_id, message) VALUES ($1, $2, $3) RETURNING *", [senderId, receiverId, message]);
    const users = result.rows;
    return res
      .status(200)
      .json(users)
  } catch (err) {
    console.log(err)
  }
})

/**
 * Trouve un animal en particulier
 */
ChatController.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    throw new BadRequestException('ID non valide')
  }

  const pet = service.findOne(id)

  if (!pet) {
    throw new NotFoundException('Animal introuvable')
  }

  return res
    .status(200)
    .json(pet)
})

/**
 * Créé un animal
 */
ChatController.post('/', (req, res) => {
  const createdPet = service.create(req.body)

  return res
    .status(201)
    .json(createdPet)
})

/**
 * Mise à jour d'un animal
 */
ChatController.patch('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    throw new BadRequestException('ID invalide')
  }

  const updatedPet = service.update(req.body, id)

  return res
    .status(200)
    .json(updatedPet)
})

/**
 * Suppression d'un animal
 */
ChatController.delete('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    throw new BadRequestException('ID invalide')
  }

  return res
    .status(200)
    .json(service.delete(id))
})

/**
 * On expose notre controller pour l'utiliser dans `src/index.ts`
 */
export { ChatController }