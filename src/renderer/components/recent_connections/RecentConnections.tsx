import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Trash } from 'react-bootstrap-icons';
import EditForm from './EditForm';
import { ConnectionModel } from '../../../db/models/ConnectionModels';
import '../../scss/RecentConnections.scss';

const RecentConnections = () => {
  const [connect, setConnect] = useState<ConnectionModel[]>([]);
  const getConnections = async () => {
    const connections = await window.connections.ipcRenderer.fetch();
    setConnect(connections);
  };
  useEffect(() => {
    getConnections();
  }, []);
  const handledelete = async (ConnectionID: number) => {
    await window.connections.ipcRenderer.delete(ConnectionID);
    const connections = await window.connections.ipcRenderer.fetch();
    setConnect(connections);
  };
  const handleSelect = async (ConnectionID: number) => {
    await window.connections.ipcRenderer.select(ConnectionID);
  };
  while (connect.length > 5) {
    connect.shift();
  }
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="recent-wrapper">
        <h1>Recent Connections</h1>
        <div className="d-flex justify-content-center">
          <Table className="table">
            <thead>
              <tr>
                <th>Nick Name</th>
                <th>Database Type</th>
                <th>Address</th>
                <th>Port</th>
                <th>User Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {connect.map((value) => {
                if (value.connectionConfig.config === 'manual') {
                  return (
                    <tr key={value.id}>
                      <td>
                        <Link to="/Execute">
                          <button
                            className="buttonSelect"
                            type="button"
                            onClick={() => handleSelect(value.id)}
                          >
                            {value.nickname}
                          </button>
                        </Link>
                      </td>
                      <td>{value.type}</td>
                      <td>{value.connectionConfig.address}</td>
                      <td>{value.connectionConfig.port}</td>
                      <td>{value.connectionConfig.username}</td>
                      <td>
                        <EditForm config={value} setConnect={getConnections} />
                        <button
                          type="button"
                          className="deleteButton"
                          onClick={() => handledelete(value.id)}
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </Table>
        </div>
        <div className="home-btn-footer">
          <Link to="/" className="link">
            <Button className="home-btn">Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RecentConnections;
