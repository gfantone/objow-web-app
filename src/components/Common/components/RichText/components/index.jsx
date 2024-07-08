import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import ReactDOM from 'react-dom';

export const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      style={{
        cursor: 'pointer',
        color: reversed
          ? active
            ? 'white'
            : '#aaa'
          : active
          ? 'black'
          : '#ccc',
      }}
    />
  ),
);

export const EditorValue = React.forwardRef(
  ({ className, value, ...props }, ref) => {
    const textLines = value.document.nodes
      .map((node) => node.text)
      .toArray()
      .join('\n');

    return (
      <div
        ref={ref}
        {...props}
        style={{
          margin: '30px -20px 0',
        }}
      >
        <div
          style={{
            fontSize: 14,
            padding: '5px 20px',
            color: '#404040',
            borderTop: '2px solid #eeeeee',
            background: '#f8f8f8',
          }}
        >
          Slate's value as text
        </div>
        <div
          style={{
            color: '#404040',
            font: '12px monospace',
            whiteSpace: 'pre-wrap',
            padding: '10px 20px',
            div: {
              margin: '0 0 0.5em',
            },
          }}
        >
          {textLines}
        </div>
      </div>
    );
  },
);

export const Icon = React.forwardRef(({ className, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    style={{
      fontSize: 18,
      verticalAlign: 'text-bottom',
    }}
  />
));

export const Instruction = React.forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    style={{
      whiteSpace: 'pre-wrap',
      margin: '0 -20px 10px',
      padding: '10px 20px',
      fontSize: 14,
      background: '#f8f8e8',
    }}
  />
));

const useStyles = makeStyles({
  menuItem: {
    '& > *': {
      display: 'inline-block',
    },
    '& > * + *': {
      marginLeft: 15,
    },
  },
});

export const Menu = React.forwardRef(({ className, ...props }, ref) => {
  const classes = useStyles();
  return (
    <div
      {...props}
      ref={ref}
      className={classes.menuItem}
      style={{
        position: 'relative',
        padding: '1px 18px 17px',
        margin: '0 -20px',
        borderBottom: '2px solid #eee',
        marginBottom: 20,
      }}
    />
  );
});

export const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
  <Menu {...props} ref={ref} />
));
