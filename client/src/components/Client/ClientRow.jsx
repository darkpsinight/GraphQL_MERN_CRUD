import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../../graphql/mutations/client/deleteClient";
import { GET_CLIENTS } from "../../graphql/queries/clientsQueries";
import { GET_PROJECTS } from "../../graphql/queries/projectsQueries";

const ClientRow = ({ client, index }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }], // For simpler code
    // OR more control over cache updates
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });

  return (
    <tr>
      <td>{index}</td>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="bt btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

ClientRow.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
export default ClientRow;
