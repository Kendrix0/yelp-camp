// This should only be run to fill the database w placeholder data.
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.set('strictQuery',true);
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Notify of connection success or failure
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})
// Random sample of provided array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

// Create 250 seed Campgrounds so the site isn't blank
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 250; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor((Math.random() * 20) + 10);
        const camp = new Campground({
            author: '67a445b44c99350399367ae9',
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