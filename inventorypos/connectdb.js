const mysql = require('mysql');
const MongoClient = require('mongodb').MongoClient;

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pos_db'
});

const mongoURL = 'mongodb://localhost:3000';
const dbName = 'pos_db_mongo';

async function uploadDataToMongo() {
  try {
    const client = await MongoClient.connect(mongoURL, { useNewUrlParser: true });
    const db = client.db(dbName);

    const categories = await mysqlQuery('SELECT * FROM tbl_category');
    const invoices = await mysqlQuery('SELECT * FROM tbl_invoice');
    const invoiceDetails = await mysqlQuery('SELECT * FROM tbl_invoice_details');
    const products = await mysqlQuery('SELECT * FROM tbl_product');
    const users = await mysqlQuery('SELECT * FROM tbl_user');

    const categoryCollection = db.collection('categories');
    const invoiceCollection = db.collection('invoices');
    const invoiceDetailsCollection = db.collection('invoiceDetails');
    const productCollection = db.collection('products');
    const userCollection = db.collection('users');

    await categoryCollection.insertMany(categories);
    await invoiceCollection.insertMany(invoices);
    await invoiceDetailsCollection.insertMany(invoiceDetails);
    await productCollection.insertMany(products);
    await userCollection.insertMany(users);

    client.close();
    mysqlConnection.end(); 

    console.log('Data uploaded to MongoDB successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

function mysqlQuery(query) {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(query, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
}

uploadDataToMongo();
