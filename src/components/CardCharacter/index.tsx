import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";
import Image from "next/image";

import styles from "./index.module.css";

import { Item } from "../../interfaces/character";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
 
export default function Card({ handleFavoriteCharacter, item, clickCard }: {
    handleFavoriteCharacter: (item: Item) => void;
    item: Item;
    clickCard: (item: Item) => void;
}) {
    return (
        <Box
        className={styles.card}
        onClick={() => clickCard(item)}
        display="flex"
        alignItems="center"
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          pt={1}
        >
          <FontAwesomeIcon
            onClick={(event) => {
              event.stopPropagation();
              handleFavoriteCharacter(item);
            }}
            icon={faHeart}
            style={{
              color: item.isFavorite ? "#c71f1f" : "#fff",
            }}
            size="2x"
          />
        </Box>
        <Image
          src={item.image}
          alt={item.name}
          width={300}
          height={300}
        />
        <span> {item.name} </span>
      </Box>
    )
}