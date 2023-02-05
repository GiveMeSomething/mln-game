import { Chip } from '@/types/Chip';
import { ItemTypes } from '@/types/ItemTypes';
import { useEffect, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ChipColor, ChipItemInfo, TextChip } from '../common/TextChip';

export interface DraggableChipContainerProps {
  chips?: Chip[];
  checkDrop?: (dropChip: Chip) => boolean;
}

export const DraggableChipContainer = (props: DraggableChipContainerProps) => {
  const { chips, checkDrop } = props;

  const [currentChips, setCurrentChips] = useState<Chip[]>([]);

  useEffect(() => {
    if (chips == null) {
      return;
    }

    // Check if the chip has multiple correct answers
    // If there are multiple correct answers, then the chip will be duplicated
    let chipList: Chip[] = [];
    chips.forEach((chip) => {
      // Dirty way to make sure the chip id is unique
      chip.belongTo.forEach((_, index) =>
        chipList.push({ ...chip, id: chip.id + 1000 * index }),
      );
    });

    setCurrentChips(chipList);
  }, [chips]);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CHIP,
    drop: (monitor: ChipItemInfo) => {
      // TODO: Move the chip to the current container
      const { chipInfo, removeChip } = monitor;

      removeChip(chipInfo);

      let isCorrectChip: boolean = false;
      if (checkDrop != null) {
        isCorrectChip = checkDrop(chipInfo);
      }
      setCurrentChips((prev) => [
        ...prev,
        { ...chipInfo, correct: isCorrectChip },
      ]);
    },
  }));

  const removeChip = (chip: Chip) => {
    setCurrentChips((prev) => prev.filter((c) => c.id !== chip.id));
  };

  const renderChips = useMemo(() => {
    if (currentChips.length === 0) {
      return <p className="text-gray-500 py-3 mx-auto">Drop here</p>;
    }

    return currentChips.map((chip) => (
      <div className="m-2" key={chip.id}>
        <TextChip
          chipInfo={chip}
          removeChip={removeChip}
          chipColor={(chip as any).correct ? ChipColor.GREEN : ChipColor.RED}
        />
      </div>
    ));
  }, [currentChips]);

  return (
    <div className="w-full h-full text-center p-2" ref={drop}>
      <div className="flex flex-wrap">{renderChips}</div>
    </div>
  );
};
