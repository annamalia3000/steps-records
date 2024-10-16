import { StepsForm } from '../StepsForm/StepsForm';
import classes from './Steps.module.css';


export const Steps = () => {
  return (
    <div className={classes['container']}>
        <StepsForm/>
    </div>
  )
}
