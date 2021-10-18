const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 250; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor((Math.random() * 20) + 10);
        const camp = new Campground({
            author: '615e5413f47ddddea005a2ca',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    "url": "https://res.cloudinary.com/xtgjiueq/image/upload/v1633657534/YelpCamp/a05zmknp8kutlxg39f6w.jpg",
                    "filename": "YelpCamp/a05zmknp8kutlxg39f6w"
                },
                {
                    "url": "https://res.cloudinary.com/xtgjiueq/image/upload/v1633657525/YelpCamp/sc1wat0evjnrl8zmmhzb.png",
                    "filename": "YelpCamp/sc1wat0evjnrl8zmmhzb"
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error laboriosam fugiat autem laudantium voluptates incidunt nulla maxime fugit minus repudiandae nihil, culpa deserunt corporis repellat doloribus esse est. Neque, placeat?',
            price
        })
        await camp.save();
    };
}

seedDB().then(() => {
    mongoose.connection.close();
})