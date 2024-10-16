import classes from "./stepsRecord.module.css";

type StepsRecordProps = {
    date: string;
    distance: string;
    onDelete: () => void; 
    onEdit: () => void;
  };

export const StepsRecord: React.FC<StepsRecordProps> = ({ date, distance, onDelete, onEdit }) => {
  return (
    <div className={classes["record-item"]}>
      <span className={classes["record-item-date"]}>{date}</span>
      <span className={classes["record-item-distance"]}>{distance}</span>
      <div className={classes["record-item-buttons"]}>
        <button className={classes["record-item-edit-btn"]}
        onClick={onEdit}>
        <i className="fa fa-pencil"></i>
        </button>
        <button className={classes["record-item-delete-btn"]}
            onClick={onDelete}
        >
        <i className="fa fa-times"></i>
        </button>
      </div>
    </div>
  );
}