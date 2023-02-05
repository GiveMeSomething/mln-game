import { Chip } from '@/types/Chip';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TextChip } from '../common/TextChip';
import { DraggableChipContainer } from './DraggableChipContainer';
import toast, { Toaster } from 'react-hot-toast';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import movableChips from '@/data/movable-chip.json';
import confetti from 'canvas-confetti';

export interface ChipContainerProps {
  chips?: Chip[];
}

const MAX_WRONG_TIME = 3;

export const ChipContainer = (props: ChipContainerProps) => {
  const { chips } = props;

  const [wrongTime, setWrongTime] = useState(0);
  const [correctTime, setCorrectTime] = useState(0);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (wrongTime === MAX_WRONG_TIME) {
      setShowModal(true);
    }
  }, [wrongTime]);

  const correctLength = useMemo(
    () =>
      movableChips.reduce(
        (chipLength, chip) => (chipLength += chip.belongTo.length),
        0,
      ),
    [],
  );

  const retryDialogTitle = useMemo(() => {
    if (!showModal) {
      return '';
    }

    if (correctTime === correctLength) {
      return 'Chúc mừng bạn đã hoàn thành trò chơi';
    }

    if (wrongTime === MAX_WRONG_TIME) {
      return 'Bạn đã thua rồi';
    }
  }, [showModal, correctTime, correctLength, wrongTime]);

  const notifyWrongDrop = () =>
    toast('Bạn sai rồi', { icon: '?? 😀 ??', duration: 5000 });

  const notifyCorrectDrop = () =>
    toast('Chúc mừng bạn  🎉', { icon: '🎉', duration: 10000 });

  useEffect(() => {
    if (correctTime != correctLength) {
      return;
    }

    const randomInRange = (min: number, max: number): number => {
      return Math.random() * (max - min) + min;
    };

    const confettiRotation = setInterval(() => {
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 },
      });
    }, 1000);

    notifyCorrectDrop();

    const showRetryTimeout = setTimeout(() => setShowModal(true), 5000);

    return () => {
      clearTimeout(showRetryTimeout);
      clearInterval(confettiRotation);
    };
  }, [correctTime, correctLength]);

  const checkDropChip =
    (parentChip: Chip) =>
    (dropChip: Chip): boolean => {
      if (dropChip.belongTo.find((id) => id === parentChip.id) == undefined) {
        notifyWrongDrop();
        setWrongTime((wrongTime) => wrongTime + 1);
        return false;
      }

      setCorrectTime((correctTime) => correctTime + 1);
      return true;
    };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleYesOption = () => {
    handleClose();
    window.location.reload();
  };

  if (chips == null) {
    return null;
  }

  return (
    <>
      <div>
        {chips.map((chip) => (
          <div key={chip.id} className="first:mt-0 mt-6">
            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="max-h-4">
                <TextChip chipInfo={chip} />
              </div>
              <div>
                <div className="border w-full h-full">
                  <DraggableChipContainer checkDrop={checkDropChip(chip)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Toaster />
      {/* TODO: Separate to another file when not lazy */}
      <Dialog
        open={showModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{retryDialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn thử lại không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Chê</Button>
          <Button onClick={handleYesOption}>Có</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
