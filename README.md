# Image-Prcoessing-API
An image proccessin API that takes an image, resizes it to user specifications , and saves it for later use.
## Getting Started
 The project requires dependencies such as:

* Express
* Typescript
* Jasmine
* Prettier
* ESlint
* Sharp
* Nodemon

## Installation
To use the API on your machine:

* Clone the repo
```js
git clone https://github.com/youssefhany96/image-prcoessing-api.git
```
* Install the dependencies on your computer
```js
npm install
```
* To run the project for development
 ```js
npm run start
```
* To format the code using prettier
 ```js
npm run format
```
* To lint the code using ESlint
 ```js
npm run lint
```
* To test and build the code for production
 ```js
npm run test
```

## Using the API

In order to resize an image,enter the foolowing url:
 ```js
api?width=$desiredWidth&height=$desiredHeight&filename=$filename
```
* where $desiredWidth is the width you would like to in pixels such as 300
* where $desiredHeight is the height you would like to in pixels such as 300
* where $filename is the image you want to resize from the Images directory such as book.jpg


