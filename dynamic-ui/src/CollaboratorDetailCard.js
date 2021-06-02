import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
} from "@material-ui/core";

const stringifyPublication = ({ title, book_title, pages, year }) =>
  `${title}, ${book_title}, ${year}, ${pages || ""}`;

export default function (props) {
  const {
    title,
    url,
    university: { name: uniName, url: uniURL },
    principal_investigator,
    fields_of_sciences,
    abstract,
    sample_publications,
  } = props.collaboratorData;

  return (
    <Card
      style={{
        width: "50%",
        margin: "auto",
      }}
    >
      <CardContent>
        <a href={url}>
          <h2>{title}</h2>
        </a>
        <Divider />
        <dl>
          <dt>
            <h3>University</h3>
          </dt>
          <dd>
            <a href={uniURL}>{uniName}</a>
          </dd>
          {principal_investigator && (
            <>
              <dt>
                <h3>Principal Investigator</h3>
              </dt>
              <dd>
                Name:&nbsp;
                {principal_investigator.first_name
                  ? principal_investigator.first_name.trim() + " "
                  : ""}
                {principal_investigator.middle_name
                  ? principal_investigator.middle_name.trim() + " "
                  : ""}
                {principal_investigator.last_name
                  ? principal_investigator.last_name.trim() + " "
                  : ""}
                {principal_investigator.contact && (
                  <>
                    <br />
                    Contact:&nbsp;
                    <a href={`mailto:${principal_investigator.contact}`}>
                      {principal_investigator.contact}
                    </a>
                  </>
                )}
              </dd>
            </>
          )}
          {fields_of_sciences.length > 0 && (
            <>
              <dt>
                <h3>Fields of science</h3>
              </dt>
              <dd>
                <ul>
                  {fields_of_sciences.map((field_of_science) => (
                    <li key={field_of_science.id}>{field_of_science.name}</li>
                  ))}
                </ul>
              </dd>
            </>
          )}
          {sample_publications.length > 0 && (
            <>
              <dt>
                <h3>Sample publications</h3>
              </dt>
              <dd>
                <ul>
                  {sample_publications.map((samplePublication) => (
                    <li key={samplePublication.id}>
                      {samplePublication.url ? (
                        <a href={samplePublication.url}>
                          {stringifyPublication(samplePublication)}
                        </a>
                      ) : (
                        stringifyPublication(samplePublication)
                      )}
                    </li>
                  ))}
                </ul>
              </dd>
            </>
          )}
          {abstract && (
            <>
              <dt>
                <h3>Abstract</h3>
              </dt>
              <dd>{abstract}</dd>
            </>
          )}
        </dl>
      </CardContent>
      <CardActions>
        <Button color={"primary"} onClick={props.onClose}>
          Close
        </Button>
      </CardActions>
    </Card>
  );
}
