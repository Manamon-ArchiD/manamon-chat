# manamon-chat

## Présentation de l'API
L'API ManaMon Chat permet aux utilisateurs d'envoyer et de récupérer des messages entre eux.

## Points de terminaison

### POST /v1/chat/message
Envoyer un message d'un utilisateur à un autre.

#### Corps de la requête
- `senderId` (string): ID de l'expéditeur (requis)
- `receiverId` (string): ID du destinataire (requis)
- `message` (string): Le contenu du message (requis)

#### Réponses
- `200`: Message envoyé avec succès
- `400`: Entrée invalide

### GET /v1/chat/message/{user1}/{user2}
Récupérer les messages entre deux utilisateurs.

#### Paramètres de chemin
- `user1` (string): ID du premier utilisateur (requis)
- `user2` (string): ID du deuxième utilisateur (requis)

#### Réponses
- `200`: Liste des messages entre les deux utilisateurs
- `400`: Entrée invalide
- `404`: Aucun message trouvé

## Formats de requête et de réponse

### POST /v1/chat/message

#### Requête
```json
{
  "senderId": "user1",
  "receiverId": "user2",
  "message": "Bonjour, comment ça va?"
}
```

#### Réponse
```json
{
  "status": "Message envoyé avec succès"
}
```

### GET /v1/chat/message/{user1}/{user2}

#### Réponse
```json
[
  {
    "id": "12",
    "senderId": "user1",
    "receiverId": "user2",
    "message": "Bonjour, comment ça va?",
    "created_at": "2023-01-01T12:00:00Z"
  },
  {
    "id": "13",
    "senderId": "user2",
    "receiverId": "user1",
    "message": "Je vais bien, merci!",
    "created_at": "2023-01-01T12:01:00Z"
  }
]
```

## Exemples d'utilisation

### Envoyer un message
```bash
curl -X POST "http://api.example.com/v1/chat/message" -H "Content-Type: application/json" -d '{
  "senderId": "user1",
  "receiverId": "user2",
  "message": "Bonjour, comment ça va?"
}'
```

### Récupérer les messages
```bash
curl -X GET "http://api.example.com/v1/chat/message/user1/user2"
```
