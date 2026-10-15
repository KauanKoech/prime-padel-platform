import React from 'react';

export function ProgressSteps({ steps = [], current = 0, variant = 'bar', className = '', ...rest }) {
  if (variant === 'numbered') {
    var out = [];
    steps.forEach(function (s, i) {
      var st = i < current ? 'done' : i === current ? 'current' : 'todo';
      if (i > 0) out.push(<span key={'l' + i} className="pp-steps__line" />);
      out.push(<span key={i} className={'pp-steps__item pp-steps__item--' + st}><span className="pp-steps__num">{i + 1}</span>{s}</span>);
    });
    return <div className={'pp-steps pp-steps--numbered ' + className} {...rest}>{out}</div>;
  }
  return (
    <div className={'pp-steps ' + className} {...rest}>
      <div className="pp-steps__bars">{steps.map(function (s, i) { return <span key={i} className={'pp-steps__bar' + (i <= current ? ' pp-steps__bar--done' : '')} />; })}</div>
      <div className="pp-steps__label"><span>Passo {current + 1} de {steps.length}</span><b>{steps[current]}</b></div>
    </div>
  );
}
