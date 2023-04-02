/* eslint-disable @next/next/no-css-tags */
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Box, Grid, Button, TextField, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/CardCharacter";

import { Item } from "../interfaces/character";

import ModalCharacter from "../components/ModalCharacter";

import Pagination from "@mui/material/Pagination";

const BASE_URL = `https://rickandmortyapi.com/api`;

function Challenge() {
  let localStorageFavoriteCharacters: Item[] = [];

  if (typeof window !== "undefined") {
    localStorageFavoriteCharacters = JSON.parse(
      localStorage.getItem("favoriteCharacters") ?? "[]"
    );
  }

  const [showFav, setShowFav] = useState(false);
  const [favoriteCharacters, setFavoriteCharacters] = useState<Item[]>(
    localStorageFavoriteCharacters
  );
  const [caracterProfile, setCaracterProfile] = useState<Item>();
  const [characters, setCharacters] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);

  const [countPages, setCountPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [clickedCharacter, setClickedCharacter] = useState<Item>();

  /**
   * Functions to handle modal
   */
  const handleClose = () => setOpen(false);

  function getCharacters() {
    fetch(`${BASE_URL}/character?page=${currentPage}`).then((res) =>
      res.json().then((data) => {
        const result = data.results;
        setCharacters(result);
        setCountPages(data.info.pages);
      })
    );
  }

  /**
   * Function to handle filter favorite characters
   * @param item: Item
   * @returns item: Item
   */
  const newCharacter = characters?.map((item) => {
    item.isFavorite = favoriteCharacters.find((fc) => fc.id === item.id)
      ? true
      : false;
    return item;
  });

  useEffect(() => {
    getCharacters();
  }, [currentPage]);

  // Function to handle character search
  async function handleSearch(event: React.KeyboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${searchText}`
    );
    const charactersFind = await response.json();
    setCharacters(charactersFind.results);
  }

  // Function to handle the favorite characters
  function handleFavoriteCharacter(item: Item) {
    const isFavorite = favoriteCharacters.includes(item);
    if (isFavorite) {
      const newFavorites = favoriteCharacters.filter(
        (num) => num.id !== item.id
      );
      setFavoriteCharacters(newFavorites);
      window.localStorage.setItem(
        "favoriteCharacters",
        JSON.stringify(newFavorites)
      );
    } else {
      item.isFavorite = true;
      const newFavorites = [...favoriteCharacters, item];
      setFavoriteCharacters(newFavorites);
      window.localStorage.setItem(
        "favoriteCharacters",
        JSON.stringify(newFavorites)
      );
    }
  }

  // Function to handle assembling the favorites characters button
  function amountButtonIcon() {
    return showFav ? (
      <FontAwesomeIcon icon={faHeart} style={{ color: "#c71f1f" }} />
    ) : (
      <FontAwesomeIcon icon={faHeart} />
    );
  }

  function clickCard(item: Item) {
    setClickedCharacter(item);
    setOpen(!open);
    setCaracterProfile(item);
  }

  return (
    <Box>
      <Head>
        <link rel="stylesheet" href="/global.css" />
        <title> Challenge </title>
      </Head>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        pt={15}
        pb={10}
      >
        <Image
          src="/rick-and-morty.png"
          alt="Rick and Morty"
          width={300}
          height={300}
        />
      </Box>

      <ModalCharacter
        characterProfile={caracterProfile}
        handleFavoriteCharacter={handleFavoriteCharacter}
        item={clickedCharacter}
        open={open}
        handleClose={handleClose}
      />

      <Grid
        container
        spacing={1}
        direction="row"
        display="flex"
        width="100%"
        mb={4}
      >
        <Grid item md={6} xs={12}>
          <Grid
            display="flex"
            height="100%"
            sx={{
              justifyContent: { md: "flex-end", xs: "center" },
              pr: { md: 2, xs: 0 },
            }}
          >
            <TextField
              variant="filled"
              id="outlined-uncontrolled"
              label="Find your character"
              sx={{ width: "50%" }}
              inputProps={{ style: { color: "#fff", height: "100%" } }}
              InputLabelProps={{ style: { color: "#c9c2c2" } }}
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch(event);
                }
              }}
            />
          </Grid>
        </Grid>
        <Grid item md={6} xs={12} sx={{ width: { xs: "100%" } }}>
          <Grid
            display="flex"
            height="100%"
            sx={{
              justifyContent: { md: "flex-start", xs: "center" },
              pl: { md: 2, xs: 0 },
            }}
          >
            <Button
              endIcon={amountButtonIcon()}
              variant="contained"
              style={{
                background:
                  "linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4)",
                width: "50%",
              }}
              onClick={() => setShowFav(!showFav)}
            >
              {showFav ? (
                <span> Hide favorites </span>
              ) : (
                <span> Show favorites </span>
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {showFav && (
        <div>
          {favoriteCharacters.length > 0 && (
            <Grid container spacing={2}>
              {favoriteCharacters
                  .map((item: Item) => {
                    return (
                      <Grid
                        xl={3}
                        md={4}
                        xs={12}
                        sm={6}
                        lg={3}
                        sx={{ display: "flex", justifyContent: "center" }}
                        item
                        container={true}
                        direction="row"
                        alignItems="center"
                        key={item.id}
                      >
                        <Card
                          handleFavoriteCharacter={handleFavoriteCharacter}
                          clickCard={clickCard}
                          item={item}
                        />
                      </Grid>
                    );
                  })}
            </Grid>
          )}
          {favoriteCharacters.length === 0 && (
            <Box display="flex" justifyContent="center" mb={2}>
              <Typography> <FontAwesomeIcon icon={faHeartCrack} /> You dont have any favorite character <FontAwesomeIcon icon={faHeartCrack} /> </Typography>
            </Box>
          )}
        </div>
      )}

      {!showFav && (
        <Grid container spacing={2}>
          {newCharacter.map((item: Item) => {
              return (
                <Grid
                  xl={3}
                  md={4}
                  xs={12}
                  sm={6}
                  lg={3}
                  sx={{ display: "flex", justifyContent: "center" }}
                  item
                  container={true}
                  direction="row"
                  alignItems="center"
                  key={item.id}
                >
                  <Card
                    handleFavoriteCharacter={handleFavoriteCharacter}
                    clickCard={clickCard}
                    item={item}
                  />
                </Grid>
              );
            })}
        </Grid>
      )}
      <Box
        display="flex"
        sx={{
          justifyContent: { xs: "center", md: "center", lg: "flex-end" },
          pr: { xs: 0, xl: 6 },
        }}
      >
        <Stack display="flex" height={50} p={1}>
          <Pagination
            onChange={(event, page) => {
              setCurrentPage(page);
            }}
            count={countPages}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default Challenge;
