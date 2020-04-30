const redis = require("redis");

const client = redis.createClient({ detect_buffers: true });