import { useEffect, useState } from "react";
import { Item } from "../student/components/Item";
import { ItemProps } from "../student/student.types";
import { apiStudent } from "../api";
import { useSEO } from "../hooks/useSEO";

export type ItemId = number;
export interface Item {
  id: ItemId;
  text: string;
}

export const Student = () => {
  const [students, setStudents] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { elements } = e.currentTarget;
    const student = elements.namedItem("student");
    const isValid = student instanceof HTMLInputElement;
    if (!isValid || student == null) return;

    await apiStudent.create({ name: student.value }, setLoading);
    student.value = "";
  };

  useEffect(() => {
    (async () => {
      const students = await apiStudent.getAll(setLoading);
      setStudents(students);
    })();
  }, [loading]);

  useSEO({
    title: `[${students.length}] Prueba tecnica`,
    description: "Añadir y eliminar estudiantes de la lista",
  });

  return (
    <>
      <aside>
        <h1>Prueba tecnica </h1>
        <h2>Añadir y eliminar estudiantes </h2>
        <form
          onSubmit={handleSubmit}
          aria-label="Añadir elementos en una lista."
        >
          <label>
            Registrar Estudiante:
            <input
              name="student"
              required
              type="text"
              placeholder="Estudiante"
            />
          </label>
          <button>Añadir estudiante a la lista </button>
        </form>
      </aside>
      <section>
        <h2>Lista de estudiantes</h2>
        {loading ? (
          <span>...cargando</span>
        ) : (
          students.map((elem) => (
            <Item key={elem.id} item={elem} setLoading={setLoading} />
          ))
        )}
      </section>
    </>
  );
};
