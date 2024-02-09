import { FaTrash } from "react-icons/fa";
import { Dispatch } from "react";
import { apiStudent } from "../../api";
import { useNavigate } from "react-router-dom";

interface StudentProps {
  item: { id: number; name: string };
  setLoading: Dispatch<React.SetStateAction<boolean>>;
}
export const Item = ({ item, setLoading }: StudentProps) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    await apiStudent.delete(item.id, setLoading);
  };

  return (
    <li className="list__students">
      <span onClick={() => navigate(`/${item.id}`)}>{item.name}</span>
      <FaTrash onClick={handleDelete} className="iconTrash" />
    </li>
  );
};
