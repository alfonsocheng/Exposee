import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { User, Video } from './models/index.js';
import { sequelize } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/users.json'), 'utf8'));
const videoData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/video.json'), 'utf8'));

const seedDatabase = async () => {
  try {
    // Sync all models that aren't already in the database
    await sequelize.sync({ alter: true });

    // Then seed the User and Post data
    // Note: if this file is run more than once,
    // it will fail because of duplicate users.
    await User.bulkCreate(userData);
    console.log('User data has been seeded!');

    await Video.bulkCreate(videoData);
    console.log('Post data has been seeded!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();