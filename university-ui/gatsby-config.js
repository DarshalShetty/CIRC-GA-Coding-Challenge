module.exports = {
  siteMetadata: {
    title: "University UI",
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: "http://localhost:1337",
        collectionTypes: ["collaborators", "universities"],
        queryLimit: 1000,
      },
    },
  ],
};
