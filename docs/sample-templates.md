# Sample Adaptive Card JSON Templates

This document contains sample Adaptive Card JSON templates that can be used with the SharePoint Adaptive Card WebPart.

## Basic Card Template

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "Hello World!",
      "size": "Large",
      "weight": "Bolder"
    },
    {
      "type": "TextBlock",
      "text": "This is a basic Adaptive Card.",
      "wrap": true
    }
  ]
}
```

## Card with Chart Element

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "Sales Dashboard",
      "size": "Large",
      "weight": "Bolder",
      "color": "Accent"
    },
    {
      "type": "Chart",
      "chartData": {
        "type": "bar",
        "data": {
          "labels": ["Q1", "Q2", "Q3", "Q4"],
          "datasets": [
            {
              "label": "Revenue ($M)",
              "data": [2.5, 3.2, 2.8, 4.1],
              "backgroundColor": "rgba(54, 162, 235, 0.6)",
              "borderColor": "rgba(54, 162, 235, 1)",
              "borderWidth": 1
            }
          ]
        },
        "options": {
          "plugins": {
            "title": {
              "display": true,
              "text": "Quarterly Revenue"
            }
          }
        }
      }
    }
  ]
}
```

## Line Chart Example

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "Website Traffic",
      "size": "Large",
      "weight": "Bolder"
    },
    {
      "type": "Chart",
      "chartData": {
        "type": "line",
        "data": {
          "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          "datasets": [
            {
              "label": "Visitors",
              "data": [1200, 1900, 3000, 5000, 2000, 3000],
              "borderColor": "rgb(75, 192, 192)",
              "backgroundColor": "rgba(75, 192, 192, 0.2)",
              "tension": 0.1
            }
          ]
        },
        "options": {
          "scales": {
            "y": {
              "beginAtZero": true
            }
          }
        }
      }
    }
  ]
}
```

## Pie Chart Example

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "TextBlock",
      "text": "Market Share",
      "size": "Large",
      "weight": "Bolder"
    },
    {
      "type": "Chart",
      "chartData": {
        "type": "pie",
        "data": {
          "labels": ["Product A", "Product B", "Product C", "Others"],
          "datasets": [
            {
              "data": [35, 25, 20, 20],
              "backgroundColor": [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#FF9F40"
              ]
            }
          ]
        }
      }
    }
  ]
}
```

## Complex Dashboard Card

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "Container",
      "style": "emphasis",
      "items": [
        {
          "type": "TextBlock",
          "text": "Business Intelligence Dashboard",
          "size": "Large",
          "weight": "Bolder",
          "horizontalAlignment": "Center"
        }
      ]
    },
    {
      "type": "ColumnSet",
      "columns": [
        {
          "type": "Column",
          "width": "stretch",
          "items": [
            {
              "type": "TextBlock",
              "text": "📊 Revenue Trends",
              "weight": "Bolder",
              "size": "Medium"
            },
            {
              "type": "Chart",
              "chartData": {
                "type": "line",
                "data": {
                  "labels": ["Jan", "Feb", "Mar", "Apr", "May"],
                  "datasets": [
                    {
                      "label": "Revenue",
                      "data": [65000, 59000, 80000, 81000, 96000],
                      "borderColor": "rgb(54, 162, 235)",
                      "backgroundColor": "rgba(54, 162, 235, 0.1)"
                    }
                  ]
                }
              }
            }
          ]
        },
        {
          "type": "Column",
          "width": "stretch",
          "items": [
            {
              "type": "TextBlock",
              "text": "📈 Department Performance",
              "weight": "Bolder",
              "size": "Medium"
            },
            {
              "type": "Chart",
              "chartData": {
                "type": "doughnut",
                "data": {
                  "labels": ["Sales", "Marketing", "Development", "Support"],
                  "datasets": [
                    {
                      "data": [45, 25, 20, 10],
                      "backgroundColor": [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0"
                      ]
                    }
                  ]
                }
              }
            }
          ]
        }
      ]
    },
    {
      "type": "ActionSet",
      "actions": [
        {
          "type": "Action.OpenUrl",
          "title": "View Full Report",
          "url": "https://example.com/report"
        }
      ]
    }
  ]
}
```
