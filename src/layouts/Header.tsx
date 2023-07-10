import React from "react";
import { Container, Divider, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Container>
      <img alt="Logo" src="./../assets/kiwi-on-dark.svg" width="213" height="48"></img>
      <Typography>Kiwi Power is now a wholly owned subsidiary of Engie.</Typography>
      <Divider />
    </Container>
  );
};
