export const relationships = {
  inheritence: '<|--',
  composition: '*--',
  aggregation: 'o--',
  association: '-->',
  linkSolid: '--',
  linkDashed: '..',
  dependency: '..>',
  realization: '..|>',
};

export const visibility = {
  public: '+',
  private: '-',
  protected: '#',
  package: '~',
};

export const annotation = (text: string) => {
  return `<< ${text} >>`;
};
