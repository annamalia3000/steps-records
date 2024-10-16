import { StepsTable } from "../StepsTable/StepsTable";
import { parseDate } from "./parseDate";
import { isValidDate, isValidDistance } from "./validation";
import { useState } from "react";
import classes from "./stepsForm.module.css";

type FormData = {
  date: string;
  distance: string;
};

export const StepsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    date: "",
    distance: "",
  });

  const [records, setRecords] = useState<FormData[]>([]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [error, setError] = useState<string>("");
  const [dateError, setDateError] = useState<boolean>(false);
  const [distanceError, setDistanceError] = useState<boolean>(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    setFormData({ ...formData, date: inputDate });
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDistance = e.target.value;

    if (isValidDistance(inputDistance)) {
      setFormData({ ...formData, distance: inputDistance });
    }
  };

  const handelOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      if (editingIndex !== null) {
        const updatedRecords = [...records];
        updatedRecords[editingIndex] = formData;
        setRecords(updatedRecords);
        setEditingIndex(null);
        setFormData({
            date: "",
            distance: "",
          });
      } else {
        const existingRecordIndex = records.findIndex(
          (record) => record.date === formData.date
        );
        if (existingRecordIndex !== -1) {
          const updatedRecords = [...records];
          updatedRecords[existingRecordIndex].distance = (
            +updatedRecords[existingRecordIndex].distance + +formData.distance
          ).toString();
          setRecords(updatedRecords);
        } else {
          const updatedRecords = [...records, formData];
          updatedRecords.sort((a, b) => {
            return parseDate(b.date).getTime() - parseDate(a.date).getTime();
          });

          setRecords(updatedRecords);
        }

        setError("");
        setFormData({
          date: "",
          distance: "",
        });
      }
    }
  };

  const handleDeleteRecord = (index: number) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  const handleEditRecord = (index: number) => {
    const editedRecord = records[index];
    setFormData(editedRecord);
    setEditingIndex(index);
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
            id="date"
            value={formData.date}
            onChange={handleDateChange}
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
            id="distance"
            value={formData.distance}
            onChange={handleDistanceChange}
            required
          />
        </div>
        <button
          className={classes["ok-btn"]}
          type="button"
          onClick={handelOnClick}
        >
          OK
        </button>
        {error && <div className={classes["error"]}>{error}</div>}
      </form>
      <StepsTable
        records={records}
        onDeleteRecord={handleDeleteRecord}
        onEditRecord={handleEditRecord}
      />
    </>
  );
};
