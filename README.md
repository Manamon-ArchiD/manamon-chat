# manamon-chat

## API Overview
The API ManaMon Chat allows users to send and retrieve messages between each other.

## Endpoints

### POST /v1/chat/message
Send a message from one user to another.

#### Request Body
- `senderId` (string): ID of the sender (required)
- `receiverId` (string): ID of the receiver (required)
- `message` (string): The content of the message (required)

#### Responses
- `200`: Message sent successfully
- `400`: Invalid input

### GET /v1/chat/message/{user1}/{user2}
Retrieve messages between two users.

#### Path Parameters
- `user1` (string): ID of the first user (required)
- `user2` (string): ID of the second user (required)

#### Responses
- `200`: List of messages between the two users
- `400`: Invalid input
- `404`: No messages found

## Request and Response Formats

### POST /v1/chat/message

#### Request
```json
{
  "senderId": "user1",
  "receiverId": "user2",
  "message": "Hello, how are you?"
}
```

#### Response
```json
{
  "status": "Message sent successfully"
}
```

### GET /v1/chat/message/{user1}/{user2}

#### Response
```json
[
  {
    "id": "12"
    "senderId": "user1",
    "receiverId": "user2",
    "message": "Hello, how are you?",
    "created_at": "2023-01-01T12:00:00Z"
  },
  {
    "id": "13"
    "senderId": "user2",
    "receiverId": "user1",
    "message": "I'm good, thanks!",
    "created_at": "2023-01-01T12:01:00Z"
  }
]
```

## Usage Examples

### Sending a Message
```bash
curl -X POST "http://api.example.com/v1/chat/message" -H "Content-Type: application/json" -d '{
  "senderId": "user1",
  "receiverId": "user2",
  "message": "Hello, how are you?"
}'
```

### Retrieving Messages
```bash
curl -X GET "http://api.example.com/v1/chat/message/user1/user2"
```
