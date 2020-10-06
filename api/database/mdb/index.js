const log = require("utils/logger");
const mongoClient = require("mongodb").MongoClient;

const conexionMongo = "mongodb://admin:password@mongodb";

//FUNCION DE ACTUALIZAR JSON
exports.UPDATE_ONE = async (query, data, name_collection) => {
  try {
    const client = await mongoClient.connect(conexionMongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = client.db(process.env.MDB_NAME);
    const collection = db.collection(name_collection);
    const { result } = await collection.updateOne(query, {
      $set: {
        ...data,
        _updated: new Date()
      }
    });
    await client.close();
    return result;
  } catch (error) {
    console.log("error");
    console.log(error);
  }
};

exports.INSERT_ONE = async (data, name_collection) => {
  try {
    // log.info("INSERT_MDB");
    const client = await mongoClient.connect(conexionMongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = client.db(process.env.MDB_NAME);
    const collection = db.collection(name_collection);
    const { result } = await collection.insertOne({
      ...data,
    });
    await client.close();
    return result;
  } catch (error) {
    return false
  }
};

exports.GET_ONE = async (query, name_collection) => {
  try {
    const client = await mongoClient.connect(conexionMongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(query);
    const db = client.db(process.env.MDB_NAME);
    const collection = db.collection(name_collection);
    const result = await collection.findOne(query);
    const output = { codRes: result ? "00" : "01", ...result };
    log.info("success-MDB", output);
    await client.close();
    return output;
  } catch (error) {
    console.log("error");
    console.log(error);
  }
};

exports.GET_ALL = async (query, name_collection) => {
  try {
    const client = await mongoClient.connect(conexionMongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("query ", query);
    const db = client.db(process.env.MDB_NAME);
    const collection = db.collection(name_collection);
    const result = await collection.find(query).toArray();
    await client.close();
    return { codRes: result ? "00" : "01", result };
  } catch (error) {
    console.log("error");
    console.log(error);
  }
};


exports.INSERT_ONE_DATABASE = async (data, name_collection, dataBase) => {
  try {
    log.info("INSERT_ONE");
    const client = await mongoClient.connect(conexionMongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = client.db(dataBase);
    const collection = db.collection(name_collection);
    const  {result,insertedId}  = await collection.insertOne({
      ...data,
      _insert: new Date()
    });
    await client.close();
    return insertedId;
  } catch (error) {
    console.log("her");
    console.log(error);
    return false
  }
};


exports.GET_LATEST_TIME = async (imei, name_collection) => {
  try {
    const client = await mongoClient.connect(conexionMongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = client.db(process.env.MDB_NAME);
    const collection = db.collection(name_collection);
    const  result  = await collection.find({
      imei: imei
    })
    .sort({
      fechaGps : -1
    }).limit(1).toArray();

    // console.log(result[0]);
    await client.close();
    return result[0];
  } catch (error) {
    console.log("her");
    console.log(error);
    return false
  }
};



exports.getNextSequence = async (name, contador_collection) => {
  try {
    const client = await mongoClient.connect(conexionMongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = client.db(process.env.MDB_NAME);
    const collection = db.collection(contador_collection);

    const ret = await collection.findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } }
    );
    // console.log("retornar_:", ret.value.seq);
    await client.close();
    return ret.value.seq;
  } catch (error) {
    console.log("her");
    console.log(error);
  }

};



