// index.js
const express = require("express");
var router = express.Router();
const neo4j = require("neo4j-driver");
const app = express();

const driver = neo4j.driver(
  "neo4j://localhost:7687",
  neo4j.auth.basic("neo4j", "stevhanus123")
);

async function init() {
  router.get("/get", async (req, res) => {
    const session = driver.session();
    const result = await session.run(
      `
        MATCH path = shortestPath(
            (First:Person {name: $person1 })-[*]-(Second:Person {name: $person2 })
        )
        UNWIND nodes(path) as node
        RETURN coalesce(node.name, node.title) as text;
    `,
      {
        person1: "Niken.",
        person2: "luv",
      }
    );
    // console.log(result);
    // console.log("haii");
    res.json({
      status: "ok",
      path: result.records.map((record) => record.get("text")),
    });

    res.render("users");
    await session.close();
  });

  app.use(express.static("./static"));
  app.listen(process.env.PORT || 3000);
}
init();
module.exports = router;
