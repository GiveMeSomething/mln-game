import { Chip } from '@/types/Chip';
import { ItemTypes } from '@/types/ItemTypes';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';

export enum ChipColor {
  RED = 'red',
  GREEN = 'green',
  GRAY = 'gray',
}

export interface ChipItemInfo {
  chipInfo: Chip;
  removeChip: (chip: Chip) => void;
}

export interface TextChipProps {
  chipInfo: Chip;
  chipColor?: ChipColor;
  removeChip?: (chip: Chip) => void;
}

export const TextChip = (props: TextChipProps) => {
  const { chipInfo, chipColor = ChipColor.GREEN, removeChip } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CHIP,
    item: { chipInfo, removeChip },
    canDrag: chipColor !== ChipColor.GREEN,
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

  const chipStyle = useMemo(() => {
    switch (chipColor) {
      case ChipColor.RED:
        return 'bg-red-500 border-red-600';
      case ChipColor.GREEN:
        return 'bg-green-500 border-green-600';
      case ChipColor.GRAY:
        return 'bg-gray-500 border-gray-500';
    }
  }, [chipColor]);

  return (
    <div
      className={
        'flex items-center justify-center rounded-full w-full border ' +
        chipStyle
      }
      ref={drag}
      style={{ ...dragStyle }}
    >
      <p className="m-2 text-white">{chipInfo.text}</p>
    </div>
  );
};
