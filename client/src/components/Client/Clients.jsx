import Spinner from "../Spinner";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../graphql/queries/clientsQueries";
import ClientRow from "./ClientRow";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  // console.log("GraphQL request made:", { loading, error, data });

  if (loading) return <Spinner />;

  if (error)
    return (
      <p style={{ color: "red" }}>Something went wrong: {error.message}</p>
    );

  return (
    <>
      <div>
        {!loading &&
          !error &&
          data &&
          data.clients &&
          data.clients.length > 0 && (
            <table className="table table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.clients.map((client, index) => (
                  <ClientRow key={client.id} client={client} index={index} />
                ))}
              </tbody>
            </table>
          )}
      </div>
    </>
  );
};

export default Clients;
