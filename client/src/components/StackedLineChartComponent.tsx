/* eslint-disable @typescript-eslint/no-explicit-any */
import EChartsReact from "echarts-for-react";

const StackedLineChartComponent = ({ title, data }: any): React.ReactNode => {
  const option = {
    title: {
      text: title,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: data.map((d: any) => d.name),
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: data.length ? data[0].data.map((d: any) => d.date) : [],
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: data.map((d: any) => {
      return {
        name: d.name,
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: d.data,
      }
    })
  };

  return (
    <EChartsReact option={option} />
  );
}

export default StackedLineChartComponent;