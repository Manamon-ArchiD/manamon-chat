import { beforeAll, expect, test, vi } from 'vitest'
import app from '../index';
import request from 'supertest';

const messagesBase = [
  {
    "id": 11,
    "senderId": "lucie",
    "receiverId": "eloi",
    "message": "slt cv",
  },
  {
    "id": 12,
    "senderId": "eloi",
    "receiverId": "lucie",
    "message": "ouais",
  },
] as const;

const messages = []

vi.mock('../repository/db.repository.ts', () => ({
  default: {
    query: vi.fn().mockImplementation((...args) => {
      if (args[0] === "INSERT INTO chat (sender_id, receiver_id, message) VALUES ($1, $2, $3) RETURNING *") {
        messages.push({
          id: messages.length + 1,
          sender_id: args[1][0],
          receiver_id: args[1][1],
          message: args[1][2],
          created_at: new Date().toISOString()
        })

        return {
          rows: messages
        }
      }
      return {
        rows: messages
      }
    })
  },
}));

beforeAll(async () => {
  await request(app).post("/v1/chat/message").send(messagesBase[0]);
  await request(app).post("/v1/chat/message").send(messagesBase[1]);
})

test('check if messages exists', async () => {
  const res = await request(app).get("/v1/chat/message/eloi/lucie");
  expect(res.body.length).toBe(2);
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0].sender_id).toBe("lucie");
  expect(res.body[0].receiver_id).toBe("eloi");
  expect(res.body.length).toBe(2);
})

test('send message and check if it\'s recorded', async () => {
  await request(app).post("/v1/chat/message").send({
    senderId: "lucie",
    receiverId: "eloi",
    message: "slt cv"
  });

  const res = await request(app).get("/v1/chat/message/eloi/lucie");
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(3);
})