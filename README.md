# Broadcaad Challenge

**Setup:**

**Hosted server: https://broadcaad.onrender.com**
- Note: The server was hosted on a free service so it will take some time to spin up.

**Local host: Environment variables are included in the link submission via email, They Include:**

***PORT***

***MONGODB_URI***

***CLOUDINARY_CLOUD_NAME***

***CLOUDINARY_API_KEY***

***CLOUDINARY_API_SECRET***


**Start Server:** npm start

**Endpoints:**

1. LOGIN: 
- Method: POST
- Endpoint: /api/auth/login
- Login credentials:
 `{
    "username": "Chimezie",
    "password": "Chimezie@1"
}`

2. UPLOAD MEDIA: 
- Method: POST
- Endpoint: /api/media/upload
- Sample data: `{
    "file": "File as formdata",
    "userId": "userId from login"
}`

3. FETCH MEDIA:
- Method: GET
- Endpoint: /api/media/fetch/:mediaId

4. SAVE HISTORY:
- Method: POST
- Endpoint: /api/history/save
- Sample data: `{
    "userId": "userId from login",
    "timestamp": sample timestamp in seconds, typically received from frontend,
    "mediaId": "mediaId from upload endpoint"
}`

5. GET MEDIA HISTORY:
- Method: GET
- Endpoint: /api/history/get-history/:userId/:mediaId
