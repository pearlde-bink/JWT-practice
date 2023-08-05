module.exports = {
    HOST: "localhost",
    USER: "root",
    // PASSWORD: "123456789",
    DB: "authen",
    dialect: "mysql",
    pool: {
        max: 5, //max number of connection in pool
        min: 0, //min number of connection in pool
        acquire: 30000, //max time, miliseconds, that pool try to get connection before throwing error
        idle: 10000 //max time, miliseconds, that a connection can be idle before being released
    },
};
