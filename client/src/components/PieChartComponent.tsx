/* eslint-disable @typescript-eslint/no-explicit-any */
import EChartsReact from 'echarts-for-react';

const PieChartComponent = ({ data, title }: { data: any, title?: string }): React.ReactNode => {
  if (!data || data.length == 0 || data.filter((a: any) => a.value > 0).length == 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="text-xl font-semibold text-slate-600">No data yet.</p>
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
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return `${params.name}: <strong>INR ${params.value}</strong>`;
      },
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false
        },
        data: data,
      }
    ]
  };

  return (
    <EChartsReact option={option} />
  );
}

export default PieChartComponent;