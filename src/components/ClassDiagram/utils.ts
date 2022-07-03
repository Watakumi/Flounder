export const relationships = {
  inheritence: ['<|--', '継承'],
  composition: ['*--', '委譲'],
  aggregation: ['o--', '集約'],
  association: ['-->', '関連'],
  linkSolid: ['--', '線'],
  linkDashed: ['..', '破線'],
  dependency: ['..>', '依存'],
  realization: ['..|>', '実現'],
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
