const mongoose = require('mongoose');

// Define database connection
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schemas
const productCategorySchema = new mongoose.Schema({
  name: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory' },
});

// Define models
const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);
const Product = mongoose.model('Product', productSchema);

// Synchronize models with database
(async () => {
  try {
    await mongoose.connection.db.dropDatabase(); // Drop existing database
    console.log('Database dropped!');
    await Promise.all([ProductCategory.init(), Product.init()]); // Initialize models
    console.log('Database and collections created!');
  } catch (err) {
    console.error('Error creating database and collections:', err);
  } finally {
    mongoose.connection.close(); // Close connection
  }
})();
