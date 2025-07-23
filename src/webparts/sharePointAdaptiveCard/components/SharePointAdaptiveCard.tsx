import * as React from 'react';
import styles from './SharePointAdaptiveCard.module.scss';
import type { ISharePointAdaptiveCardProps } from './ISharePointAdaptiveCardProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { AdaptiveCardRenderer } from './AdaptiveCardRenderer';

export default class SharePointAdaptiveCard extends React.Component<ISharePointAdaptiveCardProps> {
  
  private _getDefaultAdaptiveCardJson(): string {
    return JSON.stringify({
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "🏖️ Vakantiedagen",
      "size": "Large",
      "weight": "Bolder",
      "spacing": "none"
    },
    {
      "type": "Chart",
      "spacing": "none",
      "chartData": {
        "type": "doughnut",
        "data": {
          //"labels": ["Credit", "1 day purchased from personal budget", "2 days left of 2024. P.S. It will Expire on July 1, 2025"],
          "datasets": [
            {
              //"label": "Vakantiedagen",
              "data": [22, 1, 2],
              "backgroundColor": [
                "rgba(0, 138, 41, 1)",
                "rgba(186, 69, 118, 1)",
                "rgba(230, 172, 0, 1)"
              ],
              "borderColor": [
                "rgba(0, 138, 41, 1)",
                "rgba(186, 69, 118, 1)",
                "rgba(230, 172, 0, 1)"
              ],
              "borderWidth": 1
            }
          ]
        },
        "options": {
          "responsive": true,
          "maintainAspectRatio": false,
          "cutout": "70%",
          "plugins": {
            "legend": {
              "display": false
            },
            "doughnutLabel": {
              "display": true,
              "color": "#333333",
              "font": {
                "size": 20,
                "weight": "bold",
                "family": "Segoe UI"
              }
            }
          }
        }
      }
    }
  ]
}, null, 0);
  }

  /* private _getSampleChartCard(): string {
    return JSON.stringify({
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "📊 Monthly Sales Overview",
      "size": "ExtraLarge",
      "weight": "Bolder",
      "color": "Accent",
      "wrap": true
    },
    {
      "type": "TextBlock",
      "text": "Stylized bar chart with multi-color bars and modern layout",
      "size": "Small",
      "weight": "Lighter",
      "isSubtle": true,
      "spacing": "None"
    },
    {
      "type": "Chart",
      "chartData": {
        "type": "bar",
        "data": {
          "labels": ["January", "February", "March", "April", "May"],
          "datasets": [
            {
              "label": "Sales",
              "data": [65, 59, 80, 81, 56],
              "backgroundColor": [
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(153, 102, 255, 0.7)"
              ],
              "borderColor": [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)"
              ],
              "borderWidth": 2,
              "borderRadius": 6,
              "barThickness": 30
            }
          ]
        },
        "options": {
          "responsive": true,
          "maintainAspectRatio": false,
          "animation": {
            "duration": 1000,
            "easing": "easeOutBounce"
          },
          "plugins": {
            "legend": {
              "display": true,
              "position": "top"
            },
            "title": {
              "display": true,
              "text": "🌟 Monthly Sales Report",
              "font": {
                "size": 18,
                "weight": "bold",
                "family": "Segoe UI"
              },
              "color": "#333"
            },
            "tooltip": {
              "enabled": true,
              "backgroundColor": "rgba(0, 0, 0, 0.7)",
              "titleFont": {
                "weight": "bold"
              },
              "bodyFont": {
                "size": 12
              }
            }
          },
          "scales": {
            "y": {
              "beginAtZero": true,
              "grid": {
                "color": "rgba(200, 200, 200, 0.2)"
              },
              "ticks": {
                "color": "#666"
              }
            },
            "x": {
              "grid": {
                "display": false
              },
              "ticks": {
                "color": "#666"
              }
            }
          }
        }
      }
    }
  ]
}, null, 2);
  } */

  public render(): React.ReactElement<ISharePointAdaptiveCardProps> {
    const {
      description,
      adaptiveCardJson,
      enableCharts,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    // Use provided JSON or default
    const cardJson = adaptiveCardJson && adaptiveCardJson.trim() 
      ? adaptiveCardJson 
      : this._getDefaultAdaptiveCardJson();

    return (
      <section className={`${styles.sharePointAdaptiveCard} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.adaptiveCardContainer}>
          <AdaptiveCardRenderer 
            adaptiveCardJson={cardJson}
            onError={(error) => console.error('Adaptive Card Error:', error)}
          />
        </div>
        {/* {enableCharts && (
          <div className={styles.sampleSection}>
            <AdaptiveCardRenderer 
              adaptiveCardJson={this._getSampleChartCard()}
              onError={(error) => console.error('Chart Card Error:', error)}
            />
          </div>
        )} */}
      </section>
    );
  }
}
