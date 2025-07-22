# SharePoint React Adaptive Card WebPart

## Summary

A SharePoint Framework (SPFx) React webpart that renders JSON schema using Microsoft's Adaptive Cards with the react-adaptivecards wrapper. The webpart supports custom chart elements including Bar, Line, Pie, and Doughnut charts powered by Chart.js.

## Features

- 🎯 **Adaptive Cards Rendering**: Render Adaptive Cards from JSON schema
- 📊 **Custom Chart Elements**: Support for Bar, Line, Pie, and Doughnut charts
- 🔧 **Easy Configuration**: Property pane configuration for JSON input
- 📱 **Responsive Design**: Charts and cards adapt to different screen sizes
- 🎨 **SharePoint Integration**: Seamlessly integrates with SharePoint themes
- ⚡ **Real-time Preview**: See changes instantly when updating JSON

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.21.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- SharePoint Online
- Microsoft Teams
- Microsoft Viva Connections

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- Node.js v16 or v18
- npm or yarn package manager
- SharePoint Framework development environment
- Basic knowledge of JSON and Adaptive Cards schema

## Technologies Used

- **SharePoint Framework (SPFx) 1.21.1**
- **React 17.0.1**
- **TypeScript**
- **Adaptive Cards** (`adaptivecards`, `react-adaptivecards`, `adaptivecards-templating`)
- **Chart.js** and **react-chartjs-2** for chart rendering
- **Microsoft Fluent UI** components

## Solution

| Solution                           | Author(s)                    |
| ---------------------------------- | ---------------------------- |
| SharePoint React Adaptive Card    | GitHub Copilot               |

## Version history

| Version | Date             | Comments                                      |
| ------- | ---------------- | --------------------------------------------- |
| 1.0     | July 22, 2025    | Initial release with Adaptive Cards and Charts |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- In the command-line run:
  - `npm install`
  - `gulp serve`
- Open the SharePoint Workbench in your browser
- Add the "SharePoint Adaptive Card" webpart to the page
- Configure the webpart by editing the property pane

## Usage

### Basic Configuration

1. **Add the WebPart**: Add the "SharePoint Adaptive Card" webpart to your SharePoint page
2. **Configure Properties**: 
   - Click the pencil (edit) icon to open the property pane
   - Enter a description for your webpart
   - Paste your Adaptive Card JSON in the "Adaptive Card JSON" field
   - Toggle "Enable Chart Elements" to show/hide chart functionality
3. **Save Changes**: Your Adaptive Card will render immediately

### Creating Charts

To create charts in your Adaptive Cards, use the custom `Chart` element:

```json
{
  "type": "Chart",
  "chartData": {
    "type": "bar",
    "data": {
      "labels": ["Q1", "Q2", "Q3", "Q4"],
      "datasets": [{
        "label": "Revenue",
        "data": [100, 150, 120, 180],
        "backgroundColor": "rgba(75, 192, 192, 0.6)"
      }]
    }
  }
}
```

### Supported Chart Types

- **Bar Charts**: `"type": "bar"`
- **Line Charts**: `"type": "line"`
- **Pie Charts**: `"type": "pie"`
- **Doughnut Charts**: `"type": "doughnut"`

## Sample Templates

See the `/docs/sample-templates.md` file for comprehensive examples of Adaptive Card JSON templates with charts.

## Advanced Configuration

### Custom Styling
Charts inherit SharePoint theme colors and can be customized using Chart.js options in the `chartData.options` property.

### Data Sources
While this version uses static JSON data, you can extend the webpart to connect to:
- SharePoint Lists
- Microsoft Graph API
- External APIs
- Power BI datasets

## Development

### Building the Code

```bash
git clone https://github.com/your-repo/sharepoint-react-adaptive-card
cd sharepoint-react-adaptive-card
npm install
npm run build
gulp serve
```

### Packaging for Production

```bash
npm run build
gulp bundle --ship
gulp package-solution --ship
```

## References

- [Adaptive Cards Documentation](https://adaptivecards.io/)
- [Chart.js Documentation](https://www.chartjs.org/)
- [SharePoint Framework Documentation](https://aka.ms/spfx)
- [React Adaptive Cards](https://www.npmjs.com/package/react-adaptivecards)

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- topic 1
- topic 2
- topic 3

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
