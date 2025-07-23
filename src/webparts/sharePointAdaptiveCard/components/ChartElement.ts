import * as AC from "adaptivecards";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import * as React from 'react';
import * as ReactDOM from 'react-dom';


// Custom doughnut label plugin
const doughnutLabel = {
  id: 'doughnutLabel',
  beforeDraw(chart: any) {
    if (chart.config.options.plugins?.doughnutLabel?.display) {
      const { ctx, width, height } = chart;
      const value = chart.data.datasets[0].data[0];
      const font = chart.config.options.plugins.doughnutLabel.font;
      const color = chart.config.options.plugins.doughnutLabel.color;

      ctx.save();
      ctx.font = `${font.weight} ${font.size}px ${font.family}`;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Draw the number slightly above center
      ctx.fillText(value.toString(), width / 2, height / 2 - font.size/2);
      // Draw "tegoed" slightly below center
      ctx.fillText("tegoed", width / 2, height / 2 + font.size/2);
      ctx.restore();
    }
  }
};

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  doughnutLabel
);

export interface IChartData {
  type: 'bar' | 'line' | 'pie' | 'doughnut';
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }>;
  };
  options?: Record<string, unknown>;
}

export class ChartElement extends AC.CardElement {
  private static readonly typeNameStatic = "Chart";
  private _chartContainer: HTMLElement | undefined;

  // Property definition for chart data
  public static readonly chartDataProperty = new AC.PropertyDefinition(
    AC.Versions.v1_0,
    "chartData",
    undefined
  );

  constructor() {
    super();
  }

  protected internalRender(): HTMLElement | undefined {
    const element = document.createElement("div");
    element.style.width = "100%";
    element.style.height = "100%";
    //element.style.minHeight = "300px";

    this._chartContainer = element;

    const chartData = this.getValue(ChartElement.chartDataProperty) as IChartData;

    if (chartData && chartData.type && chartData.data) {
      try {
        const chartComponent = React.createElement(Chart, {
          type: chartData.type,
          data: chartData.data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'top' as const,
              },
            },
            ...chartData.options
          }
        });

        ReactDOM.render(chartComponent, element);
      } catch (error) {
        console.error('Error rendering chart:', error);
        element.innerHTML = '<div style="padding: 20px; text-align: center; color: #d13438; border: 1px solid #f4c6c6; border-radius: 4px;">Error rendering chart</div>';
      }
    } else {
      element.innerHTML = '<div style="padding: 20px; text-align: center; color: #666; border: 1px solid #ccc; border-radius: 4px;">Chart data not provided or invalid</div>';
    }

    return element;
  }

  public getJsonTypeName(): string {
    return ChartElement.typeNameStatic;
  }

  protected internalParse(source: Record<string, unknown>, context: AC.SerializationContext): void {
    super.internalParse(source, context);
    
    if (source.chartData) {
      this.setValue(ChartElement.chartDataProperty, source.chartData);
    }
  }

  protected internalToJSON(target: Record<string, unknown>, context: AC.SerializationContext): void {
    super.internalToJSON(target, context);
    
    const chartData = this.getValue(ChartElement.chartDataProperty);
    if (chartData) {
      target.chartData = chartData;
    }
  }
}

export function registerChartElement(): void {
  try {
    // Register the class directly with its constructor
    const ElementClass = ChartElement as unknown as new () => AC.CardElement;
    AC.GlobalRegistry.elements.register("Chart", ElementClass);
    console.log('ChartElement registered successfully');
  } catch (e) {
    console.warn('ChartElement registration failed or already registered:', e);
  }
}
