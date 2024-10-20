import { FormData } from "../types";
import { isValidDate, isValidDistance } from "./validation";
import { useState } from "react";
import classes from "./Form.module.css";

type FormProps = {
  formData: FormData;
  setFormData: (formData: FormData) => void;
  onFormSubmit: (formData: FormData, editingIndex: number | null) => void;
};

export const Form: React.FC<FormProps> = ({
  formData,
  setFormData,
  onFormSubmit,
}) => {
  const [error, setError] = useState<string>("");
  const [dateError, setDateError] = useState<boolean>(false);
  const [distanceError, setDistanceError] = useState<boolean>(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "distance" && !isValidDistance(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let isValid: boolean = true;

    if (!isValidDate(formData.date)) {
      setDateError(true);
      isValid = false;
      setError("Дата должна быть в формате ДД.ММ.ГГГГ");
    } else {
      setDateError(false);
    }

    if (formData.distance.trim() === "") {
      setDistanceError(true);
      isValid = false;
      setError("Введите расстояние");
    } else {
      setDistanceError(false);
    }

    if (isValid) {
      onFormSubmit(formData, editingIndex);
      setEditingIndex(null);
      setFormData({
        date: "",
        distance: "",
      });
    }
  };

  return (
    <>
      <form className={classes["steps-form"]}>
        <div className={classes["input-group"]}>
          <label htmlFor="date" className={classes["steps-form-header"]}>
            Дата (ДД.ММ.ГГГГ)
          </label>
          <input
            className={`${classes["input-date"]} ${
              dateError ? classes["error-input"] : ""
            }`}
            type="text"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={classes["input-group"]}>
          <label htmlFor="distance" className={classes["steps-form-header"]}>
            Пройдено км
          </label>
          <input
            className={`${classes["input-km"]} ${
              distanceError ? classes["error-input"] : ""
            }`}
            type="text"
            name="distance"
            value={formData.distance}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className={classes["ok-btn"]}
          type="button"
          onClick={handleSubmit}
        >
          OK
        </button>
        {error && <div className={classes["error"]}>{error}</div>}
      </form>
    </>
  );
};
