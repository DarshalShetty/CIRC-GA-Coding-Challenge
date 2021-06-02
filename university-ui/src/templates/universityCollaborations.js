import React from "react";
import { graphql } from "gatsby";
import { Box, Heading, Link, Themed } from "theme-ui";

export const query = graphql`
  query UniversityCollaborators($uni_id: Int!) {
    university_collaborators: allStrapiCollaborators(
      filter: { university: { id: { eq: $uni_id } } }
    ) {
      edges {
        node {
          id
          title
          type
          abstract
          university {
            name
            url
          }
          fields_of_sciences {
            name
          }
          principal_investigator {
            first_name
            last_name
          }
          url
        }
      }
    }
    university: strapiUniversities(strapiId: { eq: $uni_id }) {
      name
    }
  }
`;

const UniversityCollaborations = ({ data }) => {
  const collaborators = data.university_collaborators.edges;
  const university_name = data.university.name;

  return (
    <Box p={6}>
      <Heading>Collaborations with {university_name}</Heading>
      <Themed.table>
        <thead>
          <tr>
            <Themed.th>Title</Themed.th>
            <Themed.th>Type</Themed.th>
            <Themed.th>University</Themed.th>
            <Themed.th>Principal Investigator</Themed.th>
            <Themed.th>Abstract</Themed.th>
          </tr>
        </thead>
        <tbody>
          {collaborators.map(({ node: collaborator }) => (
            <tr key={collaborator.id}>
              <Themed.td>
                <Link href={collaborator.uri}>{collaborator.title}</Link>
              </Themed.td>
              <Themed.td>{collaborator.type}</Themed.td>
              <Themed.td>
                <Link href={collaborator.university.url}>
                  {collaborator.university.name}
                </Link>
              </Themed.td>
              <Themed.td>
                {`${collaborator.principal_investigator?.first_name || ""} ${
                  collaborator.principal_investigator?.middle_name || ""
                } ${
                  collaborator.principal_investigator?.last_name || ""
                }`.trim() || "-"}
              </Themed.td>
              <Themed.td>{collaborator.abstract}</Themed.td>
            </tr>
          ))}
        </tbody>
      </Themed.table>
    </Box>
  );
};

export default UniversityCollaborations;
