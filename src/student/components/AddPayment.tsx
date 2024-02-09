import { Dispatch, useState } from "react";
import Modal from "react-modal";
import { apiStudent } from "../../api";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#000",
    borderRadius: "10px",
  },
};

export const AddPayment = ({
  id,
  setLoading,
}: {
  id: number;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const closeModaL = () => {
    setOpenModal(false);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { elements } = e.currentTarget;
    const payment = elements.namedItem("payment");
    const isValid = payment instanceof HTMLInputElement;
    if (!isValid || payment == null) return;

    await apiStudent.createPayment(
      {
        amount: Number(payment.value),
        user_id: id,
      },
      setLoading
    );
    payment.value = "";
    setOpenModal(false);
  };
  return (
    <div>
      <button onClick={() => setOpenModal(true)}>Generar Pago</button>
      <Modal
        style={customStyles}
        isOpen={openModal}
        onRequestClose={closeModaL}
        contentLabel="Example Modal"
      >
        <h2>Generar Pago</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Monto:
            <input type="number" name="payment" min="1" />
          </label>
          <button onClick={closeModaL}>close</button>
          <button type="submit">Add payment</button>
        </form>
      </Modal>
    </div>
  );
};
