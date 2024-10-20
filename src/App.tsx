import { Form } from "./components/Form/Form";
import { Data } from "./components/Data/Data";
import { FormData } from "./components/types";
import { parseDate } from "./components/parseDate";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function App() {
  const [formData, setFormData] = useState<FormData>({
    date: "",
    distance: "",
  });

  const [records, setRecords] = useState<FormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleDeleteRecord = (index: number) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  const handleEditRecord = (index: number) => {
    const editedRecord = records[index];
    setFormData(editedRecord);
    setEditingIndex(index);
  };

  const handleFormSubmit = () => {
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
    }
  };

  return (
    <div className="container">
      <Form
        formData={formData}
        setFormData={setFormData}
        onFormSubmit={handleFormSubmit}
      />
      <Data
        records={records}
        onDeleteRecord={handleDeleteRecord}
        onEditRecord={handleEditRecord}
      />
    </div>
  );
}
export default App;
