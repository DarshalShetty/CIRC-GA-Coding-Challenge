/** @jsx jsx */
import { jsx, Themed, Link, Box, Heading } from "theme-ui";
import React from "react";
import { StaticQuery, graphql } from "gatsby";

const query = graphql`
  {
    allStrapiUniversities {
      edges {
        node {
          strapiId
          name
          url
          collaborators {
            id
          }
        }
      }
    }
  }
`;

const IndexPage = () => (
  <StaticQuery
    query={query}
    render={(data) => (
      <Box p={6}>
        <Heading>
          These are universities that we are collaborating with:
        </Heading>
        <Themed.table>
          <thead>
            <tr>
              <Themed.th>Name</Themed.th>
              <Themed.th>URL</Themed.th>
              <Themed.th>Number of collaborations</Themed.th>
            </tr>
          </thead>
          <tbody>
            {data.allStrapiUniversities.edges.map((university) => (
              <tr key={university.node.strapiId}>
                <Themed.td>{university.node.name}</Themed.td>
                <Themed.td>
                  <Link href={university.node.url}>{university.node.url}</Link>
                </Themed.td>
                <Themed.td>
                  <Link href={`/university/${university.node.strapiId}`}>
                    {university.node.collaborators.length}
                  </Link>{" "}
                </Themed.td>
              </tr>
            ))}
          </tbody>
        </Themed.table>
      </Box>
    )}
  />
);

export default IndexPage;
