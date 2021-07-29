import classes from './Button.module.css';

const Button= props => {

return <button type={props.type} className={classes.button} id={props.id} onClick={props.onClick}>{props.children}</button>
};

export default Button;
