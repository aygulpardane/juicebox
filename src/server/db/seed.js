// This file will populate the database
// A seed file is written to seed the database with at least 3 users and 3 posts per user.

const db = require("../db");

async function seed() {
    console.log("Seeding the database");
    try {
        // add 3 users with 3 posts each
        await db.user.create({
            data: {
                username: 'albert',
                password: 'bertie99',
                name: 'Al Bert',
                location: 'Sidney, Australia',
                post: {
                    create: {
                        authorId: albert.id,
                        title: "First Post",
                        content: "This is my first post. I hope I love writing blogs as much as I love writing them.",
                        tags: ["#happy", "#youcandoanything"]
                    }
                }
            }
        })

        await db.user.create({
            data: {
                username: 'sandra',
                password: '2sandy4me',
                name: 'Just Sandra',
                location: 'Ain\'t tellin\'',
                post: {
                    create: {
                        authorId: sandra.id,
                        title: "How does this work?",
                        content: "Seriously, does this even do anything?",
                        tags: ["#happy", "#worst-day-ever"]
                    }
                }
            }
        })

        await db.user.create({
            data: {
                username: 'glamgal',
                password: 'soglam',
                name: 'Joshua',
                location: 'Upper East Side',
                post: {
                    create: {
                        authorId: glamgal.id,
                        title: "Living the Glam Life",
                        content: "Do you even? I swear that half of you are posing.",
                        tags: ["#happy", "#youcandoanything", "#canmandoeverything"]
                    }
                }
            }
        })

    } catch (error) {
        console.error(error);
    }
};

module.exports = seed;
