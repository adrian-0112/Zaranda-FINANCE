
export interface PriceHistoryData {
  buy: number;
  sell: number;
  changeValue: number;
  changePercent: number;
  periodLabel: string;
  trend: 'up' | 'down';
  chartData: number[];
}

export const priceHistory: Record<string, PriceHistoryData> = {
  '1d': {
    buy: 18.4517,
    sell: 18.4217,
    changeValue: -0.01,
    changePercent: 0.05,
    periodLabel: 'Today',
    trend: 'down',
    chartData: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 20, 35, 30, 45, 40, 60, 55],
  },
  '1w': {
    buy: 18.4385,
    sell: 18.4327,
    changeValue: -0.13,
    changePercent: 0.69,
    periodLabel: 'Past week',
    trend: 'down',
    chartData: [60, 55, 65, 50, 70, 80, 75, 70, 65, 60, 70, 65, 60, 55, 50, 45, 50, 55, 40, 35, 40, 50, 45, 60],
  },
  '1m': {
    buy: 18.4385,
    sell: 18.4327,
    changeValue: 0.04,
    changePercent: 0.24,
    periodLabel: 'Past month',
    trend: 'up',
    chartData: [30, 40, 35, 50, 45, 60, 55, 70, 80, 75, 65, 60, 55, 65, 70, 60, 50, 45, 55, 65, 75, 90, 85, 80],
  },
  '6m': {
    buy: 18.4385,
    sell: 18.4327,
    changeValue: -1.01,
    changePercent: 5.21,
    periodLabel: 'Past 6 months',
    trend: 'down',
    chartData: [90, 85, 80, 70, 75, 65, 60, 55, 60, 50, 45, 55, 50, 60, 55, 40, 45, 50, 35, 40, 45, 55, 50, 60],
  },
  '1y': {
    buy: 18.4385,
    sell: 18.4327,
    changeValue: -1.75,
    changePercent: 8.68,
    periodLabel: 'Past year',
    trend: 'down',
    chartData: [80, 85, 90, 80, 85, 75, 70, 65, 70, 60, 50, 45, 55, 60, 50, 40, 35, 40, 30, 25, 35, 40, 30, 35],
  },
  '5y': {
    buy: 18.4385,
    sell: 18.4327,
    changeValue: -2.12,
    changePercent: 10.32,
    periodLabel: 'Past 5 years',
    trend: 'down',
    chartData: [70, 80, 90, 85, 75, 65, 55, 60, 70, 65, 50, 40, 30, 40, 50, 60, 70, 80, 75, 65, 70, 60, 75, 85],
  },
};
