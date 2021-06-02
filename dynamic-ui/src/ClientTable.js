import { DataGrid } from "@material-ui/data-grid";
import { Button, Modal } from "@material-ui/core";
import Axios from "axios";
import { useEffect, useState } from "react";
import CollaboratorDetailCard from "./CollaboratorDetailCard";

const API_ENDPOINT = "http://localhost:1337"; //strapi endpoint
const buildName = ({ first_name, last_name }) =>
  `${first_name?.trim() || ""} ${(last_name?.trim() || " ")[0]}`;
const formatRow = (collaborator) => ({
  title: collaborator.title,
  principal_investigator:
    buildName(collaborator.principal_investigator || {}).trim() || "-",
  university: collaborator.university.name,
  fields_of_science: collaborator.fields_of_sciences
    .map((field_of_science) => field_of_science.name)
    .join(", "),
  id: collaborator.id,
});

export default function (props) {
  const [collaborators, setCollaborators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const collabType = props.collabType;
  useEffect(() => {
    Axios.get(`${API_ENDPOINT}/collaborators?type=${collabType}`)
      .then((response) => {
        setCollaborators(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setError(`Error: ${error.response.status}`);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          setError(`Error: No response`);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          setError(`Error: ${error.message}`);
        }
        console.log(error.config);
      });
  }, [collabType]);

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "details",
      headerName: "Details",
      flex: 1,
      renderCell: (params) => (
        <Button
          color={"primary"}
          onClick={() => {
            setModalData(
              collaborators.filter(
                (collaborator) => collaborator.id === params.id
              )[0]
            );
            setIsModalOpen(true);
          }}
        >
          Details
        </Button>
      ),
    },
    {
      field: "principal_investigator",
      headerName: "Principal Investigator",
      flex: 1,
    },
    { field: "university", headerName: "University", flex: 1 },
    { field: "fields_of_science", headerName: "Fields of Science", flex: 1 },
  ];

  return (
    error || (
      <div
        style={{
          width: "100%",
          height: "70vh",
        }}
      >
        <DataGrid
          columns={columns}
          rows={collaborators.map(formatRow)}
          loading={isLoading}
        />
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div>
            <CollaboratorDetailCard
              collaboratorData={modalData}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </Modal>
      </div>
    )
  );
}
