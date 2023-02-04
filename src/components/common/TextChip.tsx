import { Chip } from '@/types/Chip';
import { ItemTypes } from '@/types/ItemTypes';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';

export interface ChipItemInfo {
  chipInfo: Chip;
  removeChip: (chip: Chip) => void;
}

export interface TextChipProps {
  chipInfo: Chip;
  removeChip?: (chip: Chip) => void;
}

export const TextChip = (props: TextChipProps) => {
  const { chipInfo, removeChip } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CHIP,
    item: { chipInfo, removeChip },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const dragStyle = useMemo(() => {
    if (isDragging) {
      return {
        opacity: 0.5,
      };
    }

    return {};
  }, [isDragging]);

  return (
    <div
      className="flex items-center justify-center rounded-full w-full border"
      ref={drag}
      style={dragStyle}
    >
      <p className="font-bold m-2">{chipInfo.text}</p>
    </div>
  );
};
