import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiStudent } from "../../api";
import { AddPayment } from "../components/AddPayment";
import { Page404 } from "../../pages/Page404";

interface StudentProps {
  id_user: number;
  name: string;
  payments: { amount: number; payment_id: number }[];
}
export const ShowStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState<StudentProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      if (!Number(id)) return;
      const response = await apiStudent.getById(Number(id), setLoading);
      setStudent(response);
    })();
  }, [loading]);
  if (!student) return <Page404 />;
  return (
    <>
      <span onClick={() => navigate("/")} className="button__back">
        Volver a la pagina principal
      </span>
      <div className="card">
        <div className="card__header">
          {student?.id_user} {"  "} {student?.name}{" "}
        </div>
        <AddPayment id={Number(id)} setLoading={setLoading} />
        <h2>PAGOS</h2>
        <div className="card__content">
          {student?.payments.length > 0 ? (
            <ul>
              {student?.payments.map((elem, index) => (
                <li className="list__payments" key={elem.payment_id}>
                  <span className="card__content--text"> {index + 1}. </span>
                  {elem.amount}
                </li>
              ))}
            </ul>
          ) : (
            <span>No existen pagos</span>
          )}
        </div>
      </div>
    </>
  );
};
