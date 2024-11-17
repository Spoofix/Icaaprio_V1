declare module 'jstat' {
  export interface JStat {
    normal: {
      sample: (mean: number, std: number) => number;
    };
  }
  
  const jStat: JStat;
  export { jStat };
}