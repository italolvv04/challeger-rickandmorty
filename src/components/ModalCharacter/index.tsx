import { Box, Grid, Modal, Typography } from "@mui/material";
import Image from "next/image";
import { Item } from "../../interfaces/character";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  height: "auto",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  color: "black",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)",
  p: 4,
  border: "none",
  borderRadius: 8,
  background: "linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4);",
};

const styleFontInfoCharacter = {
  fontFamily: "'Delicious Handrawn', cursive",
};

export default function ModalCharacter({
  characterProfile,
  handleFavoriteCharacter,
  open,
  handleClose,
  item,
}: {
  characterProfile?: Item;
  handleFavoriteCharacter: (item: Item) => void;
  open: boolean;
  item?: Item;
  handleClose: () => void;
}) {
  const validationCharacterParams = (characterProfile?: string) => {
    return characterProfile === "" || characterProfile === "unknown"
      ? "There is no such information"
      : characterProfile;
  };
  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} display="flex" flexDirection="column">
        <Box display="flex" justifyContent="center" mb={2}>
          <FontAwesomeIcon
            icon={faHeart}
            onClick={(event) => {
              item && handleFavoriteCharacter(item);
            }}
            style={{
              color: item?.isFavorite ? "#c71f1f" : "#fff",
              height: 32,
              width: 32,
            }}
          />
        </Box>
        <Box height="auto">
          <Image
            src={characterProfile?.image ?? ""}
            alt={characterProfile?.name ?? ""}
            style={{ borderRadius: 10 }}
            width={330}
            height={330}
          />
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={styleFontInfoCharacter}
            id="modal-modal-title"
          >
            <strong> Name: </strong>{" "}
            {validationCharacterParams(characterProfile?.name)}
          </Typography>
          <Typography
            variant="h5"
            sx={styleFontInfoCharacter}
            id="modal-modal-title"
          >
            <strong> Gender: </strong>{" "}
            {validationCharacterParams(characterProfile?.gender)}
          </Typography>
          <Typography
            variant="h5"
            sx={styleFontInfoCharacter}
            id="modal-modal-title"
          >
            <strong> Status: </strong>{" "}
            {validationCharacterParams(characterProfile?.status)}
          </Typography>
          <Typography
            variant="h5"
            sx={styleFontInfoCharacter}
            id="modal-modal-title"
          >
            <strong> Species: </strong>{" "}
            {validationCharacterParams(characterProfile?.species)}
          </Typography>
          <Typography
            variant="h5"
            sx={styleFontInfoCharacter}
            id="modal-modal-title"
          >
            <strong> Type: </strong>:{" "}
            {validationCharacterParams(characterProfile?.type)}
          </Typography>
          <Typography
            variant="h5"
            sx={styleFontInfoCharacter}
            id="modal-modal-title"
          >
            <strong> Origin: </strong>{" "}
            {validationCharacterParams(characterProfile?.origin.name)}
          </Typography>
          <Typography
            variant="h5"
            sx={styleFontInfoCharacter}
            id="modal-modal-title"
          >
            <strong> Location: </strong>{" "}
            {validationCharacterParams(characterProfile?.location.name)}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
