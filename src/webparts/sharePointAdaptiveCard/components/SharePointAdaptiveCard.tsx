import * as React from 'react';
import styles from './SharePointAdaptiveCard.module.scss';
import type { ISharePointAdaptiveCardProps } from './ISharePointAdaptiveCardProps';
import { AdaptiveCardRenderer } from './AdaptiveCardRenderer';
import { DefaultButton, PrimaryButton, Stack } from '@fluentui/react';
import { ICardData, CardVisibility } from './interfaces';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface IState {
  cards: ICardData[];
  isCustomizing: boolean;
  defaultLayout: ICardData[];
  hiddenCards: ICardData[];
  isManagingHiddenCards: boolean;
}

export default class SharePointAdaptiveCard extends React.Component<ISharePointAdaptiveCardProps, IState> {
  private readonly _vacationCardJson = JSON.stringify({
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
            "datasets": [
              {
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
  });

  constructor(props: ISharePointAdaptiveCardProps) {
    super(props);
    this.state = {
      cards: [
        {
          id: 'vacation',
          position: { row: 0, column: 0 },
          json: this._vacationCardJson,
          title: 'Vakantiedagen',
          icon: '🏖️',
          visibility: CardVisibility.Visible
        },
        {
          id: 'fixed',
          position: { row: 0, column: 3 },
          json: '',
          isFixed: true,
          title: 'Fixed Card',
          visibility: CardVisibility.Visible
        }
      ],
      isCustomizing: false,
      defaultLayout: [],
      hiddenCards: [],
      isManagingHiddenCards: false
    };

    // Bind methods
    this._onDragEnd = this._onDragEnd.bind(this);
    this._hideCard = this._hideCard.bind(this);
    this._showCard = this._showCard.bind(this);
    this._toggleManageHiddenCards = this._toggleManageHiddenCards.bind(this);
    this._renderCard = this._renderCard.bind(this);
    this._enterCustomizationMode = this._enterCustomizationMode.bind(this);
    this._exitCustomizationMode = this._exitCustomizationMode.bind(this);
    this._saveLayout = this._saveLayout.bind(this);
    this._cancelCustomization = this._cancelCustomization.bind(this);
    this._resetLayout = this._resetLayout.bind(this);
  }

  private _hideCard(cardId: string): void {
    this.setState(prevState => {
      const cardToHide = prevState.cards.find(card => card.id === cardId);
      if (!cardToHide || cardToHide.isFixed) return prevState;

      const updatedCards = prevState.cards.filter(card => card.id !== cardId);
      const updatedHiddenCards = [...prevState.hiddenCards, { ...cardToHide, visibility: CardVisibility.Hidden }];

      // Reflow remaining cards
      const reflowedCards = this._reflowCards(updatedCards);

      return {
        ...prevState,
        cards: reflowedCards,
        hiddenCards: updatedHiddenCards
      };
    });
  }

  private _reflowCards(cards: ICardData[]): ICardData[] {
    return cards.map((card, index) => {
      if (card.isFixed) return card;
      
      return {
        ...card,
        position: {
          row: Math.floor(index / 4),
          column: index % 4
        }
      };
    });
  }

  private _showCard(cardId: string): void {
    this.setState(prevState => {
      const cardToShow = prevState.hiddenCards.find(card => card.id === cardId);
      if (!cardToShow) return prevState;

      const updatedHiddenCards = prevState.hiddenCards.filter(card => card.id !== cardId);
      const updatedCards = [...prevState.cards];

      // Find next available position
      let nextPosition = { row: 0, column: 0 };
      const maxPosition = { row: 1, column: 3 }; // 4x2 grid

      while (
        updatedCards.some(
          card => card.position.row === nextPosition.row && card.position.column === nextPosition.column
        ) &&
        (nextPosition.row < maxPosition.row || 
          (nextPosition.row === maxPosition.row && nextPosition.column < maxPosition.column))
      ) {
        nextPosition.column++;
        if (nextPosition.column >= 4) {
          nextPosition.column = 0;
          nextPosition.row++;
        }
      }

      updatedCards.push({
        ...cardToShow,
        position: nextPosition,
        visibility: CardVisibility.Visible
      });

      return {
        ...prevState,
        cards: updatedCards,
        hiddenCards: updatedHiddenCards
      };
    });
  }

  private _toggleManageHiddenCards(): void {
    this.setState(prevState => ({
      ...prevState,
      isManagingHiddenCards: !prevState.isManagingHiddenCards
    }));
  }
  
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

  private _onDragEnd(result: DropResult): void {
    if (!result.destination) return;

    const cards = [...this.state.cards];
    const sourceIdx = cards.findIndex(c => c.id === result.draggableId);
    const destinationPos = {
      row: Math.floor(parseInt(result.destination.droppableId) / 4),
      column: parseInt(result.destination.droppableId) % 4
    };

    if (cards[sourceIdx]) {
      cards[sourceIdx].position = destinationPos;
      this.setState({ cards });
    }
  }

  private _enterCustomizationMode(): void {
    // Save current layout before entering customization mode
    this.setState(prevState => ({
      isCustomizing: true,
      defaultLayout: [...prevState.cards] // Backup current layout
    }));
  }

  private _exitCustomizationMode(discardChanges: boolean = false): void {
    this.setState(prevState => ({
      isCustomizing: false,
      // If discarding changes, restore the backed up layout
      cards: discardChanges ? [...prevState.defaultLayout] : prevState.cards
    }));
  }

  private _toggleCustomization(): void {
    if (this.state.isCustomizing) {
      this._exitCustomizationMode(true); // Exit and discard changes on toggle
    } else {
      this._enterCustomizationMode();
    }
  }

  private _addNewCard(): void {
    // Implement add new card logic
  }

  private _saveLayout(): void {
    // Save the current layout
    this._exitCustomizationMode(false); // Exit without discarding changes
  }

  private _cancelCustomization(): void {
    // Exit customization mode and discard changes
    this._exitCustomizationMode(true);
  }

  private _resetLayout(): void {
    // Reset to default layout and exit customization mode
    this.setState({
      cards: [...this.state.defaultLayout],
      isCustomizing: false
    });
  }

  private _renderCustomizationButtons(): JSX.Element {
    return (
      <Stack horizontal tokens={{ childrenGap: 8 }} className={styles.customizationButtons}>
        <PrimaryButton onClick={() => this._addNewCard()}>Add New Card</PrimaryButton>
        <PrimaryButton onClick={() => this._saveLayout()}>Save</PrimaryButton>
        <DefaultButton onClick={() => this._resetLayout()}>Reset</DefaultButton>
        <DefaultButton onClick={() => this._cancelCustomization()}>Cancel</DefaultButton>
      </Stack>
    );
  }

  private _renderHiddenCardsManager(): JSX.Element {
    const { hiddenCards } = this.state;

    if (hiddenCards.length === 0) {
      return (
        <div className={styles.hiddenCardsManager}>
          <p>No hidden cards</p>
        </div>
      );
    }

    return (
      <div className={styles.hiddenCardsManager}>
        <h3>Hidden Cards</h3>
        <div className={styles.hiddenCardsList}>
          {hiddenCards.map(card => (
            <div key={card.id} className={styles.hiddenCard}>
              <span className={styles.cardIcon}>{card.icon}</span>
              <span className={styles.cardTitle}>{card.title}</span>
              <DefaultButton 
                iconProps={{ iconName: 'Eye' }} 
                onClick={() => this._showCard(card.id)}
              >
                Show
              </DefaultButton>
            </div>
          ))}
        </div>
      </div>
    );
  }

  private _renderCard(card: ICardData, provided: any): JSX.Element {
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={styles.cardContainer}
      >
        <AdaptiveCardRenderer
          adaptiveCardJson={card.json}
          onError={(error) => console.error('Adaptive Card Error:', error)}
        />
        {!card.isFixed && this.state.isCustomizing && (
          <DefaultButton 
            className={styles.hideCardButton}
            iconProps={{ iconName: 'Hide' }}
            onClick={() => this._hideCard(card.id)}
            ariaLabel="Hide card"
            title="Hide card"
          />
        )}
      </div>
    );
  }

  public render(): JSX.Element {
    const { hasTeamsContext } = this.props;
    const { cards, isCustomizing, isManagingHiddenCards } = this.state;

    return (
      <section className={styles.sharePointAdaptiveCard}>
        <div className={`${styles.container} ${hasTeamsContext ? styles.teams : ''}`}>
          <div className={styles.buttonContainer}>
            {!isCustomizing ? (
              <DefaultButton 
                className={styles.customizeButton}
                onClick={() => this._enterCustomizationMode()}
              >
                Customize
              </DefaultButton>
            ) : (
              <>
                {this._renderCustomizationButtons()}
              </>
            )}
          </div>

          <DragDropContext onDragEnd={this._onDragEnd.bind(this)}>
            <div className={styles.gridContainer}>
              {Array.from({ length: 8 }).map((_, index) => {
                const row = Math.floor(index / 4);
                const column = index % 4;
                const card = cards.find(c => 
                  c.position.row === row && 
                  c.position.column === column
                );
                const isSecondRow = row === 1;
                const hasSecondRowContent = cards.some(c => c.position.row === 1);

                if (isSecondRow && !hasSecondRowContent) return null;

                return (
                  <Droppable
                    key={index}
                    droppableId={index.toString()}
                    isDropDisabled={column === 3 && row === 0}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`${styles.gridItem} ${snapshot.isDraggingOver ? styles.dropTarget : ''} ${!card ? styles.empty : ''} ${card?.isFixed ? styles.fixed : styles.draggable}`}
                      >
                        {card ? (
                          <Draggable
                            draggableId={card.id}
                            index={index}
                            isDragDisabled={card.isFixed || !isCustomizing}
                          >
                            {(provided) => this._renderCard(card, provided)}
                          </Draggable>
                        ) : (
                          isCustomizing && <span>Drop card here</span>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </div>
          </DragDropContext>

          {isCustomizing && this.state.hiddenCards.length > 0 && (
            <div className={styles.manageHiddenSection}>
              <div className={styles.hiddenCardsList}>
                {this.state.hiddenCards.map(card => (
                  <div key={card.id} className={styles.hiddenCard}>
                    <div className={styles.cardContainer}>
                      <span className={styles.cardIcon}>{card.icon}</span>
                      <span className={styles.cardTitle}>{card.title}</span>
                    </div>
                    <DefaultButton 
                      className={styles.showCardButton}
                      iconProps={{ iconName: 'RedEye' }}
                      onClick={() => this._showCard(card.id)}
                      ariaLabel="Show card"
                      title="Show card"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}