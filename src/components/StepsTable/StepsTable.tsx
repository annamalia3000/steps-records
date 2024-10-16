import { StepsRecord } from "../StepsRecord/StepsRecord";
import { FormData } from "../types";
import classes from "./stepsTable.module.css";

type RecordsTableProps = {
    records: FormData[];
    onDeleteRecord: (index: number) => void;
    onEditRecord: (index: number) => void;
};

export const StepsTable: React.FC<RecordsTableProps> = ({ records, onDeleteRecord, onEditRecord }) => {
  return (
    <div className={classes["steps-table"]}>
      <div className={classes["steps-table-header"]}>
        <span className={classes["steps-table-title"]}>Дата (ДД.ММ.ГГГГ)</span>
        <span className={classes["steps-table-title"]}>Пройдено км</span>
        <span className={classes["steps-table-title"]}>Действия</span>
      </div>
      <div className={classes["steps-table-content"]}>
        {records.length > 0 ? (
          records.map((record, index) => (
            <StepsRecord
              key={index}
              date={record.date}
              distance={record.distance}
              onDelete={() => onDeleteRecord(index)}
              onEdit={() => onEditRecord(index)}
            />
          ))
        ) : (
          <div className={classes["steps-table-empty"]}>
            <p>Нет данных</p>
          </div>
        )}
      </div>
    </div>
  );
};
