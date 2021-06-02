exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(
        `
      {
        universities: allStrapiUniversities {
          edges {
            node {
              strapiId
            }
          }
        }
      }
    `
    );

    if (result.errors) {
        throw result.errors;
    }

    // Create blog articles pages.
    const universities = result.data.universities.edges;

    const UniCollabsTemplate = require.resolve("./src/templates/universityCollaborations.js");

    universities.forEach((university, index) => {
        return createPage({
            path: `/university/${university.node.strapiId}`,
            component: UniCollabsTemplate,
            context: {
                uni_id: university.node.strapiId,
            },
        });
    });
};
