import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

import styles from '../EditProfile.css';

const customStyles = makeStyles(theme => ({
  root: {
    fontSize: '14px',
    '& .MuiInput-underline:before': {
      borderBottom: '2px solid rgba(0, 0, 0, 0.42)'
    },
    '& .MuiInput-underline.Mui-disabled:before': {
      borderBottom: '2px solid #3f51b5'
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '202px',
      '& .MuiInputBase-input': {
        fontSize: '18px'
      }
    }
  },
  error: {
    '& .MuiFormLabel-root': {
      color: '#EB5757',
      fontSize: '14px'
    },
    '& .Mui-focused:before': {
      borderBottom: '2px solid #EB5757'
    },
    '& .Mui-focused:after': {
      borderBottom: '2px solid #EB5757'
    },
    '& .MuiInput-underline:before': {
      borderBottom: '2px solid #EB5757'
    },
    '& .MuiInput-underline.Mui-disabled:before': {
      borderBottom: '2px solid #EB5757'
    }
  },
  capitalize: {
    '& .MuiInputBase-input': {
      textTransform: 'capitalize'
    }
  },
  bold: {
    '& .MuiInputBase-input': {
      fontWeight: '600'
    }
  }
}));

const TextInput = props => {
  const {
    value,
    handlechange,
    label,
    heading,
    placeholder,
    disabled,
    error,
    InputProps,
    onClick,
    isCapitalize,
    type,
    isBold,
    errorBorder
  } = props;

  const onTextChange = event => {
    handlechange(event.target.value);
  };

  const classes = customStyles();
  return (
    <>
      {
        heading ? (
          <div className={`${styles.heading} ${disabled ? styles.disabledHeader : ''}`}>
            {heading}
          </div>
        ) : null
      }
      <TextField
        fullWidth
        id="input"
        className={`${classes.root} ${isCapitalize && classes.capitalize} ${isBold && classes.bold} ${(error || errorBorder) ? classes.error : ''}`}
        value={value}
        onChange={onTextChange}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        InputProps={InputProps}
        onClick={onClick}
      />
      {
        error
          ? (
            <div className={styles.inputErrorText}>
              {error}
            </div>
          ) : null
      }
    </>
  );
};
export default TextInput;
