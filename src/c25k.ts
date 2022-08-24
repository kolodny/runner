const times = <A extends any[]>(num: number, items: A) => {
  const ret = [...items];
  while (--num) {
    ret.push(...items);
  }
  return ret;
};

export const c25k: Record<
  string,
  Array<{
    steps: Array<{
      type: string;
      time: number;
    }>;
  }>
> = {
  'week 1': times(3, [
    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 90 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 90 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 90 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 90 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 90 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 90 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 90 },

        { type: 'run', time: 60 },
        { type: 'walk', time: 90 },

        { type: 'cooldown', time: 300 },
      ],
    },
  ]),
  'week 2': times(3, [
    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 90 },
        { type: 'walk', time: 120 },

        { type: 'run', time: 90 },
        { type: 'walk', time: 120 },

        { type: 'run', time: 90 },
        { type: 'walk', time: 120 },

        { type: 'run', time: 90 },
        { type: 'walk', time: 120 },

        { type: 'run', time: 90 },
        { type: 'walk', time: 120 },

        { type: 'cooldown', time: 300 },
      ],
    },
  ]),
  'week 3': times(3, [
    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 90 },
        { type: 'walk', time: 90 },

        { type: 'run', time: 180 },
        { type: 'walk', time: 180 },

        { type: 'run', time: 90 },
        { type: 'walk', time: 90 },

        { type: 'run', time: 180 },
        { type: 'walk', time: 180 },

        { type: 'cooldown', time: 300 },
      ],
    },
  ]),
  'week 4': times(3, [
    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 180 },
        { type: 'walk', time: 90 },

        { type: 'run', time: 300 },
        { type: 'walk', time: 150 },

        { type: 'run', time: 180 },
        { type: 'walk', time: 90 },

        { type: 'run', time: 300 },
      ],
    },
  ]),
  'week 5': [
    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 300 },
        { type: 'walk', time: 180 },

        { type: 'run', time: 300 },
        { type: 'walk', time: 180 },

        { type: 'run', time: 300 },
      ],
    },

    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 480 },
        { type: 'walk', time: 300 },

        { type: 'run', time: 480 },
      ],
    },

    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 1200 },
      ],
    },
  ],
  'week 6': [
    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 300 },
        { type: 'walk', time: 180 },

        { type: 'run', time: 480 },
        { type: 'walk', time: 180 },

        { type: 'run', time: 300 },
      ],
    },

    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 600 },
        { type: 'walk', time: 180 },

        { type: 'run', time: 600 },
      ],
    },

    {
      steps: [
        { type: 'warmup', time: 300 },

        { type: 'run', time: 1500 },
      ],
    },
  ],
};
