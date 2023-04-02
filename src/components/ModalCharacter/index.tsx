import { Box, Grid, Modal } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  color: "black",
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
};

interface ICaracterProfile {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  type: string;
  image: string;
}

export default function ModalCharacter({
  caracterProfile,
  open,
  handleClose,
}: {
  caracterProfile?: ICaracterProfile;
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} height="600px">
        <Image
          src={caracterProfile?.image ?? ""}
          alt={caracterProfile?.name ?? ""}
          width={300}
          height={300}
        />
        <Grid display="flex">
          <span> Name: {caracterProfile?.name} </span>
          <span> Gender: {caracterProfile?.gender} </span>
          <span> Status: {caracterProfile?.status} </span>
          <span> Species: {caracterProfile?.species} </span>
          <span> Type: {caracterProfile?.type} </span>
        </Grid>
      </Box>
    </Modal>
  );
}
