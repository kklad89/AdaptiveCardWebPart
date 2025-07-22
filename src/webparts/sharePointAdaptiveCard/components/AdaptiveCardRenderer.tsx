import * as React from 'react';
import * as AC from 'adaptivecards';
import { registerChartElement } from './ChartElement';

export interface IAdaptiveCardRendererProps {
  adaptiveCardJson: string;
  onError?: (error: string) => void;
}

export interface IAdaptiveCardRendererState {
  error: string | undefined;
}

export class AdaptiveCardRenderer extends React.Component<IAdaptiveCardRendererProps, IAdaptiveCardRendererState> {
  private _containerRef = React.createRef<HTMLDivElement>();
  private _adaptiveCard: AC.AdaptiveCard | null = null;
  private _chartElementRegistered = false;

  constructor(props: IAdaptiveCardRendererProps) {
    super(props);
    this.state = {
      error: undefined
    };
  }

  public componentDidMount(): void {
    this._registerCustomElements();
    this._renderCard();
  }

  public componentDidUpdate(prevProps: IAdaptiveCardRendererProps): void {
    if (prevProps.adaptiveCardJson !== this.props.adaptiveCardJson) {
      this._renderCard();
    }
  }

  private _registerCustomElements(): void {
    if (!this._chartElementRegistered) {
      try {
        registerChartElement();
        this._chartElementRegistered = true;
      } catch (error) {
        console.warn('Failed to register chart element:', error);
      }
    }
  }

  private _renderCard(): void {
    if (!this._containerRef.current || !this.props.adaptiveCardJson) {
      return;
    }

    try {
      // Clear previous content
      this._containerRef.current.innerHTML = '';

      // Parse the JSON
      const cardPayload = JSON.parse(this.props.adaptiveCardJson);

      // Create a new AdaptiveCard instance
      this._adaptiveCard = new AC.AdaptiveCard();

      // Set up host config for better styling
      const hostConfig: AC.HostConfig = new AC.HostConfig({
        fontFamily: "Segoe UI, system-ui, sans-serif",
        spacing: {
          small: 8,
          default: 12,
          medium: 16,
          large: 20,
          extraLarge: 24,
          padding: 12
        },
        containerStyles: {
          default: {
            backgroundColor: "#FFFFFF",
            foregroundColors: {
              default: {
                default: "#323130",
                subtle: "#605e5c"
              }
            }
          }
        }
      });

      this._adaptiveCard.hostConfig = hostConfig;

      // Parse the card payload
      this._adaptiveCard.parse(cardPayload);

      // Set up action handling (optional)
      this._adaptiveCard.onExecuteAction = (action: AC.Action) => {
        if (action instanceof AC.OpenUrlAction) {
          window.open(action.url, '_blank');
        } else if (action instanceof AC.SubmitAction) {
          console.log('Submit action executed:', action.data);
          // Handle submit actions as needed
        }
      };

      // Render the card
      const renderedCard = this._adaptiveCard.render();
      
      if (renderedCard) {
        this._containerRef.current.appendChild(renderedCard);
        this.setState({ error: undefined });
      } else {
        throw new Error('Failed to render the Adaptive Card');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      this.setState({ error: errorMessage });
      
      if (this.props.onError) {
        this.props.onError(errorMessage);
      }
    }
  }

  public render(): React.ReactElement<IAdaptiveCardRendererProps> {
    return (
      <div>
        {this.state.error && (
          <div style={{
            padding: '16px',
            backgroundColor: '#fef7f7',
            border: '1px solid #f4c6c6',
            borderRadius: '4px',
            color: '#d13438',
            marginBottom: '16px'
          }}>
            <strong>Error rendering Adaptive Card:</strong> {this.state.error}
          </div>
        )}
        <div 
          ref={this._containerRef}
          style={{
            width: '100%',
            minHeight: this.state.error ? 'auto' : '200px'
          }}
        />
      </div>
    );
  }
}
