import classes from './Footer.module.css';

const footer = () => {

    return (
        <p className={classes.footer}>
            
           ** Built & Designed by <span className={classes.bigger}>Liron Ashaul</span> **
        </p>
    );


};

export default footer;