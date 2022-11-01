import React from 'react';
import './style.css';

export const FeedbackForm = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return <div className={'form-feedback'}>
    <h3>What did we miss?</h3>
    <form onSubmit={onSubmit}>
      <label htmlFor='feedback'>Helps us to make this documentation better and report an issue or
        provide a suggestion for content</label>
      <textarea name='feedback'></textarea>
      <button type={'submit'}>Report an Issue</button>
    </form>
  </div>;
};
