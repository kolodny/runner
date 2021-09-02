// const times = <A extends any[]>(num: number, items: A) => {
//   const ret = [...items];
//   while (--num) {
//     ret.push(...items);
//   }
//   return ret;
// };

export const c25k: Record<
  string,
  Array<{
    steps: Array<{
      type: string;
      time: number;
    }>;
  }>
> = {
  week1: [
    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 60 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 60 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 60 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 60 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 60 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 60 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 60 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 60 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 60 },

        { type: 'run', time: 60 },

        { type: 'cooldown', time: 300 },
      ],
    },
    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 120 },
        { type: 'walk', time: 240 },

        { type: 'run', time: 120 },
        { type: 'walk', time: 240 },

        { type: 'run', time: 120 },
        { type: 'walk', time: 240 },

        { type: 'run', time: 120 },
        { type: 'walk', time: 240 },

        { type: 'run', time: 120 },

        { type: 'cooldown', time: 300 },
      ],
    },
    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 120 },
        { type: 'walk', time: 240 },

        { type: 'run', time: 120 },
        { type: 'walk', time: 240 },

        { type: 'run', time: 120 },
        { type: 'walk', time: 240 },

        { type: 'run', time: 120 },
        { type: 'walk', time: 240 },

        { type: 'run', time: 120 },

        { type: 'cooldown', time: 300 },
      ],
    },
  ],
  week2: [
    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 180 },
        { type: 'walk', time: 180 },

        { type: 'run', time: 180 },
        { type: 'walk', time: 180 },

        { type: 'run', time: 180 },
        { type: 'walk', time: 180 },

        { type: 'run', time: 180 },

        { type: 'cooldown', time: 300 },
      ],
    },
    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 180 },
        { type: 'walk', time: 180 },

        { type: 'run', time: 180 },
        { type: 'walk', time: 180 },

        { type: 'run', time: 180 },
        { type: 'walk', time: 180 },

        { type: 'run', time: 180 },

        { type: 'cooldown', time: 300 },
      ],
    },
    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 300 },
        { type: 'walk', time: 180 },

        { type: 'run', time: 300 },
        { type: 'walk', time: 180 },

        { type: 'run', time: 300 },

        { type: 'cooldown', time: 300 },
      ],
    },
  ],
};
