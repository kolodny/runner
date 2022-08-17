import React from 'react';
import { c25k } from './c25k';

const findIp = async () => {
  for (let i = 0; i < 255; i++) {
    const ws = new WebSocket(`ws://10.0.0.${i}/control`);
    const timeout = new Promise((r) => setTimeout(r, 10000));
    const wsPromise = new Promise((r, j) => {
      ws.onopen = () => r(true);
      ws.onerror = () => r(false);
    });
    const found = await Promise.race([wsPromise, timeout]);
    if (found) {
      console.log(found);
      return;
    }
  }
};

//findIp();

console.log(findIp);

const WS_ENDPOINT = `ws://10.0.0.3/control`;

console.log(c25k);

export const App: React.FC = () => {
  const [pulse, setPulse] = React.useState(0);
  const ws = React.useMemo(() => new WebSocket(WS_ENDPOINT), []);
  ws.onmessage = (m) => {
    const values = JSON.parse(m.data)?.values;
    if (values?.['Chest Pulse']) {
      setPulse(+values['Chest Pulse'] ?? pulse);
    }
  };
  const [connected, setConnected] = React.useState(false);
  const setMPH = React.useCallback(
    (mph: number) => {
      try {
        console.log('setting speed to', mph);
        ws.send(JSON.stringify({ values: { MPH: `${mph}` }, type: 'set' }));
      } catch {}
    },
    [ws]
  );
  React.useEffect(() => {
    ws.onopen = () => setConnected(true);
  });
  const [week, setWeek] = React.useState('week 1');
  const [day, setDay] = React.useState(0);
  const intervals = c25k[week]?.[day];
  const totalTime = intervals.steps.reduce((acc, cur) => acc + cur.time, 0);
  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  React.useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [running, totalTime]);

  const done = time >= totalTime;

  React.useEffect(() => {
    if (done) {
      setRunning(false);
    }
  }, [done]);

  let currentActivityTime = time;
  let currentStepIndex = 0;
  if (done) {
    console.log('DONE');
    currentStepIndex = intervals.steps.length - 1;
    currentActivityTime = intervals.steps[currentStepIndex].time;
  } else {
    while (currentActivityTime >= intervals.steps[currentStepIndex].time) {
      currentActivityTime -= intervals.steps[currentStepIndex].time;
      currentStepIndex++;
    }
  }

  const currentStep = intervals.steps[currentStepIndex];

  React.useEffect(() => {
    if (running) {
      const isRun = currentStep.type === 'run';
      setMPH(isRun ? 6.22 : 3.5);
    } else {
      setMPH(0);
    }
  }, [currentStep.type, running, setMPH]);

  const formatTime = (t: number) =>
    `${`0${Math.floor(t / 60)}`.slice(-2)}:${`0${Math.floor(t % 60)}`.slice(
      -2
    )}`;

  return (
    <div>
      <div>{connected ? 'Connected' : 'Not Connected'}</div>
      <div>
        Status: {currentStep.type}
        <div>Current Elapsed: {formatTime(currentActivityTime)}</div>
        <div>
          Current Remaining:{' '}
          {formatTime(currentStep.time - currentActivityTime)}
        </div>
      </div>
      <select
        onChange={(e) => {
          setWeek(e.target.value);
          if (!c25k[e.target.value][day]) {
            setDay(0);
          }
        }}
      >
        {Object.keys(c25k).map((w) => (
          <option>{w}</option>
        ))}
      </select>
      <select onChange={(e) => setDay(+e.target.value)}>
        {Object.keys(c25k[week]).map((d) => (
          <option>{d}</option>
        ))}
      </select>
      <div>Total Elapsed {formatTime(time)}</div>
      <div>Total Remaining {formatTime(totalTime - time)}</div>
      <div>Pulse: {pulse}</div>
      <input
        type="range"
        min={0}
        max={totalTime}
        value={time}
        onChange={(e) => setTime(+e.target.value)}
      />
      <div>
        <button onClick={() => setRunning((r) => !done && !r)}>Toggle</button>
        <button onClick={() => setRunning((r) => !done && true)}>Start</button>
        <button onClick={() => setRunning((r) => !done && false)}>Stop</button>
      </div>
    </div>
  );
};
