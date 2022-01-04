const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  serverConfig.service.neo4j.url,
  neo4j.auth.basic(
    serverConfig.service.neo4j.username,
    serverConfig.service.neo4j.password
  )
);
module.exports = {
  read: (
    cypher,
    params = {},
    database = serverConfig.service.neo4j.database
  ) => {
    const session = driver.session({
      defaultAccessMode: neo4j.session.READ,
      database,
    });

    return session
      .run(cypher, params)
      .then((res) => {
        session.close();
        return res;
      })
      .catch((e) => {
        session.close();
        throw e;
      });
  },
  write: (
    cypher,
    params = {},
    database = serverConfig.service.neo4j.database
  ) => {
    const session = driver.session({
      defaultAccessMode: neo4j.session.WRITE,
      database,
    });

    return session
      .run(cypher, params)
      .then((res) => {
        session.close();
        return res;
      })
      .catch((e) => {
        session.close();
        throw e;
      });
  },
};
