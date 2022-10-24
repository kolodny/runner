import React from 'react';
import { c25k } from './c25k';
import _ from 'lodash';

const WS_ENDPOINT = `ws://192.168.1.187/control`;

const COMMANDS = {
  MPH: 'MPH',
  FAN: 'Fan Speed',
  INCLINE: 'Incline',
};

const infoList = [
  'Miles',
  'Current MPH',
  'Hand Pulse',
  'Chest Pulse',
  'Incline',
];

export const App: React.FC = () => {
  const ws = React.useMemo(() => new WebSocket(WS_ENDPOINT), []);
  const [info, setInfo] = React.useState<any>({});
  ws.onmessage = (m) => {
    const values = JSON.parse(m.data)?.values;
    if (values) {
      console.log(values);
      setInfo({ ...info, ...values });
    }
  };
  const [connected, setConnected] = React.useState(false);
  const setMPH = React.useCallback(
    (mph: number) => {
      try {
        console.log('setting speed to', mph);
        ws.send(
          JSON.stringify({ values: { [COMMANDS.MPH]: `${mph}` }, type: 'set' })
        );
      } catch {}
    },
    [ws]
  );
  const setFan = React.useCallback(
    (speed: number) => {
      try {
        ws.send(
          JSON.stringify({
            values: { [COMMANDS.FAN]: `${speed}` },
            type: 'set',
          })
        );
      } catch {}
    },
    [ws]
  );
  const setIncline = React.useCallback(
    (incline: number) => {
      try {
        ws.send(
          JSON.stringify({
            values: { [COMMANDS.INCLINE]: `${incline}` },
            type: 'set',
          })
        );
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
      <div>
        <button onClick={() => setIncline(+info.Incline - 1)}>🗻 +</button>
        <button onClick={() => setIncline(+info.Incline + 1)}>🗻 -</button>
        <button onClick={() => setFan(100)}>💨 On</button>
        <button onClick={() => setFan(0)}>💨 Off</button>
      </div>
      <pre>{JSON.stringify(_.pick(info, infoList), null, 2).slice(1, -1)}</pre>
    </div>
  );
};
