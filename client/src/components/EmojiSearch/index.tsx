import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const baseUrl = 'https://emoji-api.com/emojis?access_key=';
const apiKey = 'cc660641e3600b84362f80818ebab5232bfa5e07';

interface Emoji {
  slug: string;
  character: string;
  unicodeName: string;
  codePoint: string;
  group: string;
  subGroup: string;
}

interface EmojiSearchProps {
  description: string;
  onClick: (emoji: string) => void;
}

type FetchResponse = {
  [key: string]: any;
};

const EmojiSearch = ({ description, onClick }: EmojiSearchProps) => {
  const [responses, setResponses] = useState<FetchResponse>({});
  const [selectedEmoji, setSelectedEmoji] = useState<FetchResponse>({});

  useEffect(() => {
    if (description.length) {
      fetch(`${baseUrl}${apiKey}&search=${description.slice(1)}`)
        .then((resp: Response) => resp.json())
        .then((emojiList: Emoji[]) => {
          if (emojiList.length) {
            setSelectedEmoji(prev => ({
              ...prev,
              [description]: emojiList[0].codePoint,
            }));
          }
          setResponses(prev => ({ ...prev, [description]: emojiList }));
        });
    }
  }, [description]);

  useEffect(() => {
    const emojiEl = document.querySelector('.selected-emoji') as HTMLDivElement;
    if (emojiEl) {
      emojiEl.focus();
    }
  }, [selectedEmoji]);

  const getEmoji = (codePoint: string) =>
    String.fromCodePoint(parseInt(codePoint, 16));

  const handleEmojiSelection = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = e;
    const selectedEmojiEl = document.querySelector(
      '.selected-emoji',
    ) as HTMLDivElement;
    if (key === 'Enter') {
      onClick(getEmoji(selectedEmoji[description]));
    }
    const currentIdx = parseInt(selectedEmojiEl.dataset.index as string, 10);
    if (key === 'ArrowRight') {
      const newEmoji = document.querySelector(
        `[data-index="${Math.min(
          currentIdx + 1,
          responses[description].length,
        )}"]`,
      ) as HTMLDivElement;
      if (newEmoji) {
        setSelectedEmoji(prev => ({
          ...prev,
          [description]: newEmoji.dataset.codePoint,
        }));
      }
    }
    if (key === 'ArrowLeft') {
      const newEmoji = document.querySelector(
        `[data-index="${Math.max(currentIdx - 1, 0)}"]`,
      ) as HTMLDivElement;
      setSelectedEmoji(prev => ({
        ...prev,
        [description]: newEmoji.dataset.codePoint,
      }));
    }
    e.stopPropagation();
  };

  return (
    <EmojiSearchContainer
      tabIndex={-1}
      id='emoji-container'
      className={responses[description] ? 'active' : ''}
      onKeyDown={handleEmojiSelection}
    >
      {responses[description] &&
        responses[description].slice(0, 6).map((emoji: Emoji, idx: number) => (
          <EmojiContainer
            key={idx}
            className={
              selectedEmoji[description] === emoji.codePoint
                ? 'selected-emoji'
                : ''
            }
            data-code-point={emoji.codePoint}
            data-index={idx}
            onClick={() => onClick(getEmoji(emoji.codePoint))}
            tabIndex={-1}
          >
            {getEmoji(emoji.codePoint)}
          </EmojiContainer>
        ))}
    </EmojiSearchContainer>
  );
};

const EmojiSearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 22%;
  left: 5%;
  right: 5%;
  background: rgba(0, 0, 0, 0.4);
  padding: 0 1.5rem;
  border-radius: 10%;
  max-width: 90%;
  height: 60px;
  overflow-x: scroll;
  opacity: 0;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  &.active {
    opacity: 1;
  }
`;

const EmojiContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 25%;

  &.selected-emoji {
    background: ${({ theme }) => theme.textSecondary};
    outline: none;
  }
`;

export default EmojiSearch;
