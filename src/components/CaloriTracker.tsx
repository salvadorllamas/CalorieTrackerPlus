import  { useMemo } from "react";
import { Activity } from "../types";
import { CalorieDisplay } from "./CalorieDisplay";

type CalorieTrackerProps = {
  activitis: Activity[];
};

export const CaloriTracker = ({ activitis }: CalorieTrackerProps) => {
  const caloriesConsumed = useMemo(
    () =>
      activitis.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activitis]
  );
  const caloriesBurned = useMemo(
    () =>
      activitis.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activitis]
  );

  const totalCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activitis]
  );
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorias
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
          calories={caloriesConsumed}
          text={"Consumidas"}
        ></CalorieDisplay>
        <CalorieDisplay
          calories={caloriesBurned}
          text={"Ejercicio"}
        ></CalorieDisplay>
        <CalorieDisplay
          calories={totalCalories}
          text={"Diferencia"}
        ></CalorieDisplay>
      </div>
    </>
  );
};
