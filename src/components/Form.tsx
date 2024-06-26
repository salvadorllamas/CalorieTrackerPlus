import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export const Form = ({ dispatch, state }: FormProps) => {
  const [activity, setActivity] = useState<Activity>({
    ...initialState,
    id: uuidv4(),
  });

  useEffect(() => {
    if (state.activeId) {
      let selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];

      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    let { id, value } = target;
    const isNumberField = ["category", "calories"].includes(id);

    setActivity((prevActivity) => ({
      ...prevActivity,
      [id]: isNumberField ? +value : value,
    }));
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({
      type: "save-activity",
      payload: { newActivity: { ...activity, id: uuidv4() } },
    });
    setActivity({ ...initialState, id: uuidv4() });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoria:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad
        </label>
        <input
          type="text"
          id="name"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej.Comida, Jugo de Naranja, Ensalada, Ejercicio, pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          type="text"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="calorias. ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={`Guardar ${activity.category == 1 ? "COMIDA" : "EJERCICIO"}`}
        disabled={!isValidActivity()}
      />
    </form>
  );
};
