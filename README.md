# Reviews API 

## CRUD Operations
### CREATE/Post:
**Add review to room**
```
/reviews/:roomId
```
**Success status code:** `201`

**Request Body:** Expects JSON with the following keys:
```json
  {
    "roomId": "Number",
    "username": "String",
    "image": "String",
    "date": "Date",
    "text": "String",
    "scores": {
      "cleanliness": "Number",
      "communication": "Number",
      "check_in": "Number",
      "accuracy": "Number",
      "location": "Number",
      "value": "Number"
    }
  }
```

### READ/Get:
**Get all reviews**
```
/reviews/:roomId
```
**Success status code:** `200`

**Returns:** A JSON object for each review the room has
```json
  {
    "roomId": "Number",
    "username": "String",
    "image": "String",
    "date": "Date",
    "text": "String",
    "scores": {
      "cleanliness": "Number",
      "communication": "Number",
      "check_in": "Number",
      "accuracy": "Number",
      "location": "Number",
      "value": "Number"
    }
  }
```

### UPDATE/Put:
**Update review**
```
/reviews/:roomId
```
**Success status code:** `204`

**Request Body:** Expects JSON with all of the following keys:
```json
  {
    "roomId": "Number",
    "username": "String",
    "image": "String",
    "date": "Date",
    "text": "String",
    "scores": {
      "cleanliness": "Number",
      "communication": "Number",
      "check_in": "Number",
      "accuracy": "Number",
      "location": "Number",
      "value": "Number"
    }
  }
```

### DELETE/Delete:
**Delete all reviews for room**
```
/reviews/:roomId
```
**Success status code:** `204`


## Related Projects
https://github.com/Hotel-Dim-Sum/Calendar

https://github.com/Hotel-Dim-Sum/PhotoGallery