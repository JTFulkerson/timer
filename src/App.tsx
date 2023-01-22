import classnames from 'classnames';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import useHotkeys from '@reecelucas/react-use-hotkeys';

type UnitOfTimeT = 'MINUTES' | 'SECONDS';

function UnitOfTime(props: {
  value: number | string;
  name: UnitOfTimeT;
  setActive: (name: UnitOfTimeT) => void;
  active?: UnitOfTimeT;
}) {
  return (
    <span
      className={classnames('cursor-pointer', {
        'border-solid border-white border-2': props.name === props.active,
      })}
      onClick={() => props.setActive(props.name)}
    >
      {`00${props.value}`.slice(-2)}
    </span>
  );
}

function App() {
  const [isRunning, setRunning] = useState(false);
  const [timer, setTimer] = useState<[number, number]>([0, 0]);
  const [initTimer, setInitTimer] = useState<[number, number]>([0, 0]);
  const [activeUnitOfTime, setActiveUnitOfTime] = useState<
    UnitOfTimeT | undefined
  >();
  const [typing, setTyping] = useState<[string, string]>(['', '']);

  type ButtonProps = { className: string; onClick: () => void };
  function Button(props: PropsWithChildren<ButtonProps>) {
    return (
      <div
        tabIndex={-1}
        className={classnames(
          'text-white/80 bg-white/10 leading-10 rounded-[1vw] border-none outline-none flex flex-col text-center justify-center cursor-pointer hover:bg-white/40',
          props.className
        )}
        onClick={(event) => {
          props.onClick();
          if (activeUnitOfTime) {
            setActiveUnitOfTime(undefined);
          }
        }}
        onKeyDown={(event) => {
          event.preventDefault();
        }}
      >
        {props.children}
      </div>
    );
  }

  useHotkeys('f', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  });
  useHotkeys(' ', () => {
    if (timer[0] || timer[1]) {
      setRunning(!isRunning);
    }
  });
  useHotkeys('r', () => {
    setRunning(false);
    setTimer(initTimer);
  });
  useHotkeys(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], (event) => {
    if (activeUnitOfTime) {
      const currentValue =
        activeUnitOfTime === 'MINUTES' ? typing[0] : typing[1];
      const newValue = `${currentValue}${event.key}`.slice(-2);
      console.log(`[${newValue}]`)
      if (activeUnitOfTime === 'MINUTES') {
        setTyping([newValue, typing[1]]);
        if (newValue.length === 2) {
          setActiveUnitOfTime('SECONDS');
        }
      } else {
        setTyping([typing[0], newValue]);
        if (newValue.length === 2) {
          setActiveUnitOfTime(undefined);
          setTimer([parseInt(typing[0]), parseInt(newValue)]);
          setInitTimer([parseInt(typing[0]), parseInt(newValue)]);
          setTyping(['', '']);
        }
      }
    }
  });
  useEffect(() => {
    if (activeUnitOfTime && isRunning) {
      setRunning(false);
    }
  }, [activeUnitOfTime, isRunning]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if (timer[0] === 0 && timer[1] === 0) {
          setRunning(false);
        } else if (timer[1] === 0) {
          setTimer([timer[0] - 1, 59]);
        } else {
          setTimer([timer[0], timer[1] - 1]);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, timer]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-[2vw]">
      <p className="text-white font-bold text-[22vw]">
        <UnitOfTime
          value={activeUnitOfTime ? typing[0] : timer[0]}
          name="MINUTES"
          active={activeUnitOfTime}
          setActive={(newActive: UnitOfTimeT) => setActiveUnitOfTime(newActive)}
        />
        :
        <UnitOfTime
          value={activeUnitOfTime ? typing[1] : timer[1]}
          name="SECONDS"
          active={activeUnitOfTime}
          setActive={(newActive: UnitOfTimeT) => setActiveUnitOfTime(newActive)}
        />
      </p>
      <div className="flex flex-row gap-[2vw]">
        <Button
          className="text-[4vw] h-[8vw] w-[14vw]"
          onClick={() => {
            if (timer[0] || timer[1]) {
              setRunning(!isRunning);
            }
          }}
        >
          {isRunning ? 'pause' : 'start'}
        </Button>
        <Button
          className="text-[4vw] h-[8vw] w-[14vw]"
          onClick={() => {
            setRunning(false);
            setTimer(initTimer);
          }}
        >
          reset
        </Button>
      </div>
      <div className="flex flex-row gap-[2vw]">
        <Button
          className="text-[3vw] h-[6vw] w-[10vw]"
          onClick={() => {
            setTimer([1, 0]);
            setInitTimer([1, 0]);
            setRunning(false);
          }}
        >
          1:00
        </Button>
        <Button
          className="text-[3vw] h-[6vw] w-[10vw]"
          onClick={() => {
            setTimer([2, 0]);
            setInitTimer([2, 0]);
            setRunning(false);
          }}
        >
          2:00
        </Button>
        <Button
          className="text-[3vw] h-[6vw] w-[10vw]"
          onClick={() => {
            setTimer([3, 0]);
            setInitTimer([3, 0]);
            setRunning(false);
          }}
        >
          3:00
        </Button>
      </div>
    </div>
  );
}

export default App;
