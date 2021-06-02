const fs = require("fs");
const util = require("util");
const Axios = require("axios");
const Mustache = require("mustache");

const API_ENDPOINT = "http://localhost:1337"; //strapi endpoint
const SOURCE_DIR = "src";
const BUILD_DIR = "builds";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const copyFile = util.promisify(fs.copyFile);

const main = async () => {
  const [fieldsOfScienceResponse, collaboratorsResponse] = await Promise.all([
    Axios.get(`${API_ENDPOINT}/fields-of-sciences`, { timeout: 5000 }),
    Axios.get(`${API_ENDPOINT}/collaborators`, { timeout: 5000 }),
  ]);

  //build index js
  copyFile(`${SOURCE_DIR}/index.js`, `${BUILD_DIR}/index.js`);

  // build main index html
  const template = await readFile(`${SOURCE_DIR}/index.html`);
  const built = Mustache.render(template.toString(), {
    bars_data: JSON.stringify(
      fieldsOfScienceResponse.data.map((fieldsOfScience) => ({
        name: fieldsOfScience.name,
        collaborations: fieldsOfScience.collaborators.length,
      }))
    ),
  });
  await writeFile(`${BUILD_DIR}/index.html`, built);

  //build page for every field of science
  const fieldOfScienceTemplate = await readFile(
    `${SOURCE_DIR}/field_of_science.mustache`
  );
  for (const { name: fieldName } of fieldsOfScienceResponse.data) {
    const builtFieldPage = Mustache.render(fieldOfScienceTemplate.toString(), {
      field_name: fieldName,
      collaborators: collaboratorsResponse.data.filter(
        (collaborator) =>
          collaborator.fields_of_sciences.filter(
            (fieldOfScience) => fieldOfScience.name === fieldName
          ).length > 0
      ),
    });
    await writeFile(`${BUILD_DIR}/${fieldName}.html`, builtFieldPage);
  }
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
