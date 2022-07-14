# image-processing-api

### Scripts
- Install: ```npm install```
- Build: ```npm run build```
- Lint: ```npm run lint```
- Prettify: ```npm run prettify```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```

### Usage
The server will listen on port 3000

http://localhost:3000/

#### Endpoint to resize images
http://localhost:3000/api/images

Expected query arguments are:
- _filename_: Available filenames are:
  - encenadaport
  - fjord
  - icelandwaterfall
  - palmtunnel
  - santamonica
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0

#### Example 1
http://localhost:3000/api/images
Will display a hint and list available image names

#### Example 2
http://localhost:3000/api/images?filename=fjord
Will display the original fjord image.

#### Example 3
http://localhost:3000/api/images?filename=fjord&width=200&height=200
Will scale the fjord image to 200 by 200 pixels and store the resulting image.
serve the resized image if requested again

#### Example 4
http://localhost:3000/api/images?filename=fjord&width=-200&height=200
Invalid width parameter 

#### Example 5
http://localhost:3000/api/images?filename=fjord&width=200
Missing height parameter 

### Notes
- Add new images to  `/images/full`. 
- Image thumbs created at  `/images/thumb` 
