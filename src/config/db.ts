import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://chimezie:Chimezie001@cluster0.uit9suq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const MONGODB_URI = process.env.MONGODB_URI

export const client = new MongoClient(uri as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log('MongoDB connected');
  } catch (err) {
    console.error((err as any).message);
    process.exit(1);
  }
}

export default connectDB;
