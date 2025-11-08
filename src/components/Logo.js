import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium' }) => {
  return (
    <div className={`college-logo ${size}`}>
      <span className="letter-c1">C</span>
      <span className="letter-o1">o</span>
      <span className="letter-l1">l</span>
      <span className="letter-l2">l</span>
      <span className="letter-e1">e</span>
      <span className="letter-g">g</span>
      <span className="letter-e2">e</span>
      <span className="space"> </span>
      <span className="letter-c2">C</span>
      <span className="letter-o2">o</span>
      <span className="letter-m">m</span>
      <span className="letter-m2">m</span>
      <span className="letter-u">u</span>
      <span className="letter-n">n</span>
      <span className="letter-i">i</span>
      <span className="letter-t">t</span>
      <span className="letter-y">y</span>
    </div>
  );
};

export default Logo;
