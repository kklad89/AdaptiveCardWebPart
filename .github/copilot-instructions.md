# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a SharePoint Framework (SPFx) React webpart project that renders JSON schema using Microsoft's Adaptive Cards with the react-adaptivecards wrapper. The project includes support for custom elements like charts.

## Key Technologies
- SharePoint Framework (SPFx) 1.21.1
- React 17.0.1
- TypeScript
- Adaptive Cards (adaptivecards, react-adaptivecards, adaptivecards-templating)
- Chart.js and react-chartjs-2 for chart rendering
- Microsoft Fluent UI components

## Project Structure
- `src/webparts/sharePointAdaptiveCard/` - Main webpart implementation
- `src/webparts/sharePointAdaptiveCard/components/` - React components
- `src/webparts/sharePointAdaptiveCard/SharePointAdaptiveCardWebPart.ts` - WebPart class
- `config/` - SPFx configuration files

## Development Guidelines
1. Use TypeScript for all new files
2. Follow SPFx development patterns
3. Implement custom Adaptive Card elements for charts
4. Use react-adaptivecards for rendering Adaptive Cards
5. Handle JSON schema validation
6. Implement proper error handling for malformed JSON
7. Use SharePoint Framework property pane for configuration
8. Follow Microsoft Fluent UI design guidelines

## Custom Elements
- Chart elements should extend Adaptive Card base elements
- Support for Bar, Line, Pie, and Doughnut charts
- Chart data should be configurable via JSON schema
- Implement responsive chart rendering

## Testing
- Test with various JSON schemas
- Validate chart rendering with different data sets
- Test in SharePoint Online environment
- Verify compatibility with different browsers
