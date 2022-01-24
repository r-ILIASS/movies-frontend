import React, { useContext } from "react";
import { Link } from "react-router-dom";
// Context
import { Context } from "../../context";
// Images
import logo from "../../images/movie-logo.svg";
import TMDBLogo from "../../images/tmdb_logo.svg";
// Styles
import { Wrapper, Content, LogoImg, TMDBLogoImg } from "./Header.styles";

const Header = () => {
  const [user] = useContext(Context);

  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <LogoImg src={logo} alt="movie-logo" />
        </Link>
        <a href="https://www.themoviedb.org/" target="_blank">
          <TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" />
        </a>
      </Content>
    </Wrapper>
  );
};

export default Header;
