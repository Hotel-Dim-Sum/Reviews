# Reviews API 

## CRUD Operations
### CREATE/Post:
**Add review to room**
```
/reviews/:roomId
```
**Path Parameters:**
  * `roomId` room ID
  
**Success status code:** `201`

**Request Body:** Expects JSON with the following keys:
```json
  {
    "roomId": "Number",
    "username": "String",
    "review_date": "Date",
    "review_body": "String",
    "score": "Number",
    "cleanliness_score": "Number",
    "communication_score": "Number",
    "checkin_score": "Number",
    "accuracy_score": "Number",
    "location_score": "Number",
    "value_score": "Number"
  }
```

### READ/Get:
**Get all reviews**
```
/reviews/:roomId
```
**Path Parameters:**
  * `roomId` room ID
  
**Success status code:** `200`

**Returns:** A JSON object for each review the room has
```json
  [
    {
      "id": "Number",
      "roomId": "Number",
      "username": "String",
      "review_date": "Date",
      "review_body": "String",
      "score": "Number",
      "cleanliness_score": "Number",
      "communication_score": "Number",
      "checkin_score": "Number",
      "accuracy_score": "Number",
      "location_score": "Number",
      "value_score": "Number"
    },
    {
      "id": "Number",
      "roomId": "Number",
      "username": "String",
      "review_date": "Date",
      "review_body": "String",
      "score": "Number",
      "cleanliness_score": "Number",
      "communication_score": "Number",
      "checkin_score": "Number",
      "accuracy_score": "Number",
      "location_score": "Number",
      "value_score": "Number"
    },
    ...
  ]
```

### UPDATE/Patch:
**Update review**
```
/reviews/:roomId/:id
```
**Path Parameters:**
  * `roomId` room ID
  * `id` review ID

**Success status code:** `204`

**Request Body:** Expects JSON with any of the following keys (include only keys to be updated):
```json
  {
    "score": "Number", *OPTIONAL*
    "cleanliness_score": "Number", *OPTIONAL*
    "communication_score": "Number", *OPTIONAL*
    "checkin_score": "Number", *OPTIONAL*
    "accuracy_score": "Number", *OPTIONAL*
    "location_score": "Number", *OPTIONAL*
    "value_score": "Number" *OPTIONAL*
  }
```

### DELETE/Delete:
**Delete one review**
```
/reviews/:roomId/:id
```
**Path Parameters:**
  * `roomId` room ID
  * `id` review ID

**Success status code:** `204`


## Related Projects
https://github.com/Hotel-Dim-Sum/Calendar

https://github.com/Hotel-Dim-Sum/PhotoGallery