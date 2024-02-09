import { Dispatch } from "react";
import { toast } from "react-toastify";

const REACT_APP_BACKEND_SERVER = "http://localhost:8000/api/";

export const apiStudent = {
  getAll: async (setLoading: Dispatch<React.SetStateAction<boolean>>) => {
    try {
      const response = await fetch(REACT_APP_BACKEND_SERVER + "student");
      const json = await response.json();
      if (response.ok) setLoading(false);
      return json.students;
    } catch {
      toast.error("No se pudo listar estudiantes.", { theme: "dark" });
    }
  },
  getById: async (
    id: number,
    setLoading: Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const response = await fetch(REACT_APP_BACKEND_SERVER + `student/${id}`);
      if (response.ok) setLoading(false);
      const json = await response.json();
      return json.student;
    } catch {
      toast.error("Error al obtener estudiante.", { theme: "dark" });
    }
  },
  create: async (
    data: { name: string },
    setLoading: Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const response = await fetch(REACT_APP_BACKEND_SERVER + "student", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) setLoading(true);
      const json = await response.json();
      toast.success("Estuante creado exitosamente.", { theme: "dark" });
      return json;
    } catch {
      toast.error("Error al crear estudiante.", { theme: "dark" });
    }
  },
  createPayment: async (
    data: { amount: number; user_id: number },
    setLoading: Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const response = await fetch(REACT_APP_BACKEND_SERVER + "payment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) setLoading(true);
      const json = await response.json();
      toast.success("Pago generado exitosamente.", { theme: "dark" });
      return json;
    } catch {
      toast.success("Error al realizar pago.", { theme: "dark" });
    }
  },
  delete: async (
    id: number,
    setLoading: Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const response = await fetch(REACT_APP_BACKEND_SERVER + `student/${id}`, {
        method: "DELETE",
      });
      if (response.ok) setLoading(true);
      toast.success("Estudiante eliminado.", { theme: "dark" });
    } catch {
      toast.error("Error al eliminar estudiante", { theme: "dark" });
    }
  },
};
