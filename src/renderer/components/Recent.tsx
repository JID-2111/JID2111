import { useEffect, useState } from 'react';
import { ConnectionModel } from 'db/Models';
import { List } from 'react-bootstrap-icons';

const RecentList = () => {
  const [recent, setRecent] = useState<ConnectionModel[]>();

  useEffect(() => {
    const fetchRecent = async () => {
      const newRecent = await window.connections.ipcRenderer.fetch();
      setRecent(newRecent);
    };
    fetchRecent();
  }, []);

  return (
    <div className="recent-list">
      {recent?.map((connection: ConnectionModel) => (
        <div className="recent-item">
          <>{connection.nickname}</>
          <List className="edit-icon" />
        </div>
      ))}
    </div>
  );
};

export default RecentList;
