/* eslint-disable @typescript-eslint/no-explicit-any */
import EChartsReact from "echarts-for-react";

const LineChartComponent = ({ data, title }: { data: any, title?: string }): React.ReactNode => {
  if (!data || data.length == 0 || data.filter((a: any) => a.value > 0).length == 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="text-xl font-semibold text-slate-600">No data added yet.</p>
        <p className="text-md font-medium text-slate-400">Add data to enable visualization</p>
      </div>
    );
  }

  const option = {
    title: {
      text: title,
      left: 'center',
      top: 0,
      textStyle: {
        fontWeight: 'bold',
        fontSize: 16
      }
    },
    xAxis: {
      type: 'category',
      nameTextStyle: {
        fontWeight: 'bold',
      },
      data: data.map((d: any) => d.name)
    },
    yAxis: {
      type: 'value',
      nameTextStyle: {
        fontWeight: 'bold',
      },
      name: 'Amount'
    },
    series: [
      {
        data: data.map((d: any) => d.value),
        type: 'line'
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      formatter: function (params: any) {
        return `${params[0].name}: <strong>INR ${params[0].value}</strong>`;
      }
    },
  };  

  return (
    <EChartsReact option={option} />
  );
}

export default LineChartComponent;