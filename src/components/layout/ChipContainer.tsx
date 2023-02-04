import { Chip } from '@/types/Chip';
import { useCallback, useEffect, useState } from 'react';
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

export interface ChipContainerProps {
  chips?: Chip[];
}

export const ChipContainer = (props: ChipContainerProps) => {
  const { chips } = props;

  const [wrongTime, setWrongTime] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (wrongTime === 5) {
      setShowModal(true);
    }
  }, [wrongTime]);

  const notifyWrongDrop = () =>
    toast('Bạn sai rồi', { icon: '?? 😀 ??', duration: 5000 });

  const checkDropChip =
    (parentChip: Chip) =>
    (dropChip: Chip): void => {
      if (dropChip.belongTo.find((id) => id === parentChip.id) == undefined) {
        notifyWrongDrop();
        setWrongTime((wrongTime) => wrongTime + 1);
      }
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
          <div key={chip.id} className="mt-6">
            <div className="grid grid-cols-2 gap-4 my-2">
              <TextChip chipInfo={chip} />
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
        <DialogTitle id="alert-dialog-title">
          {"Too bads, you're wrong"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn thử lại không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Chê</Button>
          <Button onClick={handleYesOption} autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
