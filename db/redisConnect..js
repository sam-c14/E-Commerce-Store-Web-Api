const { createClient } = require("redis");

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-15352.c8.us-east-1-2.ec2.cloud.redislabs.com",
    port: process.env.REDIS_PORT,
  },
});
const redisConnect = async () => {
  //This function will be removed later in the tutorial
  try {
    await redisClient.connect(); //Connecting to Redis Cloud
    console.log("Connected to the Redis DB");
  } catch (error) {
    if (
      //Running the function again when there is a network error
      error.message ===
        "getaddrinfo ENOTFOUND redis-12345.c80.us-east-1-2.ec2.cloud.redislabs.com:12345" ||
      error.message ===
        "getaddrinfo EAI_AGAIN redis-12345.c80.us-east-1-2.ec2.cloud.redislabs.com"
    ) {
      return redisConnect();
    }
    // console.log(error);
    console.log(error.message);
  }
};

module.exports = { redisConnect, redisClient };
