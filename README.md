# Sportunite

## Use backend Batch Files

create a file in the root directory: `locations.txt`. And add this as content of that file:
```
NEO4J="[Path to Neo4J folder that includes the bin folder]"
MONGO_DB_PATH="[Path to MongoDB folder that includes the bin folder]"
MONGO_DB_DATA="[Path to your database path (for example: "D:\data\db")]"
NET_API="[Path to .NET folder that includes the SportUnite.Api folder]"
NODE_API="[Path to API root folder]"
```

**Don't forget to add double qoutes around the values of the variables**

Then run the batch file itself or use `npm run backend` in the console.
