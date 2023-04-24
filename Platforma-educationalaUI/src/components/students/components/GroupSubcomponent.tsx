import { useNavigate } from "react-router-dom";
import { useEffect, ChangeEventHandler } from "react";
import { getAll } from "../../../services/groupAPI";
import config from "../../../config";
import Group from "../../../models/group/Group";

interface GroupInterface {
  groups: Group[];
  setGroups: Function;
  setSelectedGroupId: Function;
}
function GroupSubcomponent({ groups, setGroups, setSelectedGroupId }: GroupInterface) {
  const navigator = useNavigate();
  const url = `${config.baseApiUrl}/Groups`;

  useEffect(() => {
    onInit();
  }, []);

  const onInit = async () => {
    const response = await getAll(url, true);
    if (response?.responseStatus == 200) {
      setGroups(response.groups);
    } else {
      navigator("/Error");
    }
  };

  const handleChangeGroup: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newIdGroup = e.target.value;
    if (newIdGroup.length < 1) {
    }
    setSelectedGroupId(newIdGroup);
  };

  return (
    <div className="p-6 space-y-6">
      <select defaultValue={"default"} onChange={handleChangeGroup}>
        <option value="default" disabled>
          Selecteaza o grupa
        </option>
        {groups.map((group) => {
          return (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default GroupSubcomponent;
