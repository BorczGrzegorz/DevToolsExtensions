import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export interface ConfirmationDialogProps {
  open: boolean;
  textContent: string;
  confirmationTitle: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmationDialog = ({ open, textContent, confirmationTitle, onConfirm, onClose }: ConfirmationDialogProps) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{confirmationTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {textContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={onClose} color="primary">
            NO
          </Button>
          <Button onClick={onConfirm} color="primary" autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
